import React from "react";
import Lottie from "react-lottie";

const MobileAnimation = ({ animationData, size = 500 }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={size} width={size} />
    </div>
  );
}

export default MobileAnimation;
