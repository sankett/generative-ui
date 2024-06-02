import { createAI, getAIState,createStreamableUI, streamUI  } from 'ai/rsc';
import { ReactNode } from 'react';
import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
export type AIState = Array<{
  role: 'user' | 'assistant';
  content: string;
}>;

export type UIState = Array<{
  id: string;
  role: 'user' | 'assistant';
  display: ReactNode;
}>;

async function sendMessage(message: string) {
  'use server';

  const stream = createStreamableUI(<div>Loading..</div>);
 
  const history = getAIState();
  const response = await generateText({
    model: openai('gpt-4o'),
    messages: [...history, { role: 'user', content: message }],
  });

 
  stream.done(<div style={{fontSize: "14px"}}>{response.text}</div>);
  

  return { text: response.text, display: stream.value};
}

export const AI = createAI({
  initialAIState: [] as AIState,
  initialUIState: [] as UIState,
  actions: {
    sendMessage,
  },
});
