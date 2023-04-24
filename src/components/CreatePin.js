// Reference: https://www.npmjs.com/package/react-pin-input
import { addPin, addChild, getUser } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState, useEffect } from "react"

export default function CreatePin() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [pin, setPin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Add a pin
  useEffect(() => {
    async function createPin() {
      if (userId) {
        const newPin = generatePin();
        const token = await getToken({ template: "codehooks" });
        const user = await getUser(token);
        await addPin(token, newPin, user[0].name); 
        setPin(newPin);
        setLoading(false);
      }
    }
    createPin();
  }, [isLoaded]);

  // Generate a pin
  function generatePin(){
    // Reference: https://stackoverflow.com/questions/21816595/how-to-generate-a-random-number-of-fixed-length-using-javascript
    let newPin = Math.floor(100000 + Math.random() * 900000);
    return newPin;
  }

  // delete pin here ??? (set timeout ???)

  if(loading){
    return <div className="margin">Loading...</div>
  }

  else{
    return <>
      <div>{pin}</div>
    </>
  }
}