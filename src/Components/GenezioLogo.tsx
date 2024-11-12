import { useTheme } from "../contexts/ThemeContext";
import GenezioLogoWhite from "../assets/GenezioLogoWhite.svg";
import GenezioLogoBlack from "../assets/GenezioLogoBlack.svg";

const GenezioLogo = ({ ...props }) => {
  const { theme } = useTheme();

  return <img src={theme?.background === "#FFFFFF" ? GenezioLogoBlack : GenezioLogoWhite} {...props} />;
};

export default GenezioLogo;
