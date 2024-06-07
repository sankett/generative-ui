'use client';
//MixedUIComponent

import { useState, useEffect, useRef } from 'react';
import { ClientMessage } from '../actions/mixeduistate';
import { useActions, useUIState } from 'ai/rsc';
import { nanoid } from 'nanoid';

export default function Home() {
  const [input, setInput] = useState<string>('');
  const [conversation, setConversation] = useUIState();
  const { sendMessage1 } = useActions();
  const [selectedValue, setSelectedValue] = useState('');
  
  const scrollRef = useRef(null);

  useEffect(() => {
    /*const interval = setInterval(() => {
      
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        
      }
    }, 200);
    
    return () => clearInterval(interval);*/
    const scrollElement = scrollRef.current;

    const observer = new MutationObserver(() => {
      scrollElement.scrollTop = scrollElement.scrollHeight;
    });

    observer.observe(scrollElement, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleChange =async  (event) => {
    if(event.target.value === ''){
      return;
    }
    setSelectedValue(event.target.value);
   
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: nanoid(), role: 'user', display: event.target.value },
    ]);

    const message = await sendMessage1(event.target.value);
    
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message,
    ]);
    setInput(message.display);
  };
  console.log("test")
  return (
    <div  className="h-screen bg-gray-900 text-white  flex-col items-center">
      <div  ref={scrollRef} className="bg-gray-800 w-full max-w-8xl   h-5/6 overflow-y-auto ">
        {conversation.map(
          (message: ClientMessage) => (
            console.log('message', typeof message.display),
            (
              <div
                key={message.id}
                className={`px-3 py-2  text-sm           
          ${
            message.role === 'user' ? 'bg-blue-600' : 'bg-black-600'
          } `}
              >
              <pre className='whitespace-pre-wrap'>  {message.display}</pre>
              </div>
            )
          )
        )}
      </div>
      
      <div>
        <div className="w-full max-w-xs  my-2 ">
          
          <select
            id="select"
            value={selectedValue}
            onChange={handleChange}
            className=" bg-gray-700 border-none text-white text-xs px-4 py-2 
             w-full  border border-gray-400 hover:border-gray-500"
          >
            <option value="" disabled>
              Select an option
            </option>
            <option value="Longest 5 rivers in world">Longest 5 rivers in world</option>            
            <option value="Gold price in India from Jan to Jun 2023 draw line chart">Gold price in India from Jan to Jun 2023 draw line chart</option>
            <option value="Get products for electronics">Get products for electronics</option>
            <option value="Show me products for jewelery">Show me products for jewelery</option>
            <option value="Recipe of Pizza">Recipe of Pizza</option>
            <option value="List out products for men\'s clothing">List out products for mens clothing</option>
            <option value="For women\'s clothing list all products">For womens clothing list all products</option>
            <option value="Population in India from Year 2010 to 2023 draw bar chart">Population in India from Year 2010 to 2023 draw bar chart</option>
            
          </select>
       
        </div>
      </div>
    </div>
  );
}