import { NextResponse } from "next/server";
export const runtime = 'edge';
export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const threadId = process.env.TELEGRAM_THREAD_ID;

  if (!botToken) {
    return NextResponse.json(
      { ok: false, error: "Missing TELEGRAM_BOT_TOKEN in .env.local" },
      { status: 500 },
    );
  }

  try {
    const meResponse = await fetch(
      `https://api.telegram.org/bot${botToken}/getMe`,
      { cache: "no-store" },
    );
    const meData = (await meResponse.json()) as {
      ok?: boolean;
      result?: { id?: number; username?: string; first_name?: string };
      description?: string;
    };

    if (!meResponse.ok || !meData.ok) {
      return NextResponse.json(
        {
          ok: false,
          error:
            meData.description || "Telegram getMe failed. Check bot token.",
        },
        { status: 502 },
      );
    }

    let sendTest: { ok: boolean; description: string } | null = null;

    if (chatId) {
      const payload = new URLSearchParams();
      payload.set("chat_id", chatId);
      payload.set("text", "Telegram test from wedding website bot.");
      if (threadId) payload.set("message_thread_id", threadId);

      const sendResponse = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          body: payload,
          cache: "no-store",
        },
      );
      const sendData = (await sendResponse.json()) as {
        ok?: boolean;
        description?: string;
      };

      sendTest = {
        ok: Boolean(sendResponse.ok && sendData.ok),
        description:
          sendData.description ||
          (sendResponse.ok ? "Message sent." : "sendMessage failed."),
      };
    }

    return NextResponse.json({
      ok: true,
      bot: meData.result,
      configuredChatId: chatId || null,
      configuredThreadId: threadId || null,
      sendTest,
      note: chatId
        ? "If sendTest.ok is true, your chat settings work."
        : "Set TELEGRAM_CHAT_ID to also test sending a message.",
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unexpected error while testing Telegram config." },
      { status: 500 },
    );
  }
}
