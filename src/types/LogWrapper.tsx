import { Text } from "../Components";
import { useTheme } from "styled-components";

export const LogWrapper: React.FC<{
  element: any;
}> = ({ element }) => {
  // Messages Types For Logs
  const MESSAGES_TYPES = ["START", "ALL", "ERROR2", "REPORT", "INFO", "DEBUG", "WARNING", "END"];

  const theme = useTheme();
  return (
    <Text
      as={"td"}
      fontSize="14"
      className="text-left"
      style={{
        width: "100%",
        borderBottom: "1px solid #6F42C1",
        color:
          element.Message.search("ERROR") !== -1
            ? "#f9301e"
            : element.Message.search("WARNING") !== -1
              ? "#f9b31e"
              : element.Message.search("INFO") !== -1
                ? "#28944F"
                : theme.colors.white,
      }}
    >
      {/* show {elem.Message} and make INFO, ERROR with bold  - do the split by /t and space */}
      {/* regex that mathc by \t and space */}
      {/* split by regex */}
      {element.Message.split(/(\t|\s|:)/).map((word: any) => {
        if (MESSAGES_TYPES.includes(word)) {
          return <b key={Math.random() * 1000}>{word}</b>;
        }
        return word;
      })}
    </Text>
  );
};
