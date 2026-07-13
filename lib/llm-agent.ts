import { systemPromptBlueprint as systemPrompt } from './prompt-blueprint';

export async function runGeminiLLM(customer: any, stage: string, action: string, userUtterance: string, apiKey: string): Promise<string> {

  const userPrompt = `Customer context:
Customer name: ${customer.name}
Current onboarding stage: ${stage}
Next best action: ${action}
Previous objection: ${customer.previousObjection || 'None'}
Preferred language: ${customer.language}
Retry count: ${customer.retryCount || 0}
Current time: ${new Date().toLocaleTimeString()}

Task:
Have a natural voice conversation with the customer and nudge them to take the next step in the onboarding journey.

Important:
- Keep the conversation focused on the customer’s current stage only.
- Use the customer’s language.
- If the customer replies in voice or text, respond naturally and continue from that reply.
- If the customer has already completed the current step, refresh the status before responding.
- If the customer asks for a human, escalate.
- If the customer asks for WhatsApp, send the approved journey only after consent.
- If the customer gives a callback time, schedule it only after confirmation.
- If the customer objects, classify the objection and respond with approved logic.
- Never ask for OTP, CVV, PIN, full card number, or password.
- Provide ONLY the text response you will say back to the user. Do not include quotes or metadata.

USER SAID: "${userUtterance}"`;

  const prompt = `${systemPrompt}\n\n${userPrompt}`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 100,
        }
      })
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'API request failed');
    }

    const data = await response.json();
    return data.candidates[0].content.parts[0].text.trim();
  } catch (error: any) {
    console.error('LLM Error:', error);
    return `Error connecting to LLM: ${error.message}`;
  }
}
