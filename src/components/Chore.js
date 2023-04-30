import { useState, useEffect } from "react"
import Link from 'next/link'
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
    // Small screen --> mobile view - https://www.w3schools.com/howto/howto_js_media_queries.asp
    if(!window.matchMedia("screen and (min-width: 48em)").matches){
      router.push("chore/"+chore._id)
    }
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

  function getDate(){
    // console.log("okok: " + chore.due)
    let newDate = new Date(chore.due);
    // console.log("here: " + newDate.toString());
    // console.log("new: " + newDate.toLocaleString());
    // console.log("time: " + newDate.toLocaleDateString());

    return chore.due
  }

  // console.log(newDate.toString())
  // console.log(newDate.toLocaleTimeString('en-US'))
  return (
    <>
    <div onClick={viewChore} className="chore-item pure-g">
      <div className="pure-u-3-4">
        {getDoneStatus()}
        <span className="chore-name">{chore.title}</span>
        <h4 className="chore-due">Due: {getDate()}</h4>
        <p className="chore-priority">{chore.priority} Priority</p>
      </div>
    </div>
    {/* <Link href={"/chore/"+chore._id}><span >{chore.title}</span></Link> */}
    </>
  )
}