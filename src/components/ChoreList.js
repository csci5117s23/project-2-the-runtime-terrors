import { useState, useEffect } from "react"
import { getChoresParent, getChoresChild } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Chore from './Chore';
import ChoreInfo from './ChoreInfo';


export default function ChoreList({isParent, name}){ 
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

        // Check if there are chores
        if(chores.length !== 0){
          setSelectedChore(chores[0]);
        }
        setLoading(false);
      }
    }
    chores();
  }, [isLoaded]);

  if(loading){
    return <div className="margin">Loading...</div>
  }

  else{
    if(choreList.length == 0){
      return <h2 className="margin">No Chores!</h2>
      // Add a cool animation here
    }

    const htmlChoreList = choreList.map((chore) => <Chore chore={chore} key={chore._id} isParent={isParent} setSelectedChore={setSelectedChore}></Chore>);
    
    return <>
      <div id="layout" className="content pure-g">
        <div id="list" className="pure-u-1 pure-u-md-1-2">
          <div id="space">
            <h2 className="margin">Hello, {name}! Here are your chores</h2>
            {htmlChoreList}
          </div>
        </div>
        <div id="main" className="pure-u-1 pure-u-md-1-2">
          <ChoreInfo chore={selectedChore} isParent={isParent}></ChoreInfo>
        </div>
      </div>
    </>
  }
}