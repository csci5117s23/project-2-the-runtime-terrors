import ChoreList from '@/components/ChoreList';
import { useState, useEffect } from "react"
import { getUser } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isParent, setIsParent] = useState(false);

  // Get user info - find out if this is a parent or child account
  useEffect(() => {
    async function user() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        let user = await getUser(token); 

        // should check if user[0] is null --> need to create an account ???
        // --> redirect ???
        console.log(user[0].isParent)
        if(user[0].isParent){
          setIsParent(true);
        }
        setLoading(false);
      }
    }
    user();
  }, [isLoaded]);

  // Get user info about if this is a parent or child ???
  if(loading){
    return <div className="margin">Loading...</div>
  }
  else{
    return (
      <main>
      <ChoreList isParent={isParent}></ChoreList>
      </main>
    )
  }
}