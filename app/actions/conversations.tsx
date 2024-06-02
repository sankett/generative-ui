'use server';

import { generateText, streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableUI } from 'ai/rsc';
import { ReactNode } from 'react';
import { z } from 'zod';
import { Product } from '../components/product';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  display?: ReactNode; // [!code highlight]
}

export async function Conversations(history: Message[]) {
  const stream = createStreamableUI(<div>Loadiing..</div>);

  const { text, toolResults } = await generateText({
    model: openai('gpt-4o'),
    system: 'You are a friendly weather assistant!',
    messages: history,
    tools: {
      showWeather: {
        description: 'Show the weather for a given location.',
        parameters: z.object({
          city: z.string().describe('The city to show the weather for.'),
          unit: z
            .enum(['C', 'F'])
            .describe('The unit to display the temperature in'),
        }),
        execute: async ({ city, unit }) => {
          stream.done(
            <div>
              {city}-{unit}{' '}
            </div>
          );
          return `Here's the weather for ${city}!`;
        },
      },
      showCategory: {
        description: 'Show the product details for a category.',
        parameters: z.object({
          value: z.string().describe('The value.'),
        }),
        execute: async ({ value }) => {
          const response = await fetch(
            `https://fakestoreapi.com/products/category/${value}`
          ).then((res) => res.json());

          stream.done(
            <div>
              <Product productlist={response} />
            </div>
          );
          return `Here's the category details! ${value}`;
        },
      },
    },
  });

  console.log('history', history);
  return {
    messages: [
      ...history,
      {
        role: 'assistant' as const,
        content:
          text || toolResults.map((toolResult) => toolResult.result).join(),
        display: stream.value,
      },
    ],
  };
}
