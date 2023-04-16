import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import { getTodo } from "@/modules/Data";

import EditableTodo from '@/components/EditableTodo'

export default function ChoreID() {
  const router = useRouter()
  const { id } = router.query
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  
  // Set states
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get todo with specific id
  useEffect(() => {
    async function todoByID() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        setTodo(await getTodo(token, id));
        setLoading(false);
      }
    }
    todoByID();
  }, [isLoaded]);

  if(loading){
    return <div>Loading todo item</div>
  }
  else{
    return (
      <>
      <EditableTodo id={todo._id} content={todo.content} status={todo.done} category={todo.category}></EditableTodo>
      <Link href="/todos"><button className="pure-button">View Not Done To-dos</button></Link>
      </>
    )
  }
}