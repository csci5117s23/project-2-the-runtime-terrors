import { useState, useEffect } from "react"
import { getChoresParent, getChoresChild } from "@/modules/Data";
import { getUser } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";

export default function Analytics() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const [isParent, setIsParent] = useState(false);
    const [choreList, setChoreList] = useState([]);


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
                if(isParent){
                    chores = await getChoresParent(token, false, userId);
                }
                // Get chores assigned to this child
                else{
                    chores = await getChoresChild(token, false, userId);
                }
                setChoreList(chores)
                console.log(chores);
                
                let done = 0;
                for (chore in chores) {
                    doneBool = chore[0]['done'];
                    if (doneBool) {
                        done += 1;
                    }
                }
                console.log(done);

                setLoading(false);
            }
        }
        loadChores();
    }, [isLoaded]);
    
    if(loading){
        return <div className="margin">Loading...</div>
    } else {
        return (<>
            <h1>Analytics</h1>
        </>)
    }
}