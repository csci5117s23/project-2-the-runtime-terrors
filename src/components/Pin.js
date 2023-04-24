// Reference: https://www.npmjs.com/package/react-pin-input
import { getPin, addChild } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import PinInput from 'react-pin-input';
import { useRouter } from "next/router";

export default function Pin() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();

  async function verifyPin(value, index){
    console.log("verifying");
    // Send out verifying message 
    console.log(value);
    const token = await getToken({ template: "codehooks" });
    let data = await getPin(token, value);
    console.log(data);

    if(data.length == 0){
      // Send out incorrect pin message 
      console.log("No matching pin");
    }
    else{
      addKid();
      // const token = await getToken({ template: "codehooks" });
      // await addChild(token, data.childName, data.childId);
    }
  }

  async function addKid(){
    // Send out confirmation message
    const token = await getToken({ template: "codehooks" });
    await addChild(token, data.childName, data.childId);
    // Send out confirmation message
    router.push("/home")
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
  </>
}