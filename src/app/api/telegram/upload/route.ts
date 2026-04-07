import { NextResponse } from "next/server";
import { isPhotoUploadEnabled } from "@/lib/site-dates";
export const runtime = 'edge';

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export async function POST(request: Request) {
  if (!isPhotoUploadEnabled()) {
    return NextResponse.json(
      { error: "Photo uploads open on the wedding day." },
      { status: 403 },
    );
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;

  if (!botToken || !chatId) {
    return NextResponse.json(
      { error: "Telegram is not configured on the server." },
      { status: 500 },
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("photo");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Please select a photo." },
        { status: 400 },
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed." },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Photo must be 10MB or smaller." },
        { status: 400 },
      );
    }

    const telegramFormData = new FormData();
    telegramFormData.append("chat_id", chatId);
    telegramFormData.append("photo", file, file.name);
    // telegramFormData.append(
    //   "caption",
    //   "New wedding photo uploaded from the website.",
    // );

    if (threadId) {
      telegramFormData.append("message_thread_id", threadId);
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/sendPhoto`,
      {
        method: "POST",
        body: telegramFormData,
      },
    );

    const telegramData = (await telegramResponse.json()) as {
      ok?: boolean;
      description?: string;
    };

    if (!telegramResponse.ok || !telegramData.ok) {
      return NextResponse.json(
        {
          error:
            telegramData.description ||
            "Telegram rejected the upload. Check bot access and chat ID.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 },
    );
  }
}
