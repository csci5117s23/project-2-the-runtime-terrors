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
          <label htmlFor="assignedTo">Assigned To</label>
          <input type="text" placeholder={chore.assignedTo} id="assignedTo" disabled/>
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
      <form className="form">
        <fieldset>
          <h2 className="form-title">Chore details</h2>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder={chore.title} id="title" disabled/>
          
          <label htmlFor="description">Description</label>
          <textarea placeholder={chore.description} id="description" disabled/>

          <label htmlFor="due">Due</label>
          <input id="due" type="text" placeholder={chore.due} disabled/>
          {/* defaultValue={chore.due} */}

          <label htmlFor="priority">Priority Level</label>
          <input type="text" placeholder={chore.priority} id="priority" disabled/>
          {getExtraInfo()}

        </fieldset>
      </form> 
      </div>
    </div>
    </>
  )
}