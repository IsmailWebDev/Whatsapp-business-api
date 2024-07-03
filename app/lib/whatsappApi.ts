const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;
const WEBHOOK_API_URL = process.env.NEXT_PUBLIC_WEBHOOK_API_URL;
const WP_BUSINESS_ID = process.env.NEXT_PUBLIC_WP_BUSINESS_ID;
const NUMBER_ID = process.env.NEXT_PUBLIC_NUMBER_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_WP_TOKEN;

export async function fetchMessages() {
  const response = await fetch(`${WEBHOOK_API_URL}/messages`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }
  return response.json();
}

export async function sendMessage(to: string, text: string) {
  await fetch(`${WP_API_URL}/${NUMBER_ID}/messages`, {
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
  });
  const response = await fetch(`${WEBHOOK_API_URL}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: { body: text },
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  return response.json();
}
export async function fetchTemplates() {
  const response = await fetch(
    `${WP_API_URL}/${WP_BUSINESS_ID}/message_templates`,
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

export async function sendTemplate(to: string, templateName: string) {
  const response = await fetch(
    `${WP_API_URL}/${NUMBER_ID}/messages`,
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
            },
          ],
        },
      }),
    }
  );
  const templates = await fetchTemplates();
  const template = await templates.find(
    (item: any) => item.name === templateName
  );
  if (!template) {
    return null;
  }

  const bodyComponent = template.components.find(
    (component: any) => component.type === 'BODY'
  );

  if (!bodyComponent) {
    return null;
  }

  await fetch(`${WEBHOOK_API_URL}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: { body: bodyComponent.text },
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
    `${WP_API_URL}/${WP_BUSINESS_ID}/message_templates`,
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
