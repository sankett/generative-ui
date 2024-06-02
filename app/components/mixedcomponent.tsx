'use client';

import { useActions, useAIState } from 'ai/rsc';
import { AI } from '../actions/mixedstate';

export default function MixedComponent() {
  const { sendMessage } = useActions<typeof AI>();
  const [messages, setMessages] = useAIState<typeof AI>();

  const handleSubmit = async event => {
    event.preventDefault();
    
    setMessages([
      ...messages,
      {  role: 'user', content: event.target.message.value },
    ]);   
    const {text, display} = await sendMessage(event.target.message.value);   
    console.log(display);
    setMessages((messages) => [...messages, { role: 'assistant', content: text }])
  };
  
  return (
    <>
      <ul>
        {messages.map((message,index) => (
          <li key={index}>{message.role}:{message.content}
          <br></br>
          
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="message" />
        <button type="submit">Send</button>
      </form>
    </>
  );
}