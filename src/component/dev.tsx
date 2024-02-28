import ReactDOM from "react-dom/client";
import { TestInterface } from "./TestInterface";
import { getProjectById, getLogs, getCurrentCollaboratorDetails } from "./types/ApiAxios";
import Parameters from "./types/Parameters";
import StatusBar from "./types/StatusBar";
import GenezioSpinner from "./types/GenezioSpinner";
import TestInterfaceModal from "./types/TestInterfaceModal";
import { environmentOptions, isJsonString } from "./types/Utils";
import LeftCard from "./types/LeftCard";

const props = {
  axios: {
    getProjectById: getProjectById,
    getLogs: getLogs,
    getCurrentCollaboratorDetails: getCurrentCollaboratorDetails,
  },
  statusBar: StatusBar,
  genezioSpinner: GenezioSpinner,
  testInterfaceModal: TestInterfaceModal,
  environmentOptions: environmentOptions,
  isJsonString: isJsonString,
  leftCard: LeftCard,
  parameters: Parameters,
  projectId: "local",
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// console.log("before render");
root.render(
  <TestInterface
    axios={props.axios}
    statusBar={props.statusBar}
    genezioSpinner={props.genezioSpinner}
    testInterfaceModal={props.testInterfaceModal}
    environmentOptions={props.environmentOptions}
    isJsonString={props.isJsonString}
    leftCard={props.leftCard}
    parameters={props.parameters}
    projectId={props.projectId}
  />,
  //   <BrowserRouter>
  //     {/* <React.Suspense
  //       fallback={
  //         <div className="loader-img">
  //           <GenezioSpinner />
  //           <div></div>
  //         </div>
  //       }
  //     > */}
  //     <Routes>
  //       <Route
  //         path="/test-interface/"
  //         element={
  //           <App
  //             axios={props.axios}
  //             statusBar={props.statusBar}
  //             genezioSpinner={props.genezioSpinner}
  //             testInterfaceModal={props.testInterfaceModal}
  //             environmentOptions={props.environmentOptions}
  //             isJsonString={props.isJsonString}
  //             leftCard={props.leftCard}
  //             parameters={props.parameters}
  //           />
  //         }
  //       />
  //       <Route path="*" element={<Navigate to="/test-interface/" />} />
  //     </Routes>
  //   </BrowserRouter>,
);
