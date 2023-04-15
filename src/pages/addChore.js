import { useState, useEffect } from "react"
import { addChore } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "@clerk/nextjs";

export default function AddChore() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [content, setContent] = useState("testing");
  const [assignedTo, setAssignedTo] = useState(userId); // should be null ??? 
  const [due, setDue] = useState(new Date());


  
  // Add chore for a child
  async function add() {
    if (userId) {
      const token = await getToken({ template: "codehooks" });
      let newItem = await addChore(token, content, assignedTo, due);
      console.log(newItem)
      // setContent("");
      const router = useRouter();
      router.push('/chores');
    }
  }

  // add()

  return (
    <main>
      <h1>Add New Chore</h1>
    </main>
    // on submit --> call add() and then redirect to home page
  )
}