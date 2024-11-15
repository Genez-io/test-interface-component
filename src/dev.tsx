import ReactDOM from "react-dom/client";
import { TestInterface } from "./TestInterface";
import { getProjectById, getLogs, getCurrentCollaboratorDetails, getFunctionLogs } from "./types/ApiAxios";
import { Parameters } from "./types/Parameters";
import { StatusBar } from "./types/StatusBar";
import { TestInterfaceModal } from "./types/TestInterfaceModal";
import { environmentOptions, isJsonString } from "./types/Utils";
import { LeftCard } from "./types/LeftCard";

const port = parseInt(window.location.port);

const props = {
  axios: {
    getProjectById: getProjectById,
    getLogs: getLogs,
    getCurrentCollaboratorDetails: getCurrentCollaboratorDetails,
    getFunctionLogs: getFunctionLogs,
  },
  statusBar: StatusBar,
  testInterfaceModal: TestInterfaceModal,
  environmentOptions: environmentOptions,
  isJsonString: isJsonString,
  leftCard: LeftCard,
  parameters: Parameters,
  projectId: "local",
  port: port,
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <TestInterface
    axios={props.axios}
    statusBar={props.statusBar}
    testInterfaceModal={props.testInterfaceModal}
    environmentOptions={props.environmentOptions}
    isJsonString={props.isJsonString}
    leftCard={props.leftCard}
    parameters={props.parameters}
    projectId={props.projectId}
    port={props.port}
  />,
);
