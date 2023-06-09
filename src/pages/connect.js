import { useAuth } from "@clerk/nextjs";
import { useState, useEffect } from "react"
import { getUser } from "@/modules/Data";
import Pin from '@/components/Pin';
import CreatePin from "@/components/CreatePin";

export default function Connect() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [isParent, setIsParent] = useState(false);
  const [loading, setLoading] = useState(true);

  // Get user info - find out if this is a parent or child account
  useEffect(() => {
    async function user() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        let user = await getUser(token); 
        if(user[0].isParent){
          setIsParent(true);
        }
        setLoading(false);
      }
    }
    user();
  }, [isLoaded]);


  if(loading){
    return <div className="margin-top center">Loading...</div>
  }
  else if(isParent){
    return (
      <main className="margin-top">
        <form className="form">
          <fieldset className="no-bg">
            <h1 className="form-title">Connect a Child Account</h1>
            <div>Enter your child's verification pin</div>
            <Pin></Pin>
            <span className="form-subtitle">On your child account, click on <img className="small-icon" src="/connect.png"/> in the bottom navigation bar. Copy the generated pin and enter it here.</span>
        </fieldset>
        </form>
      </main>
    )
  }
  else{
    return (
      <main className="margin-top">
        <form className="form">
          <fieldset className="no-bg">
            <h1 className="form-title">Connect a Parent Account</h1>
            <div>Here is your temporary verification pin</div>
            <CreatePin></CreatePin>
            <span className="form-subtitle">On your parent account, click on <img className="small-icon" src="/connect.png"/> in the bottom navigation bar. Then, enter this pin.</span>
          </fieldset>
        </form>
      </main>

    )
  }
}