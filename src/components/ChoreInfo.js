import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import { useRouter } from 'next/router'
import { deleteChore, getChild } from "@/modules/Data";


export default function ChoreInfo({chore, isParent, chores}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();
  const [assignedTo, setAssignedTo] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getChildName() {
      if (userId && isParent) {
        const token = await getToken({ template: "codehooks" });
        const child = await getChild(token, chore.assignedTo);

        setAssignedTo(child[0].childName);
      }
      setLoading(false);
    }
    getChildName();
  }, [isLoaded]);

  // Re-route to edit page
  async function edit(){
    router.push("/edit/"+chore._id);
  }

  // Re-route to complete page
  async function complete(){
    router.push("/complete/"+chore._id);
  }

  // Delete chore
  async function remove(){
    const token = await getToken({ template: "codehooks" });
    await deleteChore(token, chore._id);
    chores();
  }

  function getExtraInfo() {
    if(isParent){
      return(<>
        <label htmlFor="assignedTo">Assigned To</label>
        <input type="text" placeholder={assignedTo} id="assignedTo" disabled/>
        <button onClick={edit} type="button" className="pure-button pure-button-primary">Edit</button>
        <button onClick={remove} type="button" className="pure-button pure-button-primary">Delete</button>
      </>)
    }
    else{
      return <button onClick={complete} type="button" className="pure-button pure-button-primary">Update or Complete Chore</button>
    }
  }
  
  // Date string maniputlation
  function refineDate(){
    const newDate = new Date(chore.due);
    let newDate2 = newDate.getMonth() + "-"+ newDate.getDate() + "-" + newDate.getFullYear() + " at ";
    let hours = (newDate.getHours()>=12? newDate.getHours()-12 : newDate.getHours());
    let minutes = (newDate.getMinutes()<10?'0':'') + newDate.getMinutes();
    // from https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format
    let ampm = (newDate.getHours()>=12?'PM':'AM');
    newDate2 = newDate2 + hours+ ":" + minutes+ " " + ampm;
    return newDate2;
  }

  if(!loading){
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
            <input id="due" type="text" placeholder= {refineDate()} disabled/>
          
            <label htmlFor="priority">Priority Level</label>
            <input type="text" placeholder={chore.priority} id="priority" disabled/>

            <label htmlFor="image">Screenshot</label>
            <img src={chore.imageContent} alt="No screenshot for chore" />
            {getExtraInfo()}

          </fieldset>
        </form> 
        </div>
      </div>
      </>
    )
  }
}