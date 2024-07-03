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

export async function sendMessage(to: string, text: string) {
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
        to: to,
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
export async function fetchTemplates() {
  const response = await fetch(
    `https://graph.facebook.com/v19.0/337588036111090/message_templates`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch templates');
  }

  const data = await response.json();
  return data.data;
}

export async function sendTemplate(
  to: string,
  templateName: string,
  parameters: any[]
) {
  const response = await fetch(
    `https://graph.facebook.com/v19.0/371843412675509/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: 'en_US' },
          components: [
            {
              type: 'body',
              parameters: parameters,
            },
          ],
        },
      }),
    }
  );
  await fetch(`https://dot-languid-approach.glitch.me/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: { body: templateName },
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to send template message');
  }
  return response.json();
}

export async function registerTemplate(
  name: string,
  components: any[],
  category: string
) {
  const response = await fetch(
    `https://graph.facebook.com/v19.0/337588036111090/message_templates`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        language: 'en_US',
        category: category,
        components: components,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to register template');
  }
  return response.json();
}
