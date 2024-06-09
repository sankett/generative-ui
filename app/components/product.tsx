"use client"

import { useState } from 'react';
export function Product({productlist}){
    const [data, setData] = useState(productlist);

    function remove(value){
       
        const arr = [...data];
        arr.splice(value, 1);
        
        setData(arr)
    }
    function reset(){
        setData(productlist)
    }
    if(data.length === 0){
        return <button className="text-white text-xs bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
         onClick={reset}>Reset</button>
    }
    return (
        <div>
          
          
     
                       
                {data.map((product, index) => (
                   <div key={index} className="grid grid-cols-8 gap-4  border-0 border-gray-300">
                   
                   <div className="col-span-8">
                    <span className="grid grid-cols-1 gap-4 text-yellow-500 text-md">{product.title}</span>
                    <span className="grid grid-cols-1 gap-4 text-violet-500 text-md">${product.price}</span> 
                    <span className="grid grid-cols-1 gap-4 text-cyan-500 text-xs">{product.description}</span> 
                   </div>
                   <div className="col-span-8 border-b border-white"><button type="button" onClick={() => remove(index)}
                   className="text-white text-xs  bg-blue-700 rounded-lg px-2 py-1 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Remove</button>
                   
                   </div>
               </div>
                ))}
            
        </div>
    )

}