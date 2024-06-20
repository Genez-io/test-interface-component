import Lottie from "react-lottie";
import Spinner from "../assets/json/GenezioSpinner.json";

export const GenezioSpinner = () => (
  <div style={{ marginTop: "10px" }}><Lottie
  options={{
    loop: true,
    autoplay: true,
    animationData: Spinner,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  }}
  height={80}
  width={80}
  isClickToPauseDisabled
  
/></div>
  
);
