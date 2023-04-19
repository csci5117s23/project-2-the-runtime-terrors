import { useState, useEffect } from "react"
import { getChoresParent, getChoresChild } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link'
import Chore2 from './Chore2';
import ChoreInfo from './ChoreInfo';


export default function ChoreList({isParent}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [choreList, setChoreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChore, setSelectedChore] = useState("");
    
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
    const htmlChoreList = choreList.map((chore) => <Chore2 chore={chore} key={chore._id} isParent={isParent} setSelectedChore={setSelectedChore}></Chore2>);

    // Parent vs child view ???
    if(isParent){
      return <>
      <div id="layout" className="content pure-g">
        <div id="list" className="pure-u">
          <div>{htmlChoreList}</div>
        </div>
        
        <div id="main" className="pure-u">
          <ChoreInfo chore={selectedChore} isParent={true}></ChoreInfo>
        </div>
      </div>

      {/* <h1>Chores you have assigned:</h1>
        <h4>{userId}</h4>
        <div>{htmlChoreList}</div>
        <Link className="pure-button" href="/addChore">Add New Chore</Link>
        <Link className="pure-button margin " href="/addChild">Connect New Child</Link> */}
      </>
    }
    else{
      return <>
        <div>{htmlChoreList}</div>
        {/* <h1>Chores for user:</h1>
        <h4>{userId}</h4>
        <div>{htmlChoreList}</div> */}
      </>
    }
  }
}