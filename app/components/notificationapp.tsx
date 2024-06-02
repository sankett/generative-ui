'use client';

import { useState } from 'react';
import { Notifications } from '../actions/notifications';
import { readStreamableValue } from 'ai/rsc';

export function Notificationapp() {
  const [generation, setGeneration] = useState<string>('');
  const [notify, setNotify] = useState('');
  const [text, setText] = useState("Gold Price in India per 10 gm duration Jan 2022 to Dec 2022");
const onTextChange = (e) => {
    setText(e.target.value);
}

  return (
    <div>
      <input type="text" value={text} style={{width: "500px"}} onChange={onTextChange}  />
      <button
        onClick={async () => {
          const { object, notificationComponent } = await Notifications(text);
          setNotify(notificationComponent)
          for await (const partialObject of readStreamableValue(object)) {
            if (partialObject) {
                
              setGeneration(
                JSON.stringify(partialObject.notifications, null, 2),
              );
            }
          }
        }}
      >
        Show
      </button>

      <div className="flex flex-row">
        <div className="basis-1/2 border-dotted border-2 border-slate-600 rounded-md">
          <div className='w-3/4 text-sm'>
        <pre>{generation}</pre>
        </div>
        </div>
        <div className="basis-1/2 border-dotted border-2 border-indigo-600 rounded-md text-sm">
        {notify} 
        </div>
      </div>
    </div>
  )
}