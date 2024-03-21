import Lottie from "react-lottie";
import Spinner from "../assets/json/GenezioSpinner.json";

export const GenezioSpinner = () => (
  <Lottie
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
    style={{ marginTop: "10px" }}
  />
);
