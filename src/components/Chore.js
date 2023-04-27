import { useState, useEffect } from "react"
import Link from 'next/link'
import { updateChoreStatus } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";


export default function Chore({chore, isParent, setSelectedChore}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [done, setDone] = useState(chore.done);

  // Toggle chore completion status
  async function toggleDone(){
    if(!isParent){
      const token = await getToken({ template: "codehooks" });
      // const newItem = await updateChoreStatus(token, id, !done);
      setDone(!done)
    }
  }
  
  function viewChore(){
    setSelectedChore(chore); 
  }

  return (
    <>
    <div onClick={viewChore} className="chore-item pure-g">
      <div className="pure-u-3-4">
        <h5 className="chore-name">{chore.title}</h5>
        <h4 className="chore-due">{chore.due}</h4>
        <p className="chore-priority">{chore.priority} Priority</p>
      </div>
    </div>
    {/* <div className="chore">
      <input className="margin" checked={done} type="checkbox" onChange={toggleDone}/>
      <Link href={"/chore/"+chore._id}><span >{chore.title}</span></Link>
    </div> */}
    </>
  )
}