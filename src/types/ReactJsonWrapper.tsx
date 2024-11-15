import ReactJson from "react-json-view";
import { useTheme } from "styled-components";

export const ReactJsonWrapper: React.FC<{
  src: object;
  displayDataTypes: boolean;
  enableClipboard: any;
}> = ({ src, displayDataTypes, enableClipboard }) => {
  const theme = useTheme();

  return (
    <div>
      <ReactJson
        src={src}
        displayDataTypes={displayDataTypes}
        enableClipboard={enableClipboard}
        theme={
          theme.name === "dark"
            ? {
                base00: "#141332",
                base01: "#ddd",
                base02: "#ddd",
                base03: "#dbd9d9",
                base04: "#B099D9",
                base05: "#dbd9d9",
                base06: "#dbd9d9",
                base07: "#dbd9d9",
                base08: "#dbd9d9",
                base09: "#845ad1",
                base0A: "#845ad1",
                base0B: "#845ad1",
                base0C: "#845ad1",
                base0D: "#845ad1",
                base0E: "#845ad1",
                base0F: "#333",
              }
            : {
                base00: "white",
                base01: "#ddd",
                base02: "#ddd",
                base03: "#444",
                base04: "#B099D9",
                base05: "#444",
                base06: "#444",
                base07: "#444",
                base08: "#444",
                base09: "#6F42C1",
                base0A: "#6F42C1",
                base0B: "#6F42C1",
                base0C: "#6F42C1",
                base0D: "#6F42C1",
                base0E: "#6F42C1",
                base0F: "#333",
              }
        }
      />
    </div>
  );
};
