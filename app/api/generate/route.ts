import { NextResponse } from "next/server";

type GenerateRequest = {
  brief?: string;
  contentType?: string;
  audience?: string;
  tone?: string;
  keywords?: string;
};

const AI_PROVIDER = process.env.AI_PROVIDER || "ollama";

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";

const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3.2";

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_MODEL =
  process.env.GROQ_MODEL || "openai/gpt-oss-120b";

function buildPrompt({
  brief,
  contentType,
  audience,
  tone,
  keywords,
}: Required<GenerateRequest>) {
  return `
You are Content Buds AI, a professional marketing content assistant.

Create useful, polished marketing content using the following brief.

Content brief:
${brief}

Content type:
${contentType}

Target audience:
${audience}

Tone:
${tone}

Keywords:
${keywords || "No specific keywords provided"}

Instructions:
- Follow the requested content type.
- Write specifically for the target audience.
- Maintain the requested tone.
- Include provided keywords naturally when relevant.
- Avoid unnecessary filler.
- Make the result ready for practical use.
- Return only the final content, without explaining your process.
`.trim();
}

async function generateWithOllama(prompt: string) {
  const response = await fetch(
    `${OLLAMA_BASE_URL}/api/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Ollama failed to generate content.");
  }

  const data = (await response.json()) as {
    response?: string;
  };

  return data.response?.trim() || "";
}

async function generateWithGroq(prompt: string) {
  if (!GROQ_API_KEY) {
    throw new Error("Groq API key is not configured.");
  }

  const response = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Groq API error:", errorText);

    throw new Error("Groq failed to generate content.");
  }

  const data = (await response.json()) as {
    choices?: Array<{
      message?: {
        content?: string;
      };
    }>;
  };

  return data.choices?.[0]?.message?.content?.trim() || "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateRequest;

    const brief = body.brief?.trim();
    const contentType = body.contentType?.trim();
    const audience = body.audience?.trim();
    const tone = body.tone?.trim();
    const keywords = body.keywords?.trim() || "";

    if (!brief || !contentType || !audience || !tone) {
      return NextResponse.json(
        {
          error:
            "Brief, content type, target audience, and tone are required.",
        },
        { status: 400 }
      );
    }

    const prompt = buildPrompt({
      brief,
      contentType,
      audience,
      tone,
      keywords,
    });

    let generatedContent = "";

    if (AI_PROVIDER === "groq") {
      generatedContent = await generateWithGroq(prompt);
    } else if (AI_PROVIDER === "ollama") {
      generatedContent = await generateWithOllama(prompt);
    } else {
      return NextResponse.json(
        {
          error: "Unsupported AI provider configuration.",
        },
        { status: 500 }
      );
    }

    if (!generatedContent) {
      return NextResponse.json(
        {
          error:
            "The AI returned an empty response. Please try again.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      content: generatedContent,
    });
  } catch (error) {
    console.error("AI generation error:", error);

    return NextResponse.json(
      {
        error:
          "Unable to generate content right now. Please try again.",
      },
      { status: 500 }
    );
  }
}