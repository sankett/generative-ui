'use server';

import {
  createAI,
  getMutableAIState,
  streamUI,
  createStreamableUI,
} from 'ai/rsc';
import { openai } from '@ai-sdk/openai';
import { ReactNode } from 'react';
import { z } from 'zod';
import { nanoid } from 'nanoid';
import { streamObject } from 'ai';
import { NotificationSchema } from './notificationobject';
import { Partial } from '../components/partial';
import { Product } from '../components/product';

export interface ServerMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClientMessage {
  id: string;
  role: 'user' | 'assistant';
  display: ReactNode;
}

export async function sendMessage1(input: string): Promise<ClientMessage> {
  'use server';

  //const partialComponent = createStreamableUI(<div>Loading...</div>);
  const history: any = getMutableAIState();
  const result = await streamUI({
    model: openai('gpt-4o'),
    messages: [...history.get(), { role: 'user', content: input }],
    text: ({ content, done }) => {
      if (done) {
        
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: 'assistant', content },
        ]);
      }

      return <div>{content}</div>;
    },

    tools: {
      showCategory: {
        description: 'Show the product details for a category.',
        parameters: z.object({
          value: z.string().describe('The value.'),
        }),
        generate: async ({ value }) => {
          console.log('value', value);
          const response = await fetch(
            `https://fakestoreapi.com/products/category/${value}`
          ).then((res) => res.json());

          return (
            <div>
              {response.length > 0 ? (
                <Product productlist={response} />
              ) : (
                `No products found for ${value}`
              )}
            </div>
          );
         
        },
      },
      showWeather: {
        description: 'Show the weather for a given location.',
        parameters: z.object({
          city: z.string().describe('The city to show the weather for.'),
          unit: z
            .enum(['C', 'F'])
            .describe("The unit to display the temperature in"),
        }),
        generate: async ({ city, unit }) => {
          return <div>Heres the weather</div>;
        },
      },
      chart: {
        description:
          'You generate specified output for specified duration and show graph type e.g. line,bar',
        parameters: z.object({
          charttype: z
            .string()
            .describe('The type of the chart, example: line, bar, pie, etc.'),
        }),
        generate: async function* ({ charttype }) {
          //await new Promise((resolve) => setTimeout(resolve, 100));
          yield (
            <div style={{ color: 'yellow', fontSize: '16px' }}>
              Preparing for {charttype} chart......
            </div>
          ); // [!code highlight:5]
          await new Promise((resolve) => setTimeout(resolve, 200));
          yield (
            <div style={{ color: 'yellow', fontSize: '16px' }}>
              Getting data for {charttype} chart...
            </div>
          );
          //await new Promise((resolve) => setTimeout(resolve, 1200));

          const { partialObjectStream } = await streamObject({
            model: openai('gpt-4o'),
            system:
              'You generate specified output for specified months in India.',
            prompt: input,
            schema: NotificationSchema,
          });
          //const arr =[]
          let data;
          for await (const partialObject of partialObjectStream) {
            yield (
              <div className="w-full xs:w-4/5 sm:w-4/5 lg:w-2/5">
                <Partial partialObject={partialObject} charttype={charttype} />
              </div>
            );
            data = partialObject;
            //arr.push(partialObject);
          }
          //partialComponent.done();
          return (
            <div className="w-full xs:w-4/5 sm:w-4/5 lg:w-2/5 ">
              <Partial partialObject={data} charttype={charttype} />
            </div>
          );

          //return <div style={{color: "green", width: "50%"}}>{repositoryName} deployed! <Partial partialObject={arr[arr.length-1]} /></div>;
        },
      },
    },
  });

  return {
    id: nanoid(),
    role: 'assistant',
    display: result.value,
  };
}

export const AI1: any = createAI<ServerMessage[], ClientMessage[]>({
  actions: {
    sendMessage1,
  },
  initialAIState: [],
  initialUIState: [],
});
