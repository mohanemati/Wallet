import Lottie from "react-lottie";
import animationData from "../../../src/jsons/ddddot.json";

const AnimationPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };

  return (
    <div className="text-red-400">
      <Lottie options={defaultOptions} height={500} width={500} />
    </div>
  );
};

export default AnimationPage;
