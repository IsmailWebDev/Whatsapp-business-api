// lib/whatsappApi.ts
const API_URL = `${process.env.API_URL}/messages`;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_WP_TOKEN;

export async function fetchMessages() {
  const response = await fetch(
    `https://dot-languid-approach.glitch.me/messages`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return response.json();
}

export async function sendMessage(text: string) {
  await fetch(
    `https://graph.facebook.com/v19.0/371843412675509/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: '212678184812',
        type: 'text',
        text: { body: text },
      }),
    }
  );
  const response = await fetch(
    `https://dot-languid-approach.glitch.me/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: { body: text },
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  return response.json();
}
