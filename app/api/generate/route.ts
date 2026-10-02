import { NextResponse } from "next/server";

type GenerateRequest = {
  brief?: string;
  contentType?: string;
  audience?: string;
  tone?: string;
  keywords?: string;
};

const OLLAMA_URL = "http://127.0.0.1:11434/api/generate";
const MODEL = "llama3.2";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as GenerateRequest;

    const brief = body.brief?.trim();
    const contentType = body.contentType?.trim();
    const audience = body.audience?.trim();
    const tone = body.tone?.trim();
    const keywords = body.keywords?.trim();

    if (!brief || !contentType || !audience || !tone) {
      return NextResponse.json(
        {
          error:
            "Brief, content type, target audience, and tone are required.",
        },
        { status: 400 }
      );
    }

    const prompt = `
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

    const ollamaResponse = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        stream: false,
      }),
    });

    if (!ollamaResponse.ok) {
      return NextResponse.json(
        { error: "The AI service could not generate content." },
        { status: 502 }
      );
    }

    const data = (await ollamaResponse.json()) as {
      response?: string;
    };

    const generatedContent = data.response?.trim();

    if (!generatedContent) {
      return NextResponse.json(
        { error: "The AI returned an empty response. Please try again." },
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
          "Unable to generate content right now. Please check the AI service and try again.",
      },
      { status: 500 }
    );
  }
}