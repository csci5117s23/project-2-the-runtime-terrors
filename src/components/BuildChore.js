import { useState, useEffect, useRef, useCallback } from "react"
import { addChore, getChildren, updateChore, deleteChore } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import Webcam from "react-webcam";
import Link from 'next/link'


export default function BuildChore({isEditing, chore}) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [childrenList, setChildrenList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);


  // Get list of this user's children
  useEffect(() => {
    async function children() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        const children = await getChildren(token);
        if(children.length == 0){
          setErrorMsg(<>
            <div className="errorMsg">Before assigning a chore, you must <Link className="link" href="/connect"> connect a child account</Link></div>
          </>);
        }
        setChildrenList(children);
        setLoading(false);
      }
    }
    children();
  }, [isLoaded]);
  
  //for webcam
  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  // Add or update chore
  async function save(e) {
    e.preventDefault();

    // Get form data
    const title = e.target.title.value;
    const description = e.target.description.value;
    const assignedTo = e.target.assignedTo.value;
    const due = e.target.due.value;
    const priority = e.target.priority.value;
    const token = await getToken({ template: "codehooks" });

    // Update existing chore
    if(isEditing){
      await updateChore(token, title, description, assignedTo, due, priority, img, chore._id);
    }
    // Add new chore
    else{
      await addChore(token, title, description, assignedTo, due, priority);
    }
    router.push('/home');
  }

  // Reference: https://codeflarelimited.com/blog/dynamically-populate-select-options-in-react-js/
  function getChildOptions() {
    return childrenList.map((child) => {
      return <option key={child.childId} value={child.childId}>{child.childName}</option>;
    });
  }

  // Cancel editing/adding chore
  function cancel(){
    router.push('/home');
  }

  if(loading){
    return <div>Loading</div>
  }
  else{
    return (
      <form className="form" onSubmit={save}>
        <fieldset>
          <h2 className="form-title">Chore details</h2>
          <label htmlFor="title">Title</label>
          <input type="text" defaultValue={chore.title} id="title" placeholder="Chore Name" required/>
          
          <label htmlFor="description">Description</label>
          <textarea defaultValue={chore.description} placeholder="Chore Information" id="description"/>

          <label htmlFor="assignedTo">Assign To</label>
          <select defaultValue={chore.assignedTo} name="assignedTo" id="assignedTo" required>
            {/* <option>Select a Child</option> */}
            {getChildOptions()}
          </select>
          <div>{errorMsg}</div>

          <label htmlFor="due">Due</label>
          <input id="due" type="date" required/>
          {/* defaultValue={chore.due} */}

            <label htmlFor="priority">Priority Level</label>
            <select defaultValue={chore.priority} id="priority" required>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <div>
            <Webcam
              mirrored={true}
              videoConstraints={videoConstraints}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
            </div>
            <br></br>
            <button type="button" onClick={capture}>Capture photo</button> 
      
            <div>
              {img && (
                <img src={img} alt="capturedPhoto"/>
              )}
            </div>
            <button type="submit" className="pure-button pure-button-primary">Save</button>
            <button onClick={cancel} type="button" className="pure-button pure-button-primary">Cancel</button>
            {/* {getDeleteBtn()} */}
          </fieldset>
        </form>
    // </main>
    )
    }
}