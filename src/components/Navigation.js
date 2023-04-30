import { useState, useEffect } from "react"
import { getUser } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link'
import NotificationButton from "./NotificationButton";


export default function Navigation(){ 
  const { isLoaded, userId, sessionId, getToken } = useAuth()
  const [loading, setLoading] = useState(true);
  const [isParent, setIsParent] = useState(false);
    
  // Get user info - find out if this is a parent or child account
  useEffect(() => {
    async function user() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        let user = await getUser(token); 
        if(user[0].isParent){
          setIsParent(true);
          // Set theme
          document.documentElement.setAttribute('data-theme', 'parent');
        }
        setLoading(false);
      }
    }
    user();
  }, [isLoaded]);

  // Let parents have access to "add chore" button
  let addBtn = <div></div>
  let notificationBtn = <div></div>
  if(isParent){
    addBtn = <Link href="/addChore"><img className="icon" src="add.png" alt="Add Chore"></img></Link>;
  } else {
    notificationBtn = <NotificationButton></NotificationButton>;
  }

  if(loading){
    return <div className="margin">Loading...</div>
  }

  else{
    return <>
      {/* Header */}
      <div className="header">
        <div className="title">Chorosaurus Rex</div>
        <div id="userBtn"><UserButton/></div>
      </div>

      {/* Bottom navigation */}
      <div className="navbar">
        <Link href="/home"><img className="icon" src="home.png" alt="Home"></img></Link>
        <Link href="/analytics"><img className="icon" src="analytics.png" alt="Analytics"></img></Link>
        {addBtn}
        <Link href="/connect"><img className="icon" src="connect2.png" alt="Connect Account"></img></Link>
        {notificationBtn}
      </div>
      </>
  }
}