import { useState } from "react";
import Lottie from "react-lottie";
import animationData from "./../assets/animation/visibility-V3.json"; // Update the path

const EyeToggle = ({ onToggle }) => {
  const [isStopped, setIsStopped] = useState(true); // Control Lottie animation

  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleToggle = () => {
    setIsStopped(!isStopped); // Play animation on toggle
    onToggle(); // Trigger the parent component's toggle logic
  };

  return (
    <div onClick={handleToggle} className="cursor-pointer">
      <Lottie
        options={defaultOptions}
        isStopped={isStopped}
        height={30}
        width={30}
      />
    </div>
  );
};

export default EyeToggle;
