"use client"
import axios from 'axios'

import React from 'react'
import { useState } from 'react'


import { redirect } from 'next/navigation'




function page() {
    const [type, settype] = useState<string>("")
    const [role, setrole] = useState<string>("")
    const [level, setlevel] = useState<string>("")
    const [techstack, settechstack] = useState<string>("")
    const [amount, setamount] = useState< string |number >("")
    const [enable, setenable] = useState<boolean>(true);
    
    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        setenable(false)
        
        e.preventDefault();
        console.log("Form submitted with values:", { type, role, level, techstack, amount });
        const Data = {
            role:role,
            type:type,
            level:level,
            techstack:techstack,
            amount:amount
        }
       const res= await axios.post("/api/vapi/generate",Data)
       
        redirect("/")
        
       

    }



  return (
   <div className='flex flex-col items-center justify-center h-full translate-y-15 mt-0'>
    <form onSubmit={handleSubmit} className='w-[300px] lg:w-[400px]  bg-gradient-to-br bg-transparent border-2 rounded-2xl border-white  shadow-2xl text-white flex flex-col p-6 font-mono '>
        <label htmlFor="" className='text-xl font-extrabold '>Type</label>
        <input  type="text" value={type} onChange={e=>settype(e.target.value)}  placeholder='Technical, behavioural or Mixed' className='outline-none border-b-2 border-white bg-transparent p-1 mt-0.5 mb-2 placeholder:text-white/15' required/>

        <label htmlFor="" className='text-xl font-extrabold '>Level</label>
        <input required type="text" value={level} onChange={e=>setlevel(e.target.value)} placeholder='senior ,junior...' className='outline-none border-b-2 border-white bg-transparent p-1 mt-0.5 mb-2 placeholder:text-white/15'/>

        <label htmlFor="" className='text-xl font-extrabold '>Techstack</label>
        <input required type="text" value={techstack} onChange={e=>settechstack(e.target.value)} placeholder='Reactjs,Mongodb,etc' className='outline-none border-b-2 border-white bg-transparent p-1 mt-0.5 mb-2 placeholder:text-white/15'/>


        <label htmlFor="" className='text-xl font-extrabold '>Role</label>
        <input required type="text" value={role} onChange={e=>setrole(e.target.value)} placeholder='Sde ...' className='outline-none border-b-2 border-white bg-transparent p-1 mt-0.5 mb-2 placeholder:text-white/15'/>

        <label htmlFor="" className='text-xl font-extrabold '>Amount</label>
        <input required type="text" value={amount} onChange={e=>setamount(e.target.value)} placeholder='Amount of questions u want' className='outline-none border-b-2 border-white bg-transparent p-1 mt-0.5 mb-2 placeholder:text-white/15'/>
        {enable? <button type='submit' className='bg-green-500 p-2 mt-2.5 font-bold font-mono rounded hover:bg-green-700 w-full'>Generate</button>:

                <div className='flex items-center justify-center w-full mt-2.5'>
                    <div className="flex items-center justify-center h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500  border-e-transparent " role="status">
            
                    </div> 
                    
                </div>
                
        
        
        }
        
    </form>

   </div>
  )
}

export default page
