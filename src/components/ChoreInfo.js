import { useState, useEffect } from "react"
import Link from 'next/link'
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/router'


export default function ChoreInfo({chore, isParent}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [done, setDone] = useState(chore.done);
  const router = useRouter();

  // MISSING GET ISPARENT INFO --> get it from [id].js???

  // Toggle chore completion status
  async function toggleDone(){
    const token = await getToken({ template: "codehooks" });
    // const newItem = await updateChoreStatus(token, id, !done); ???
    setDone(!done);
    router.push("/home");
  }

  // Re-route to edit page
  async function edit(){
    router.push("/edit/"+chore._id);
  }

  function getExtraInfo() {
    if(isParent){
      return(
        <>
          <div>Assigned To</div>
          <div id="assignedTo">{chore.assignedTo}</div>
          <hr></hr>
          <button onClick={edit} type="button" className="pure-button pure-button-primary">Edit</button>
        </>
      )
    }
    else{
      return <button onClick={toggleDone} type="button" className="pure-button pure-button-primary">Complete Chore</button>
    }
  }

  return (
    <>
    <div className="email-content">
      <div className="email-content-header">
        <h1 className="email-content-title">{chore.title}</h1>
        <p className="email-content-subtitle">
            Created at <span>3:56pm, April 3, 2021</span>
        </p>
      </div>

      <div className="email-content-body">
        <h1>Chore Information: </h1>
        <fieldset>
          <legend>Chore Information</legend>
          <div>Title</div>
          <div id="title">{chore.title}</div>
          <hr></hr>

          <div>Description</div>
          <div id="description">{chore.description}</div>
          <hr></hr>

          <div>Due</div>
          <div id="due">{chore.due}</div>
          <hr></hr>

          <div>Priority Level</div>
          <div id="priority">{chore.priority}</div>
          <hr></hr>

          {/* Specific fields depending on parent or child account type */}
          {getExtraInfo()}
        </fieldset>
      </div>
    </div>
    </>
  )
}