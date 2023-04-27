import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

function WebcamImage() {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  return (
    <div>
      <div>
        <Webcam
          mirrored={true}
          videoConstraints={videoConstraints}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />
      </div>
      <br></br>
      <button onClick={capture}>Capture photo</button> 
      
      <div>
        {img && (
            <img src={img} alt="capturedPhoto"/>
        )}
      </div>
    </div> 
  );
}

export default WebcamImage;