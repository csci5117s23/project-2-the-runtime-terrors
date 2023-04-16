import { useState, useEffect } from "react"
import { getChoresParent, getChoresChild } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link'
import Chore from './Chore';


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
    return <div className="margin">Loading Chores</div>
  }

  else{
    const htmlChoreList = choreList.map((item) => <Chore key={item._id} id={item._id} title={item.title} status={item.done} isParent={isParent}></Chore>);

    // Parent vs child view ???
    if(isParent){
      return <>
        <h1>Chores for user:</h1>
        <h4>{userId}</h4>
        <div>{htmlChoreList}</div>
        <Link className="pure-button" href="/addChore">Add New Chore</Link>
        <Link className="pure-button margin " href="/addChild">Connect New Child</Link>
      </>
    }
    else{
      return <>
        <h1>Chores for user:</h1>
        <h4>{userId}</h4>
        <div>{htmlChoreList}</div>
      </>
    }
  }
}