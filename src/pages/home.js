import ChoreList from '@/components/ChoreList';
import Loading from '@/components/DinosaurLogo';
import { useState, useEffect } from "react"
import { getUser } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function Home() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isParent, setIsParent] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  // Get user info - find out if this is a parent or child account
  useEffect(() => {
    async function user() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        let user = await getUser(token); 

        // User's account hasn't been created yet
        if(user.length == 0){ 
          router.push("/account") 
        }
        else{
          if(user[0].isParent){
            setIsParent(true);
          }
          setName(user[0].name)
        }
        setLoading(false);
      }
    }
    user();
  }, [isLoaded]);

  if(loading){
    return <div className="margin"><Loading></Loading></div>

  }
  else{
    return (
      <ChoreList isParent={isParent} name={name}></ChoreList>  
    )
  }
}