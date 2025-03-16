import React from "react";
import Lottie from "react-lottie";
import animationData from "../utils/animations/spiral_ash.json";

class MobileAnimation extends React.Component {
  render() {
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
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }
}

export default MobileAnimation;
