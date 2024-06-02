'use client';

import { useState } from 'react';
import { Message, Conversations } from '../actions/conversations';

export default function WeatherConversations() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('get products for electronics');

  const textChange = async (event) => {
    setInput(event.target.value);
  };

  const sendMessage = async () => {
    const { messages } = await Conversations([
        ...conversation.map(({ role, content }) => ({ role, content })),
        { role: 'user', content: input }
    ]);
    setConversation(messages);
  };

  return (
    <div >
      <div>
        {conversation.map((message, index) => (
          <div key={index} className='grid grid-cols-1'>
            {message.role}: {message.content}
            {message.display}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={input}
          onChange={textChange}
          className='bg-white dark:bg-slate-800'
        />
        <button  onClick= {sendMessage}>
            Send Message
        </button>
      </div>
    </div>
  );
}
