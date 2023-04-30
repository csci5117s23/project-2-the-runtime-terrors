import { useState, useEffect } from "react"
import { getChoresParent, getChoresChild, getFilteredChores } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";


export default function Filters({filterChores}){ 
  // const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [due, setDue] = useState("");

  function changePriority(e){
    const priorityFilter = e.target.value;
    console.log(priorityFilter)
    let newPriority = "";
    if(priorityFilter === "high"){
      newPriority = "priority=High&";
    }
    else if(priorityFilter === "medium"){
      newPriority = "priority=Medium&";
    }
    else if(priorityFilter === "low"){
      newPriority = "priority=Low&";
    }
    setPriority(newPriority);
    filterChores(status, newPriority, due);
  }

  function changeStatus(e){
    const statusFilter = e.target.value;
    console.log(statusFilter)
    let newStatus = "";
    if(statusFilter === "done"){
      newStatus = "done=true&";
    }
    else if(statusFilter === "notDone"){
      newStatus = "done=false&";
    }
    setStatus(newStatus);
    filterChores(newStatus, priority, due);
  }

  function changeDue(e){
    const dueFilter = e.target.value;
    let newDue = "";
    if(dueFilter === "earliest"){
      newDue = "sort=due&";
    }
    setDue("sort=due&");
    filterChores(status, priority, newDue);
  }

  function clear(){
    setStatus("");
    setPriority("");
    setDue("");
    filterChores("", "", "");
  }

  return <>
    <form>
      <select defaultValue="default" className="filter" onChange={changeStatus} name="status" id="status">
        <option value="default" disabled>Status</option>
        <option value="done">Done</option>
        <option value="notDone">Not Done</option>
      </select>
      <select defaultValue="default" className="filter" onChange={changePriority} name="priority" id="priority">
        <option value="default" disabled>Priority</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <select defaultValue="default" className="filter" onChange={changeDue} name="due" id="due">
        <option value="default" disabled>Due</option>
        <option value="earliest">Earliest</option>
        <option value="latest">Latest</option>
      </select>
      <button type="button" onClick={clear} className="filter pure-button pure-button-primary">Clear</button>
    </form>
  </>
}