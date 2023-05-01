import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/router'
import { deleteChore, getChild, completeChore } from "@/modules/Data";
import { notifyChore } from "@/modules/Push";


export default function ChoreInfo({chore, isParent, chores}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();
  const [assignedTo, setAssignedTo] = useState("");

  // Get name of child (who this chore is assigned to)
  useEffect(() => {
    async function getChildName() {
      if (userId && isParent) {
        const token = await getToken({ template: "codehooks" });
        const child = await getChild(token, chore.assignedTo);
        setAssignedTo(child[0].childName);
      }
    }
    getChildName();
  });

  // Re-route to edit page
  async function edit(){
    router.push("/edit/"+chore._id);
  }

  // Re-route to complete page
  async function complete(){
    router.push("/complete/"+chore._id);
  }

  // Mark chore as incomplete
  async function incomplete(){
    const token = await getToken({ template: "codehooks" });
    await completeChore(token, false, null, null, chore._id);

    // Mobile view --> go back to home page
    if(!chores){
      router.push("/home");
    }
    else{
      chores("", "");
    }
  }

  // Delete chore
  async function remove(){
    const token = await getToken({ template: "codehooks" });
    await deleteChore(token, chore._id);

    // Mobile view --> go back to home page
    if(!chores){
      router.push("/home");
    }
    else{
      chores("", "");
    }
  }

  // Notifications 
  async function notify() {
    const token = await getToken({ template: "codehooks" });
    await notifyChore(token, chore);
  }

  // Get extra parent vs child buttons
  function getExtraInfo() {
    if(isParent){
      return(<>
        <label htmlFor="assignedTo">Assigned To</label>
        <input type="text" placeholder={assignedTo} id="assignedTo" disabled/>
        <button onClick={edit} type="button" className="pure-button pure-button-primary">Edit</button>
        <button onClick={remove} type="button" className="pure-button pure-button-primary">Delete</button>
        <button onClick={notify} type="button" className="pure-button pure-button-primary">Notify</button>
      </>)
    }
    else if(chore.done){
      return <button onClick={incomplete} type="button" className="pure-button pure-button-primary">{"Mark Chore as Incomplete"}</button>
    }
    else{
      return <button onClick={complete} type="button" className="pure-button pure-button-primary">{"Mark Chore as Complete"}</button>
    }
  }

  return (
    <>
    <div className="chore-content">
      <div className="chore-content-header">
        <h1 className="chore-content-title">{chore.title}</h1>
        <p className="chore-content-subtitle">
          Created on <span>{new Date(chore.createdOn).toLocaleDateString()}</span>
        </p>
      </div>

      <div className="form">
        <fieldset>
          <h2 className="form-title">Chore details</h2>
          <label htmlFor="title">Title</label>
          <input type="text" placeholder={chore.title} id="title" disabled/>
          
          <label htmlFor="description">Description</label>
          <textarea placeholder={chore.description} id="description" disabled/>

          <label htmlFor="due">Due</label>
          <input id="due" type="text" placeholder={new Date(chore.due).toLocaleString()} disabled/>
        
          <label htmlFor="priority">Priority Level</label>
          <input type="text" placeholder={chore.priority} id="priority" disabled/>

          <label htmlFor="image">Screenshot</label>
          <img className="imgField" src={chore.imageContent} alt="No screenshot for chore" />
          {getExtraInfo()}

        </fieldset>
      </div> 
      </div>
    </>
  )
}