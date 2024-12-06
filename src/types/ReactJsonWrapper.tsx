import ReactJson from "@uiw/react-json-view";
import { useTheme } from "styled-components";

const reactJsonDarkTheme = {
  padding: "10px",
  "--w-rjv-font-family": "monospace",
  "--w-rjv-color": "#9cdcfe",
  "--w-rjv-key-number": "rgb(219, 217, 217)",
  "--w-rjv-key-string": "rgb(219, 217, 217)",
  "--w-rjv-background-color": "rgb(20, 19, 50)",
  "--w-rjv-line-color": "#36334280",
  "--w-rjv-arrow-color": "#838383",
  "--w-rjv-edit-color": "var(--w-rjv-color)",
  "--w-rjv-info-color": "#9c9c9c7a",
  "--w-rjv-update-color": "#9cdcfe",
  "--w-rjv-copied-color": "#9cdcfe",
  "--w-rjv-copied-success-color": "#28a745",

  "--w-rjv-curlybraces-color": "#d4d4d4",
  "--w-rjv-colon-color": "#d4d4d4",
  "--w-rjv-brackets-color": "#d4d4d4",
  "--w-rjv-ellipsis-color": "rgb(219, 217, 217)",
  "--w-rjv-quotes-color": "var(--w-rjv-key-string)",
  "--w-rjv-quotes-string-color": "var(--w-rjv-type-string-color)",

  "--w-rjv-type-string-color": "rgb(132, 90, 209)",
  "--w-rjv-type-int-color": "rgb(132, 90, 209)",
  "--w-rjv-type-float-color": "rgb(132, 90, 209)",
  "--w-rjv-type-bigint-color": "rgb(132, 90, 209)",
  "--w-rjv-type-boolean-color": "rgb(132, 90, 209)",
  "--w-rjv-type-date-color": "rgb(132, 90, 209)",
  "--w-rjv-type-url-color": "rgb(132, 90, 209)",
  "--w-rjv-type-null-color": "rgb(132, 90, 209)",
  "--w-rjv-type-nan-color": "rgb(132, 90, 209)",
  "--w-rjv-type-undefined-color": "rgb(132, 90, 209)",
};

const reactLightTheme = {
  padding: "10px",
  "--w-rjv-font-family": "monospace",
  "--w-rjv-color": "#9cdcfe",
  "--w-rjv-key-number": "rgb(176, 153, 217)",
  "--w-rjv-key-string": "rgb(68, 68, 68)",
  "--w-rjv-background-color": "white",
  "--w-rjv-line-color": "#36334280",
  "--w-rjv-arrow-color": "#838383",
  "--w-rjv-edit-color": "var(--w-rjv-color)",
  "--w-rjv-info-color": "rgb(176, 153, 217)",
  "--w-rjv-update-color": "rgb(176, 153, 217)",
  "--w-rjv-copied-color": "black",
  "--w-rjv-copied-success-color": "#28a745",

  "--w-rjv-curlybraces-color": "rgb(68, 68, 68);",
  "--w-rjv-colon-color": "rgb(68, 68, 68);",
  "--w-rjv-brackets-color": "rgb(68, 68, 68);",
  "--w-rjv-ellipsis-color": "rgb(68, 68, 68);",
  "--w-rjv-quotes-color": "var(--w-rjv-key-string)",
  "--w-rjv-quotes-string-color": "var(--w-rjv-type-string-color)",

  "--w-rjv-type-string-color": "rgb(111, 66, 193)",
  "--w-rjv-type-int-color": "rgb(111, 66, 193)",
  "--w-rjv-type-float-color": "rgb(111, 66, 193)",
  "--w-rjv-type-bigint-color": "rgb(111, 66, 193)",
  "--w-rjv-type-boolean-color": "rgb(111, 66, 193)",
  "--w-rjv-type-date-color": "rgb(111, 66, 193)",
  "--w-rjv-type-url-color": "rgb(111, 66, 193)",
  "--w-rjv-type-null-color": "rgb(111, 66, 193)",
  "--w-rjv-type-nan-color": "rgb(111, 66, 193)",
  "--w-rjv-type-undefined-color": "rgb(111, 66, 193)",
};

export const ReactJsonWrapper: React.FC<{
  src: object;
  displayDataTypes: boolean;
  enableClipboard: any;
}> = ({ src, displayDataTypes, enableClipboard }) => {
  const theme = useTheme();

  return (
    <div>
      <ReactJson
        value={src}
        enableClipboard={enableClipboard}
        keyName={"root"}
        style={theme.name === "dark" ? reactJsonDarkTheme : reactLightTheme}
      />
    </div>
  );
};
