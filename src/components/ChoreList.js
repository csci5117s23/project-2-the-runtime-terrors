import { useState, useEffect } from "react"
import { getChoresParent, getChoresChild } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link'
import Chore from './Chore';
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
        let chores;

        // Get chores assigned by this parent
        if(isParent){
          chores = await getChoresParent(token, false, userId);
        }
        // Get chores assigned to this child
        else{
          chores = await getChoresChild(token, false, userId);
        }
        setChoreList(chores)
        
        // FIX LATER: Check if there are no chores ??? Shouldn't display anything ???
        setSelectedChore(chores[0]);
        setLoading(false);
      }
    }
    chores();
  }, [isLoaded]);

  if(loading){
    return <div className="margin">Loading...</div>
  }

  else{
    const htmlChoreList = choreList.map((chore) => <Chore chore={chore} key={chore._id} isParent={isParent} setSelectedChore={setSelectedChore}></Chore>);

    // Parent vs child view ???
    if(isParent){
      return <>
      <div id="layout" className="content pure-g">
        <div id="list" className="pure-u-1 pure-u-md-1-2">
          <div id="space">
            <h4 className="margin">{userId}</h4>
            <Link className="margin pure-button" href="/addChore">Add New Chore</Link>
            <Link className="pure-button margin " href="/addChild">Connect New Child</Link>
            <hr></hr>
            {htmlChoreList}
          </div>
        </div>
        <div id="main" className="pure-u-1 pure-u-md-1-2">
          <ChoreInfo chore={selectedChore} isParent={isParent}></ChoreInfo>
        </div>
      </div>
      </>
    }
    else{
      return <>
      <div id="layout" className="content pure-g">
        <div id="list" className="pure-u-1 pure-u-md-1-2">
          <div id="space">
            <h4 className="margin">{userId}</h4>
            {htmlChoreList}
          </div>
        </div>
        <div id="main" className="pure-u-1 pure-u-md-1-2">
          <ChoreInfo chore={selectedChore} isParent={true}></ChoreInfo>
        </div>
      </div>
      </>
    }
  }
}