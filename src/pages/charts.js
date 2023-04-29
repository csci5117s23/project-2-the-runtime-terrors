import { useState, useEffect } from "react"
import { getChoresParent, getChoresChild } from "@/modules/Data";
import { getUser } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import PieChart from "@/components/PieChart";

export default function Analytics() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isParent, setIsParent] = useState(false);
  const [choreList, setChoreList] = useState([]);
  const [ numDone, setNumDone ] = useState(0);
  const [ numAssigned, setNumAssigned ] = useState(0);
  const [ deadlinesMissed, setDeadlinesMissed ] = useState(1);
  const [ deadlinesMet, setDeadlinesMet ] = useState(1);

  // Get user info - find out if this is a parent or child account
  useEffect(() => {
    async function loadChores() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        let user = await getUser(token); 

        // User's account hasn't been created yet
        if(user[0] == null){ // test ???
          router.push("/account") 
        }
        else if(user[0].isParent){
          setIsParent(true);
        }

        let chores;
        // Get chores assigned by this parent
        if(user[0].isParent){
          chores = await getChoresParent(token, false, userId);
        }
        // Get chores assigned to this child
        else{
          chores = await getChoresChild(token, false, userId);
        }
            
        console.log(chores);

        setChoreList(chores);
        setNumAssigned(chores.length);
            
        let done = 0;
        let deadlines = 0;
        for (let i = 0; i < chores.length; i++) {
          let doneBool = chores[i]['done'];
          let dueDate = new Date(chores[i]['due']);
          let currentDate = Date.now();
          if (doneBool) {
            done += 1;
          }
          if (dueDate < currentDate) {
            deadlines += 1;
          }
        }
        console.log(done);
        console.log(deadlines);
        console.log(chores.length - deadlines);
        let met = chores.length - deadlines;
        setNumDone(done);
        setDeadlinesMissed(deadlines);
        setDeadlinesMet(met);
        setLoading(false);
      }
    }
    loadChores();
  }, [isLoaded]);

  if(loading){
    return <div className="margin">Loading...</div>
  } 
  else {
    // const htmlChoreList = choreList.map((chore) => <li>{{chore}}</li>)
    // const choreListItems = Object.keys(choreList[0]).map(key => {
    //     return <li key={key}>{choreList[0][key]}</li>;
    // });
    return (<>
      <h1>Analytics</h1>
      <p>Tasks Completed: {numDone}</p>
      <p>Tasks Assigned: {numAssigned}</p>
      <p>Deadlines Missed: {deadlinesMissed}</p>
      <p>Deadlines Met: {deadlinesMet}</p>
      {/* <PieChart label1="Deadlines Met" value1={5} label2="Deadlines Missed" value2 = {6}></PieChart> */}
      <PieChart label1="Deadlines Met" value1={deadlinesMet} label2="Deadlines Missed" value2={deadlinesMissed}></PieChart>
      {/* <ul> {{ choreListItems }} </ul> */}
    </>)
  }
}