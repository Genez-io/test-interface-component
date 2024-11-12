import Lottie from "react-lottie";
import Spinner from "../assets/json/GenezioSpinner.json";
import { Button } from "react-bootstrap";

const GenezioSpinner = () => {
  const isDarkMode = localStorage.getItem("darkMode") === "true" || localStorage.getItem("darkMode") === null;

  return (
    <div>
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
        isClickToPauseDisabled={true}
        style={{
          marginTop: "10px",
          filter: isDarkMode ? "invert(1)" : "none",
        }}
      />
    </div>
  );
};

export default GenezioSpinner;
