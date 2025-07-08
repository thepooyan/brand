import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST({request}:{request: Request}) {
  const { messages } = await request.json();

  const result = streamText({
    model: google('gemini-2.5-flash'),
    messages,
  });

  return result.toDataStreamResponse()
}
