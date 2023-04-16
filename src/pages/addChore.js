import { useState, useEffect } from "react"
import { addChore, getChildren } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function AddChore() {
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
  
  // Add chore for a child
  async function add(e) {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const assignedTo = e.target.assignedTo.value;
    const due = e.target.due.value;
    const priority = e.target.priority.value;

    if (userId) {
      const token = await getToken({ template: "codehooks" });
      let newItem = await addChore(token, title, description, userId, due, priority); // change userId to assignedTo later on ???
      console.log(newItem)
      router.push('/home');
    }
  }

  // Reference: https://codeflarelimited.com/blog/dynamically-populate-select-options-in-react-js/
  function getChildOptions() {
    return childrenList.map((child) => {
      return <option value={child.childId}>{child.childName}</option>;
    });
  }

  if(loading){
    return <div>Loading</div>
  }
  else{
    return (
      <main>
        <h1>Add New Chore</h1>
        <form onSubmit={add} className="pure-form pure-form-stacked">
          <fieldset>
            <legend>Add New Chore</legend>
            <label for="title">Title</label>
            <input id="title" placeholder="Chore Name" required/>

            <label for="description">Description</label>
            <textarea id="description"/>
            
            <label for="assignedTo">Assign To</label>

            <select className="margin" name="assignedTo" id="assignedTo">
              <option selected disabled hidden>Select a Child</option>
              {getChildOptions()}
            </select>

            <label for="due">Due</label>
            <input id="due" type="date" required/>

            <label for="priority">Priority Level</label>
            <select id="priority" required>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
            <button type="submit" className="pure-button pure-button-primary">Add</button>
          </fieldset>
        </form>

      {/* Need some way for parents to list their children - maybe make user _id 
        available on your profile --> parents can get it from thier child's account
      */}

    </main>
      // on submit --> call add() and then redirect to home page
    )
  }
}