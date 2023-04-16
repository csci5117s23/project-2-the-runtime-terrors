import { useState, useEffect } from "react"
import Link from 'next/link'
import { updateChoreStatus } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";


export default function ChoreInfo({id, title, status, isParent}){ 
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

  function getExtraInfo() {
    if(isParent){
      return(
        <>
          <div>Assigned To</div>
          <div id="assignedTo">child assigned to here</div>
          <hr></hr>
          <button type="button" className="pure-button pure-button-primary">Edit</button>
        </>
      )
    }
    else{
      return <button type="button" className="pure-button pure-button-primary">Complete Chore</button>
    }
  }

  return (
    <main>
      <h1>Chore Information</h1>

        <fieldset>
          <legend>Chore Information</legend>
          <div>Title</div>
          <div id="title">{title}</div>
          <hr></hr>

          <div>Description</div>
          <div id="description">description here</div>
          <hr></hr>

          <div>Due</div>
          <div id="due">due date here</div>
          <hr></hr>

          <div>Priority Level</div>
          <div id="priority">priority level here</div>
          <hr></hr>

          {/* Specific info depending on parent or child account type */}
          {getExtraInfo()}
        </fieldset>
    </main>
  )
}