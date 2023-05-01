// Reference: https://www.npmjs.com/package/react-pin-input
import { getPin, addChild, getChild } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import PinInput from 'react-pin-input';
import { useState, useEffect } from "react"

export default function Pin() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [status, setStatus] = useState("");

  async function verifyPin(value, index){
    setStatus("Verifying pin...");

    // Get child associated with this pin
    const token = await getToken({ template: "codehooks" });
    let data = await getPin(token, value);

    // Invalid pin (no matching pin #)
    if(data.length == 0){
      setStatus("Sorry, this pin is invalid");
    }

    // Valid pin
    else{
      connectChild(data[0]);
    }
  }

  async function connectChild(user){
    const token = await getToken({ template: "codehooks" });
    const child = await getChild(token, user.childId);

    // Child not yet connected to parent's account --> connect them
    if(child.length == 0){
      const token = await getToken({ template: "codehooks" });
      const kid = await addChild(token, user.childName, user.childId);
      setStatus(kid.childName + " has been successfully connected to your account");
    }
    // Child already connected to parent's account
    else{
      setStatus(child[0].childName + " is already connected to your account");
    }
  }

  return <>
    <PinInput 
      length={6} 
      initialValue=""
      onChange={(value, index) => {}} 
      type="numeric" 
      inputMode="number"
      style={{padding: '10px'}}  
      inputStyle={{borderColor: 'gray'}}
      inputFocusStyle={{borderColor: 'blue'}}
      onComplete={verifyPin}
      autoSelect={true}
      regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
    />
    <h1>{status}</h1>
  </>
}