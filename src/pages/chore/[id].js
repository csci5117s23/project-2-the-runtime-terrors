import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import { getChore } from "@/modules/Data";
import ChoreInfo from '@/components/ChoreInfo'

export default function ChoreID() {
  const router = useRouter()
  const { id } = router.query
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  
  // Set states
  const [chore, setChore] = useState(null);
  const [loading, setLoading] = useState(true);

  // MISSING GET ISPARENT INFO --> get it from [id].js???

  // Get chore with specific id
  useEffect(() => {
    async function choreByID() {
      if (userId) {
        const token = await getToken({ template: "codehooks" });
        setChore(await getChore(token, id));
        setLoading(false);
      }
    }
    choreByID();
  }, [isLoaded]);

  if(loading){
    return <div className="margin">Loading chore item</div>
  }
  else{
    return (
      <>
      <ChoreInfo chore={chore} isParent={false}></ChoreInfo>
      </>
    )
  }
}