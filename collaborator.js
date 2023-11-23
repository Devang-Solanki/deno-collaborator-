addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // Discord webhook URL
  const discordWebhookURL = Deno.env.get("webhook");

  try {
    // Store request details
    const requestMethod = request.method;
    const requestUrl = request.url;
    const requestHeaders = [];
    for (var pair of request.headers.entries()) {
      requestHeaders.push(`${pair[0]}: ${pair[1]}`);
    }

    // Format request details for Discord message
const discordMessage = `
🚀 **Received Request Details** 🛰️
\`\`\`plaintext
    📌 Method: ${requestMethod}
    🌐 URL: ${requestUrl}
\`\`\`    
📎 **Headers** 📄
\`\`\`
    ${requestHeaders.join('\n    ')}
\`\`\`
`;




    // Send formatted message to Discord webhook
    await fetch(discordWebhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: discordMessage,
      }),
    });

    return new Response('Request details sent to Discord webhook!', {
      status: 200,
    });
  } catch (error) {
    return new Response('Error occurred while sending request details to Discord!', {
      status: 500,
    });
  }
}
