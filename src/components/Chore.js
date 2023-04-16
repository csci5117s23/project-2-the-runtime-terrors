import { useState, useEffect } from "react"
import Link from 'next/link'
import { updateChoreStatus } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";


export default function Chore({id, title, status, isParent}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [done, setDone] = useState(status);

  // Toggle chore completion status
  async function toggleDone(){
    if(!isParent){
      const token = await getToken({ template: "codehooks" });
      // const newItem = await updateTodoStatus(token, id, !done);
      setDone(!done)
    }
  }
  
  return (
    <>
    <div className="chore">
      <input className="margin" checked={done} type="checkbox" onChange={toggleDone}/>
      <Link href={"/chore/"+id}><span >{title}</span></Link>
    </div>
    </>
  )
}