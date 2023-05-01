import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect, useRef, useCallback } from "react"
import { useAuth } from "@clerk/nextjs";
import Webcam from "react-webcam";
import { completeChore } from '@/modules/Data';


export default function CompleteChore() {
  const router = useRouter()
  const { id } = router.query
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  // For webcam
  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);


  async function submitChore(){
    // Mark chore as complete
    const token = await getToken({ template: "codehooks" });
    const chore = await completeChore(token, true, img, new Date(), id); 
    router.push("/home");
  }

  async function cancel(){
    router.push("/home");
  }

  return (<>
    <h1 className="margin-top center">Take a picture of your completed chore! </h1>
    <form className="form">
      <fieldset>
        <Webcam
          mirrored={true}
          videoConstraints={videoConstraints}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />

        <button type="button" onClick={capture} className="pure-button pure-button-primary">Capture Photo</button> 

        <div>
          {img && (
            <img src={img} alt="capturedPhoto"/>
          )}
        </div>
        <button type="button" onClick={submitChore} className="pure-button pure-button-primary">Submit Chore</button> 
        <button type="button" onClick={cancel} className="pure-button pure-button-primary">Cancel</button> 
      </fieldset>
    </form>
  </>)
}