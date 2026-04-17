Header Authorization webhook:
key: x-api-key
value: N8N_API_KEY set in .env.local


Contact Form:
-------------------

Webhook URL: https://n8n.zeeshanai.cloud/webhook/dad8b200-b891-4c28-ba08-9555d4e1aeba
Type: POST

Body:
{
  "name": "zeeshan",
  "email": "zeeshan@example.com",
  "message": "Good app!"
}

Responses:

Successful Response:
{
  "success": true,
  "status": "CONTACT_SUBMITTED",
  "message": "Your message has been received successfully"
}