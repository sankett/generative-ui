import dynamic from 'next/dynamic';
import { Notificationapp } from './components/notificationapp';
import WeatherConversations from './components/weatherconversations';
import { AI } from './actions/mixedstate';
import { AI1 } from './actions/mixeduistate';
import MixedComponent from "./components/mixedcomponent";
import MixedUIComponent from './components/mixeduicomponent';
import Image from 'next/image';
const LineChart = dynamic(() => import('./components/chart/linechart'), { ssr: false });

export default function Home() {
  
  return (
    <main className="min-h-screen flex-col items-center justify-between  bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
      <header className="bg-gray-800 w-full py-1 border-b border-white">
        <span className="text-left text-yellow-500 text-2xl font-bold-100 pl-2 inline w-full">
          Generative UI Demo with AI
        </span><sup className='text-white ml-3 italic'> By Sanket Terdal</sup>
        
      </header>
      <div className='flex-1'>
     <AI1>
     <MixedUIComponent />
     </AI1>
     </div>
    </main> 
  );
}
