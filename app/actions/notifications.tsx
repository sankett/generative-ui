'use server';

import { streamObject } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createStreamableValue, createStreamableUI } from 'ai/rsc';
import { z } from 'zod';
import { NotificationSchema } from './notificationobject';
import { Partial } from '../components/partial.tsx';

export async function Notifications(input: string) {
  'use server';

  const stream = createStreamableValue();
  const partialComponent = createStreamableUI(<div>Loading...</div>);

  (async () => {
    const { partialObjectStream } = await streamObject({
      model: openai('gpt-4o'),
      system: 'You generate specified output for specified months in India.',
      prompt: input,
      schema: NotificationSchema,
    });

    //let messages = [{ role: 'user', content: "user1" }, { role: 'assistant', content: "assistant1..." },{ role: 'user', content: "user2" }, { role: 'assistant', content: "" }];

    for await (const partialObject of partialObjectStream) {
      partialComponent.update(<Partial partialObject={partialObject} />);      
      //messages = [...messages, { role: 'assistant', content: partialObject.notifications }];
      stream.update(partialObject);
    }
    //console.log(JSON.stringify(messages));
    partialComponent.done();
    stream.done();
  })();

  return { object: stream.value,  notificationComponent: partialComponent.value, };
}
