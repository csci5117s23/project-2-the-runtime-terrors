import { useState, useEffect } from "react"
import Link from 'next/link'
import { updateChoreStatus } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";


export default function Chore2({chore, isParent, setSelectedChore}){ 
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
    console.log("here")
    setSelectedChore(chore); 
  }


  return (
    <>
    <div onClick={viewChore} className="email-item email-item-unread pure-g">
      <div className="pure-u">
        <img width="64" height="64" alt="Chore avatar" className="email-avatar" src="/img/common/ericf-avatar.png"/>
      </div>

      <div className="pure-u-3-4">
        <h5 className="email-name">{chore.title}</h5>
        <h4 className="email-subject">{chore.due}</h4>
        <p className="email-desc">{chore.description}</p>
      </div>
    </div>
    {/* <div className="chore">
      <input className="margin" checked={done} type="checkbox" onChange={toggleDone}/>
      <Link href={"/chore/"+chore._id}><span >{chore.title}</span></Link>
    </div> */}
    </>
  )
}