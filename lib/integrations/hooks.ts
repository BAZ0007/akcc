import { env } from "@/lib/env";

async function postWebhook(url: string | undefined, payload: Record<string, unknown>) {
  if (!url) {
    return;
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch (error) {
    console.error("Webhook dispatch failed", error);
  }
}

export async function notifyContactSubmission(payload: Record<string, unknown>) {
  await Promise.all([
    postWebhook(env.n8nWebhookUrl, { workflow: "contact_submission", payload }),
    postWebhook(env.adminNotificationWebhookUrl, { channel: "admin_notification", payload }),
  ]);
}

export async function notifyNewHereSubmission(payload: Record<string, unknown>) {
  await Promise.all([
    postWebhook(env.n8nWebhookUrl, { workflow: "new_here_submission", payload }),
    postWebhook(env.adminNotificationWebhookUrl, { channel: "admin_notification", payload }),
  ]);
}

export async function queueSermonEnrichment(payload: Record<string, unknown>) {
  await postWebhook(env.n8nWebhookUrl, { workflow: "sermon_ai_enrichment", payload });
}

