import { useState, useEffect } from "react"
import Link from 'next/link'
import { updateChoreStatus } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/router'


export default function Chore({chore, isParent, setSelectedChore}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [done, setDone] = useState(chore.done);
  const router = useRouter();

  // Toggle chore completion status
  async function toggleDone(){
    if(!isParent){
      const token = await getToken({ template: "codehooks" });
      if(!done){
        router.push("/complete/"+chore._id);
      }
      else{
        // ???
      }
    }
  }
  
  function viewChore(){
    setSelectedChore(chore); 
  }

  function getDoneStatus(){
    if(isParent){
      return  <input className="margin-right" checked={done} type="checkbox" disabled/>
    }
    else{
      return <input className="margin-right" checked={done} type="checkbox" onChange={toggleDone}/>
    }
  }

  return (
    <>
    <div onClick={viewChore} className="chore-item pure-g">
      <div className="pure-u-3-4">
        {getDoneStatus()}
        <span className="chore-name">{chore.title}</span>
        <h4 className="chore-due">Due: {chore.due}</h4>
        <p className="chore-priority">{chore.priority} Priority</p>
      </div>
    </div>
    {/* <Link href={"/chore/"+chore._id}><span >{chore.title}</span></Link> */}
    </>
  )
}