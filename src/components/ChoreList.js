import { useState, useEffect } from "react"
import { getChoresParent, getChoresChild } from "@/modules/Data";
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

        // Get chores assigned by this user
        if(isParent){
          setChoreList(await getChoresParent(token, false, userId));
        }
        // Get chores assigned to this user
        else{
          setChoreList(await getChoresChild(token, false, userId));
        }
        setLoading(false);
      }
    }
    chores();
  }, [isLoaded]);

  if(loading){
    return <div>Loading Chores</div>
  }

  else{
    const htmlChoreList = choreList.map((item) => <ol key={item._id} content={item.content} status={item.done.toString()}>{item.content}</ol>);
    
    // Parent vs child view ???
    if(isParent){
      return <>
        <h1>Chores</h1>
        <div>{htmlChoreList}</div>
        <Link className="pure-button" href="/addChore">Add New Chore</Link>
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