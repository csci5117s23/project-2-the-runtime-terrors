import { useState, useEffect } from "react"
import { getChores } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link'

export default function ChoreList({isParent}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [choreList, setChoreList] = useState([]);
  const [loading, setLoading] = useState(true);
    
  // Get chores for this user
  useEffect(() => {
    async function chores() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        setChoreList(await getChores(token, false));
        setLoading(false);
      }
    }
    chores();
  }, [isLoaded]);

  if(loading){
    return <div>Loading Chores</div>
  }

  else{
    const htmlChoreList = choreList.map((item) => <ol id={item._id} content={todoItem.content} status={todoItem.done} editable={false}>{item.content}</ol>);
    
    // Parent vs child view ???
    if(isParent){
      return <>
        <h1>Chores</h1>
        <div>{htmlChoreList}</div>
        <Link class="pure-button" href="/addChore">Add New Chore</Link>
      </>
    }
    else{
      return <>
        <h1>Chores</h1>
        <div>{htmlChoreList}</div>
      </>
    }
  }
}