import { useState, useEffect } from "react"
import { addChore, getChildren, updateChore } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";


export default function BuildChore({isEditing, chore}) {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [childrenList, setChildrenList] = useState([]);
  const router = useRouter();

  // Get list of this user's children
  useEffect(() => {
    async function children() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        setChildrenList(await getChildren(token));
        setLoading(false);
      }
    }
    children();
  }, [isLoaded]);
  
  // Add or update chore
  async function add(e) {
    e.preventDefault();

    // Get form data
    const title = e.target.title.value;
    const description = e.target.description.value;
    const assignedTo = e.target.assignedTo.value;
    const due = e.target.due.value;
    const priority = e.target.priority.value;

    if (userId) {
      const token = await getToken({ template: "codehooks" });
      // Update existing chore
      if(isEditing){
        await updateChore(token, title, description, assignedTo, due, priority, chore._id);
      }
      // Add new chore
      else{
        await addChore(token, title, description, assignedTo, due, priority);
      }
      router.push('/home');
    }
  }

  // Reference: https://codeflarelimited.com/blog/dynamically-populate-select-options-in-react-js/
  function getChildOptions() {
    return childrenList.map((child) => {
      return <option key={child.childId} value={child.childId}>{child.childName}</option>;
    });
  }

  if(loading){
    return <div>Loading</div>
  }
  else{
    return (
      <main>
        <form onSubmit={add} className="pure-form pure-form-stacked">
          <fieldset>
            <legend>Chore Details</legend>
            <label htmlFor="title">Title</label>
            <input defaultValue={chore.title} id="title" placeholder="Chore Name" required/>

            <label htmlFor="description">Description</label>
            <textarea defaultValue={chore.description} id="description"/>
            
            <label htmlFor="assignedTo">Assign To</label>
            <select defaultValue={chore.assignedTo} className="margin" name="assignedTo" id="assignedTo">
              {/* <option>Select a Child</option> */}
              {getChildOptions()}
            </select>

            <label htmlFor="due">Due</label>
            <input id="due" type="date" required/>
            {/* defaultValue={chore.due} */}

            <label htmlFor="priority">Priority Level</label>
            <select defaultValue={chore.priority} id="priority" required>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button type="submit" className="pure-button pure-button-primary">Add</button>
          </fieldset>
        </form>
    </main>
    )
  }
}