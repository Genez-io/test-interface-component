import ReactDOM from "react-dom/client";
import { TestInterface } from "./TestInterface";
import { getProjectById, getAllLogs, getCurrentCollaboratorDetails, getFunctionLogs } from "./types/ApiAxios";
import { Parameters } from "./types/Parameters";
import { StatusBar } from "./types/StatusBar";
import { TestInterfaceModal } from "./types/TestInterfaceModal";
import { environmentOptions, isJsonString } from "./types/Utils";
import { LeftCard } from "./types/LeftCard";
import Notifications from "./Components/Notifications";
const port = parseInt(window.location.port);

const props = {
  axios: {
    getProjectById: getProjectById,
    getAllLogs: getAllLogs,
    getCurrentCollaboratorDetails: getCurrentCollaboratorDetails,
    getFunctionLogs: getFunctionLogs,
  },
  statusBar: StatusBar,
  testInterfaceModal: TestInterfaceModal,
  environmentOptions: environmentOptions,
  isJsonString: isJsonString,
  leftCard: LeftCard,
  isDarkMode: false,
  parameters: Parameters,
  projectId: "local",
  port: port,
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <>
    <TestInterface
      axios={props.axios}
      statusBar={props.statusBar}
      isDarkMode={props.isDarkMode}
      testInterfaceModal={props.testInterfaceModal}
      environmentOptions={props.environmentOptions}
      isJsonString={props.isJsonString}
      leftCard={props.leftCard}
      parameters={props.parameters}
      port={props.port}
    />
    <Notifications />
  </>,
);
