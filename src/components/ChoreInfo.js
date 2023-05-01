import { useState, useEffect } from "react"
import Link from 'next/link'
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/router'
import { deleteChore } from "@/modules/Data";
import { notifyChore } from "@/modules/Push";


export default function ChoreInfo({chore, isParent, chores}){ 
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

  // Delete chore
  async function remove(){
    const token = await getToken({ template: "codehooks" });
    await deleteChore(token, chore._id);
    chores();
  }

  async function notify() {
    const token = await getToken({ template: "codehooks" });
    await notifyChore(token, chore);
  }

  function getExtraInfo() {
    if(isParent){
      return(
        <>
          <label htmlFor="assignedTo">Assigned To</label>
          <input type="text" placeholder={chore.assignedTo} id="assignedTo" disabled/>
          <button onClick={edit} type="button" className="pure-button pure-button-primary">Edit</button>
          <button onClick={remove} type="button" className="pure-button pure-button-primary">Delete</button>
          <button onClick={notify} type="button" className="pure-button pure-button-primary">Notify</button>
        </>
      )
    }
    else{
      return <button onClick={toggleDone} type="button" className="pure-button pure-button-primary">Complete Chore</button>
    }
  }

  return (
    <>
    <div className="chore-content">
      <div className="chore-content-header">
        <h1 className="chore-content-title">{chore.title}</h1>
        <p className="chore-content-subtitle">
            Created at <span>{chore.createdOn}</span>
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

          <label htmlFor="priority">Screenshot</label>
          <img src={chore.imageContent} alt="No screenshot for chore" />
          {getExtraInfo()}

        </fieldset>
      </form> 
      </div>
    </div>
    </>
  )
}