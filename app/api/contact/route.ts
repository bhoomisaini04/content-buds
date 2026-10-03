import { NextResponse } from "next/server";

type ContactRequest = {
  name?: string;
  email?: string;
  message?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequest;

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: "Name, email, and message are required.",
        },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          error: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        {
          error: "Please provide a little more detail in your message.",
        },
        { status: 400 }
      );
    }

    console.log("Contact submission:", {
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thanks! Your message has been received.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact submission error:", error);

    return NextResponse.json(
      {
        error: "Unable to send your message right now. Please try again.",
      },
      { status: 500 }
    );
  }
}