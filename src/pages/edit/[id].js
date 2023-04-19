import BuildChore from '@/components/BuildChore';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from "react"
import { useAuth } from "@clerk/nextjs";
import { getChore } from "@/modules/Data";

export default function EditChore() {
  const router = useRouter()
  const { id } = router.query
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  // Set states
  const [chore, setChore] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <div className="margin">Loading...</div>
  }
  else{
    return (
      <main>
        <h1>Edit Chore</h1>
        <BuildChore isEditing={true} chore={chore}></BuildChore>
      </main>
    )
  }
}