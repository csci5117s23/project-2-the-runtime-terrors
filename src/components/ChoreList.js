import { useState, useEffect } from "react"
import { getFilteredChores } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Chore from './Chore';
import Filters from './Filters'
import ChoreInfo from './ChoreInfo';
import { useRouter } from "next/router";


export default function ChoreList({isParent, name}){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [choreList, setChoreList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedChore, setSelectedChore] = useState("");
  const [filters, setFilters] = useState("");
  const router = useRouter();
    
  useEffect(() => {
    chores("", "", "");
  }, [isLoaded]);

  // Get chores for this user
  async function chores(status, priority, due) {
    if (userId) {
      const token = await getToken({ template: "codehooks" });
      let chores;

      // Get chores assigned by this parent
      if(isParent){
        chores = await getFilteredChores(token, status, priority, due, "assignedBy="+userId);
      }
      // Get chores assigned to this child
      else{
        chores = await getFilteredChores(token, status, priority, due, "assignedTo="+userId);
      }
      setChoreList(chores)

      // Check if there are chores
      if(chores.length !== 0){
        setSelectedChore(chores[0]);
      }
      setLoading(false);
    }
  }
 
  //function to set filter value
  // async function filter(e) {
    
  //   e.preventDefault();

  //   // Get form data
  //   const filterType = e.target.filter.value;

  //   if(filterType == "Done"){
  //     chores(filterType);
  //   }
    
    
  //   setFilters(filterType)

  //   // window.location.reload(false);
  //   // chores()
  //   // e.stopPropagation();
  //   console.log(filters)
  // }

  if(loading){
    return <div className="margin">Loading...</div>
  }

  else{
    if(choreList.length == 0){
      return <>
        <h2 className="margin-top center">No Chores!</h2>
        <Filters filterChores={chores}></Filters>
      </>
      // Add a cool animation here ???
    }

    const htmlChoreList = choreList.map((chore) => <Chore chore={chore} key={chore._id} isParent={isParent} setSelectedChore={setSelectedChore}></Chore>);
    
    return <>
      <div id="layout" className="pure-g">
        <div id="list" className="pure-u-1 pure-u-md-1-2">
          <div id="space">
            <h2 className="margin">Hello, {name}! Here are your chores</h2>
            <Filters filterChores={chores}></Filters>
            {htmlChoreList}
          </div>
        </div>
        <div id="main" className="pure-u-1 pure-u-md-1-2">
          <ChoreInfo chore={selectedChore} isParent={isParent} chores={chores} name ={name}></ChoreInfo>
        </div>
      </div>
    </>
  }
}