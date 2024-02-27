// import "./App.css";
import "./index.scss";
// import awesome font
// import "font-awesome/css/font-awesome.min.css";

import { useState, useEffect, useRef } from "react";
import { Row, Col, Card, Breadcrumb, Button, Spinner, Alert } from "react-bootstrap";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useParams } from "react-router-dom";
import ReactJson from "react-json-view";
import Tabs, { Tab } from "react-awesome-tabs";
import moment from "moment";

// import { getProjectById, getLogs, getCurrentCollaboratorDetails } from "./TestInterface/ApiAxios";
import Parameters from "./types/Parameters";
import StatusBar from "./types/StatusBar";
import GenezioSpinner from "./types/GenezioSpinner";
import TestInterfaceModal from "./types/TestInterfaceModal";
// import { environmentOptions, isJsonString } from "./TestInterface/Utils";
import LeftCard from "./types/LeftCard";
// import { CollaboratorDetails } from "TestInterface/CollaborationModels";

type dropdownOption = {
  value: string;
  label: string;
};

interface Param {
  name: string;
  type: string | dropdownOption;
  value?: string;
}
interface Method {
  name: string;
  type: string;
  params: Param[];
}

interface ClassType {
  name: string;
  id: string;
  cloudUrl: string;
  ast: {
    methods: Method[];
  };
}

interface Project {
  name: string;
  region: string;
}

interface TabType {
  tab: string;
  className: string;
  method: Method;
  response: string;
  time: number;
  status: number;
}

interface CollaboratorDetails {
  email: string;
  role: string;
}

export interface TestInterfaceProps {
  axios: {
    getProjectById: (projectId: string) => Promise<any>;
    getLogs: (classId: string, startTime: any, endTime: any, searchTerm: string, nextToken?: any) => Promise<any>;
    getCurrentCollaboratorDetails: (projectId: string) => Promise<any>;
  };
  statusBar: typeof StatusBar;
  // statusBar: any;
  genezioSpinner: typeof GenezioSpinner;
  testInterfaceModal: typeof TestInterfaceModal;
  // testInterfaceModal: React.FC<any>;
  // testInterfaceModal: any;
  environmentOptions: readonly dropdownOption[];
  isJsonString: (s: string) => boolean;
  // leftCard: React.FC<any>;
  // parameters: React.FC<any>;
  leftCard: typeof LeftCard;
  parameters: typeof Parameters;
}

export const TestInterface = (props: TestInterfaceProps) => {
  // Messages Types For Logs
  const MESSAGES_TYPES = ["START", "ALL", "ERROR2", "REPORT", "INFO", "DEBUG", "WARNING", "END"];
  // const searchParams = useSearchParams()[0];
  const searchParams = new URLSearchParams(window.location.search);
  const [port, setPort] = useState<any>(searchParams.get("port"));
  const { projectId, envId } = useParams<{ projectId?: string; envId?: string }>();
  const cameFromProduction: boolean = projectId != undefined && projectId !== "local";
  console.log(projectId);
  // const navigate = useNavigate();
  const navigate = (path: string) => {
    window.location.href = path; // This will navigate to the specified path
  };
  const localUrl: string = "http://localhost:";

  const [currentCollaboratorDetails, setCurrentCollaboratorDetails] = useState<CollaboratorDetails>({
    email: "",
    role: "",
  });

  const [environment, setEnvironment] = useState<dropdownOption>(
    cameFromProduction ? props.environmentOptions[0] : props.environmentOptions[1],
  );

  useEffect(() => {
    cameFromProduction
      ? (document.title = "Genezio | Test Interface Production Project")
      : (document.title = "Genezio | Test Interface Local Project");
  }, []);

  const [project, setProject] = useState<Project>({
    name: "",
    region: "",
  });

  const dataTabsOptions = ["Response", "Logs"];

  const [classes, setClasses] = useState<ClassType[]>([]);
  const [activeEnv, setActiveEnv] = useState<any>({});

  const [loading, setLoading] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(true);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [loadingRefresh, setLoadingRefresh] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const [pretty, setPretty] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<number>(-1);
  const [tabs, setTabs] = useState<TabType[]>([]);
  const [dataTabs, setDataTabs] = useState<String>("Response");
  const [logs, setLogs] = useState<any>([]);
  const [startTime, setStartTime] = useState<any>("");
  const [reqTab, setReqTab] = useState<any>("");
  const [reqClass, setReqClass] = useState<any>("");
  const [logsLoading, setLogsLoading] = useState<any>(false);

  const sendButtonRef = useRef<HTMLButtonElement>(null);

  if (activeEnv.name === "prod" && currentCollaboratorDetails?.role === "collaborator") {
    navigate("/dashboard");
  }

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (startTime !== "") {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [startTime]);

  useEffect(() => {
    fetchCurrentCollaboratorDetails();
  }, []);

  useEffect(() => {
    const runAsyncProd = async () => {
      setClasses([]);
      setLoadingRefresh(true);
      const res: any = await props.axios.getProjectById(projectId ?? "");
      if (res.data && res.data.status === "ok") {
        setProject({
          name: res.data.project.name,
          region: res.data.project.region,
        });
        const storage = localStorage.getItem(res.data.project.name);
        const { tabs: storageTabs, activeTab: storageActiveTab } = storage
          ? JSON.parse(storage)
          : { tabs: [], activeTab: -1 };
        const localActiveEnv = res.data.project.projectEnvs.find((env: any) => env.id === envId);
        syncTabs(storageTabs, localActiveEnv.classes);
        setTabs(storageTabs);
        setActiveTab(storageActiveTab);
        setActiveEnv(localActiveEnv);
        setClasses(localActiveEnv.classes);
        setConnected(true);
      } else if (res.response.data.error.code === 2 || res.response.data.error.code === 6) {
        navigate("/dashboard");
      }
      setPort(null);
      setLoadingRefresh(false);
    };
    const runAsyncLocal = async () => {
      setClasses([]);
      let tpmPort = port;
      if (port == null) {
        tpmPort = 8083;
      }
      setLoadingRefresh(true);
      try {
        const response = await fetch(`${localUrl}${tpmPort}/get-ast-summary`, {
          keepalive: true,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
          cache: "no-cache",
        });
        const res = await response.json();
        if (cameFromProduction && res.name !== project.name) {
          setConnected(false);
          setClasses([]);
          setActiveTab(-1);
          setTabs([]);
          setLoadingRefresh(false);
          setModal(true);
          return;
        }
        setProject({ name: res.name, region: "Local" });
        const storage = localStorage.getItem(res.name);
        const { tabs: storageTabs, activeTab: storageActiveTab } = storage
          ? JSON.parse(storage)
          : { tabs: [], activeTab: -1 };
        const mappedClasses = res.classes.map((classItem: any) => ({
          ...classItem,
          ast: {
            methods: [...classItem.methods],
            types: classItem.types ? [...classItem.types] : [],
            version: res.version,
          },
        }));
        syncTabs(storageTabs, mappedClasses);
        setClasses(mappedClasses);
        setTabs(storageTabs);
        setActiveTab(storageActiveTab);
        setConnected(true);
      } catch (error) {
        setPort(null);
        setConnected(false);
        setClasses([]);
      }
      setLoadingRefresh(false);
    };
    environment?.value === "Local" ? runAsyncLocal() : runAsyncProd();
  }, [environment, port, refresh]);

  useEffect(() => {
    if (startTime) {
      const intervalId = setInterval(() => {
        const runAsync = async () => {
          const response = await props.axios.getLogs(
            classes?.filter((classObj) => {
              return classObj?.name === tabs[activeTab]?.className;
            })[0]?.id,
            startTime,
            new Date().getTime() + 2 * 60 * 60 * 1000,
            "",
            "",
          );
          if (response?.data?.status === "ok") {
            setLogs((prevLogs: any) => {
              const newLogs = response?.data?.logs?.Events.filter((el: any) => {
                // Check if the current log element's Timestamp is not found in the prevLogs array
                return !prevLogs?.some((obj: any) => obj.Timestamp === el.Timestamp);
              }).map((el: any) => {
                return {
                  ...el,
                  Message: el?.Message?.replace(/.*?(?=END|ERROR|REPORT|INFO|DEBUG|WARNING)/, ""),
                  tab: reqTab,
                  classes: reqClass,
                };
              });

              // Combine the newLogs with the previous logs
              const updatedLogs = [...prevLogs, ...newLogs];

              // Compare the old and updated logs arrays
              const hasNewLogs = newLogs.length > 0;
              if (hasNewLogs && logsLoading) {
                setLogsLoading(false);
              }

              return updatedLogs;
            });
          } else if (response?.data?.status === "error" && response.data.error.Code === "3") {
            setLogs([]);
          }
        };
        runAsync();
      }, 5000); // Call the code every 5 seconds
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [startTime, reqTab, reqClass]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
        sendButtonRef.current?.click();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
  }, []);

  const syncTabs = (storageTabs: TabType[], classes: ClassType[]) => {
    storageTabs.forEach((tab: TabType) => {
      const classItem = classes.find((x: ClassType) => x.name === tab.className);
      if (classItem) {
        const method = classItem.ast.methods.find((x: Method) => x.name === tab.method.name);
        if (method) {
          // check for added params in method
          for (let param of method.params) {
            if (!tab.method.params.find((x: Param) => x.name === param.name)) {
              tab.method.params.push({
                name: param.name,
                type: param.type,
                value: "",
              });
            }
          }
          // check for removed params in method
          for (let param of tab.method.params) {
            if (!method.params.find((x: Param) => x.name === param.name)) {
              tab.method.params.splice(tab.method.params.indexOf(param), 1);
            }
          }
          // sort params to match function prototype
          tab.method.params.sort((a: Param, b: Param) => {
            return (
              method.params.findIndex((x: Param) => x.name === a.name) -
              method.params.findIndex((x: Param) => x.name === b.name)
            );
          });
        }
      }
    });
    localStorage.setItem(project.name, JSON.stringify({ activeTab, tabs: storageTabs }));
  };

  const getUrl = (): string => {
    if (environment?.value === "Local") {
      return `${localUrl}${port ? port : 8083}/${tabs[activeTab].className}`;
    } else {
      return classes?.find((x: ClassType) => x.name === tabs[activeTab].className)?.cloudUrl ?? "";
    }
  };

  const sendRequest = async () => {
    const methodName = tabs[activeTab].className + "." + tabs[activeTab].method.name;
    const params = tabs[activeTab].method.params.map((param: Param) => {
      if (param.value === "true") return true;
      if (param.value === "false") return false;
      if (isNaN(Number(param.value))) {
        return param.value;
      } else {
        return Number(param.value);
      }
    });
    const requestContent = {
      jsonrpc: "2.0",
      method: methodName,
      params: params,
      id: 3,
    };

    setLoading(true);
    const copyTabs = [...tabs];
    const startTime: number = new Date().getTime();
    try {
      const response = await fetch(getUrl(), {
        keepalive: true,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestContent),
      });
      const data = await response.json();
      if (data.statusCode) {
        copyTabs[activeTab].status = data.statusCode;
        copyTabs[activeTab].response = "Error: " + data.body;
        const endTime: number = new Date().getTime();
        copyTabs[activeTab].time = endTime - startTime;
        setTabs(copyTabs);

        setLoading(false);

        return;
      }

      copyTabs[activeTab].status = response.status;

      if (data.error) {
        copyTabs[activeTab].response = "Error: " + data.error.message;
        setTabs(copyTabs);
        setLoading(false);
        return;
      }
      const stringResponse: string = JSON.stringify(data.result, undefined, 4);
      setPretty(props.isJsonString(stringResponse));
      if (tabs[activeTab].method.type === "cron") {
        copyTabs[activeTab].response = "Cron method triggered successfully";
      } else {
        copyTabs[activeTab].response = stringResponse;
      }
    } catch (error) {
      if (environment?.value === "Local") {
        copyTabs[activeTab].response = "Error: " + error;
        copyTabs[activeTab].status = 503;
        setConnected(false);
        setPort(null);
      } else {
        copyTabs[activeTab].response = "Error: " + error;
        copyTabs[activeTab].status = 500;
      }
    }
    const endTime: number = new Date().getTime();
    copyTabs[activeTab].time = endTime - startTime;
    setTabs(copyTabs);
    localStorage.setItem(project.name, JSON.stringify({ activeTab, tabs: copyTabs }));

    setLoading(false);
  };

  const updateMethod = (method: Method, className: string) => {
    const index = tabs.findIndex((x: TabType) => x.className === className && x.method.name === method.name);
    if (index !== -1) {
      setActiveTab(index);
      return;
    }
    addTab(className, method);
  };

  const currentClass = tabs[activeTab];
  const filteredClass: any = classes?.filter((x: any) => x.name === currentClass?.className)[0];
  const isFullAST = filteredClass?.ast.version === "2" ? true : false;

  const updateParam = (name: string, value: string, type: any) => {
    tabs[activeTab].method.params.forEach((param: Param) => {
      if (param.name === name) {
        param.value = value;
        param.type = type;

        if (isFullAST ? type === "Object" || type === "Array" : type.value === "Object" || type.value === "Array") {
          try {
            param.value = JSON.parse(value);
          } catch (e) {}
        }
      }
    });
    localStorage.setItem(project.name, JSON.stringify({ activeTab, tabs }));
  };

  const addTab = (className: string, method: Method) => {
    const copyTabs = [...tabs];
    copyTabs.push({
      tab: method.name,
      className,
      method,
      response: "",
      time: 0,
      status: 0,
    });

    setTabs(copyTabs);
    setActiveTab(copyTabs.length - 1);

    localStorage.setItem(project.name, JSON.stringify({ activeTab: copyTabs.length - 1, tabs: copyTabs }));
  };

  const dragTabs = (a: number, b: number) => {
    const tabsCopy = [...tabs];
    let c = tabsCopy[a];
    tabsCopy[a] = tabsCopy[b];
    tabsCopy[b] = c;

    setTabs(tabsCopy);
    const newActiveTab = activeTab === b ? a : activeTab === a ? b : activeTab;
    setActiveTab(newActiveTab);
    localStorage.setItem(project.name, JSON.stringify({ activeTab: newActiveTab, tabs: tabsCopy }));
  };

  const closeTab = (index: number) => {
    const tabsCopy = [...tabs];
    tabsCopy.splice(index, 1);

    setTabs(tabsCopy);
    let newActiveTab: number = activeTab;
    if (activeTab >= tabsCopy.length) {
      newActiveTab = tabsCopy.length - 1;
    } else if (index < activeTab) {
      newActiveTab = activeTab - 1;
    }
    setActiveTab(newActiveTab);

    localStorage.setItem(project.name, JSON.stringify({ activeTab: newActiveTab, tabs: tabsCopy }));
  };

  var ua = navigator.userAgent.toLowerCase();
  if (ua.indexOf("safari") !== -1) {
    if (environment.value === "Local" && !(ua.indexOf("chrome") > -1)) {
      return (
        <div className="pt-3 pb-3">
          We are sorry, but the local environment is not supported on Safari. Please use Chrome or Firefox.
        </div>
      );
    }
  }

  const handleTabTitle = (tab: any) => {
    return tabs.filter((tabItem: any) => tabItem.tab === tab.tab).length > 1
      ? `${tab.className} - ${tab.tab}`
      : tab.tab;
  };

  const customCopyFunction = (data: any) => {
    let copiedText: string;

    if (typeof data === "string") {
      copiedText = data.replace(/^"(.*)"$/, "$1");
    } else {
      copiedText = JSON.stringify(data, null, 2);
    }

    navigator.clipboard.writeText(copiedText);
  };

  const fetchCurrentCollaboratorDetails = async () => {
    if (environment.value !== "Local") {
      const res: any = await props.axios.getCurrentCollaboratorDetails(projectId || "");

      if (res.status === 200 && res.data.status === "ok") {
        setCurrentCollaboratorDetails(res.data);
      }
    }
  };

  return (
    <div className="pt-3 pb-3 ps-3 pe-3">
      {/* <-- breadcrumb --> */}
      <div className="breadcrumb-header justify-content-between">
        <div className="left-content">
          {(cameFromProduction && (
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item
                className="breadcrumb-item"
                onClick={() => navigate("/")}
                aria-current="page"
                style={{ paddingTop: "1px" }} // hack don;t change it
              >
                All Projects
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item"
                aria-current="page"
                onClick={() => navigate(`/project/${projectId}/${envId}/backend`)}
              >
                Project: {project.name || <Spinner variant="primary" animation="border" size="sm" />}
                {" | Region: "}
                {project.region || <Spinner variant="primary" animation="border" size="sm" />}
              </Breadcrumb.Item>
              <Breadcrumb.Item
                className="breadcrumb-item"
                aria-current="page"
                onClick={() => navigate(`/project/${projectId}/${envId}/backend`)}
              >
                {"Environment: "}
                {activeEnv.name || (
                  <>
                    <Spinner variant="primary" animation="border" size="sm" />
                  </>
                )}
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page" active>
                Testing
              </Breadcrumb.Item>
            </Breadcrumb>
          )) || (
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item
                className="breadcrumb-item"
                aria-current="page"
                style={{ paddingTop: "1px" }} // hack don;t change it
              >
                Local Testing
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-item" aria-current="page" active>
                {project.name || <Spinner variant="primary" animation="border" size="sm" />}
              </Breadcrumb.Item>
            </Breadcrumb>
          )}
        </div>
      </div>
      {/* <!-- /breadcrumb --> */}

      {/* <!-- Modal --> */}
      <props.testInterfaceModal modal={modal} name={project?.name} onHide={() => setModal(false)} />
      {/* <!-- /Modal --> */}

      {/* <!-- Main Content --> */}
      <Row>
        {/* <!-- Left Card (Classes Sidebar) --> */}
        <props.leftCard
          environmentOptions={props.environmentOptions}
          environment={environment}
          projectId={projectId}
          classes={classes}
          updateMethod={updateMethod}
          activeTab={activeTab}
          tabs={tabs}
          loadingRefresh={loadingRefresh}
          setRefresh={() => setRefresh(!refresh)}
          setEnvironment={(t: any) => {
            setEnvironment(t ?? { value: "Local", label: "Local" });
          }}
        />
        {/* <!-- /Left Card (Classes Sidebar) --> */}
        {/* <!-- Right Card (Tabs and Calling Functions) --> */}
        <Col xl={9} md={12}>
          <Card style={{ height: "85vh" }}>
            {/* <!-- Status Bar and Calling Button --> */}
            <Row>
              <Col lg={10}>
                <props.statusBar
                  success={connected}
                  port={port}
                  environment={environment?.value || "Local"}
                  url={activeTab === -1 ? "" : getUrl()}
                  updatePort={setPort}
                />
              </Col>
              <Col className="d-flex justify-content-center" lg={2}>
                <Button
                  ref={sendButtonRef}
                  className="btn me-2 btn-primary mx-2 mt-4 mb-4 w-75 "
                  disabled={!connected || activeTab === -1}
                  onClick={() => {
                    environment?.value === "Production" &&
                      setStartTime(startTime === "" ? new Date().getTime() : startTime);
                    setReqTab(tabs[activeTab].tab);
                    setLogsLoading(true);
                    setDataTabs("Response");
                    setReqClass(tabs[activeTab].className);
                    sendRequest();
                  }}
                >
                  {loading ? <Spinner animation="border" size="sm" /> : "Send"}
                </Button>
              </Col>
            </Row>
            {/* <!-- /Status Bar and Calling Button --> */}

            {/* <!-- Resizable Pannels --> */}
            <PanelGroup direction="vertical">
              {/* <!-- Upper Panel (Tabs and Parameters) --> */}
              <Panel maxSize={90} defaultSize={60}>
                {/* <!-- Tabs --> */}
                <div className="mb-4" style={{ height: "30px" }}>
                  <Tabs
                    active={activeTab}
                    onTabSwitch={(index: number) => {
                      setActiveTab(index);
                      localStorage.setItem(project.name, JSON.stringify({ activeTab: index, tabs }));
                    }}
                    onTabClose={(index: number) => closeTab(index)}
                    onTabPositionChange={(a: number, b: number) => dragTabs(a, b)}
                    draggable
                  >
                    {tabs.map((tab: TabType, index: number) => (
                      <Tab title={handleTabTitle(tab)} key={index} showClose></Tab>
                    ))}
                  </Tabs>
                </div>
                {/* <!-- /Tabs --> */}

                {/* <!-- Parameters --> */}
                <props.parameters
                  classes={classes}
                  activeTab={activeTab}
                  tabs={tabs}
                  url={activeTab === -1 ? "" : getUrl()}
                  isLocalEnviroment={environment?.value === "Local" ? true : false}
                  projectName={project?.name}
                  loadingRefresh={loadingRefresh}
                  updateParam={updateParam}
                />
                {/* <!-- /Parameters --> */}
              </Panel>
              {/* <!-- /Upper Panel (Tabs and Parameters) --> */}
              <PanelResizeHandle>
                <hr style={{ borderColor: "black", borderWidth: "0.5px" }} />
              </PanelResizeHandle>
              {/* <!-- Lower Panel (Response) --> */}
              <Panel maxSize={100}>
                <div className="ps-5 pe-5 h-100">
                  <Row>
                    <Col lg={3} style={{ paddingLeft: "0" }} className="pb-3 pt-1">
                      {dataTabsOptions.map((option, idx) => (
                        <span
                          onClick={() => setDataTabs(option)}
                          className="border-primary"
                          style={{
                            borderBottom: dataTabs === option ? "2px solid" : "none",
                            fontWeight: 600,
                            fontSize: 14,
                            color: "#666666",
                            marginLeft: idx !== 0 ? "10px" : "0",
                            padding: "0 5px 0 5px",
                            cursor: "pointer",
                          }}
                        >
                          {option}
                        </span>
                      ))}
                    </Col>
                    <Col lg={9} className="d-flex align-items-center justify-content-end pb-3 pt-1">
                      {activeTab !== -1 && tabs[activeTab].response && (
                        <div>
                          <span>Time: </span>
                          <span
                            style={{
                              color: "#62C353",
                              fontWeight: 500,
                              fontSize: 14,
                            }}
                          >
                            {tabs[activeTab].time}ms
                          </span>
                          <span className="ms-4">Status: </span>
                          <span
                            style={{
                              color: "#62C353",
                              fontWeight: 500,
                              fontSize: 14,
                            }}
                          >
                            {tabs[activeTab].status}
                          </span>
                        </div>
                      )}
                    </Col>
                  </Row>
                  {dataTabs === "Response" && (
                    <Row>
                      <Button
                        variant="light"
                        onClick={() => setPretty(true)}
                        disabled={activeTab === -1 || !props.isJsonString(tabs[activeTab].response)}
                        active={pretty}
                      >
                        Pretty
                      </Button>
                      <Button
                        variant="light"
                        onClick={() => setPretty(false)}
                        disabled={activeTab === -1 || tabs[activeTab].response === ""}
                        active={!pretty}
                      >
                        Raw
                      </Button>
                    </Row>
                  )}
                  <Row className="h-100 overflow-auto mb-10">
                    <Col lg={12} className="p-0" style={{ marginBottom: "100px" }}>
                      {dataTabs === "Response" ? (
                        <div className="pt-4 pb-2 w-100">
                          {loading ? (
                            <props.genezioSpinner />
                          ) : pretty && activeTab !== -1 && props.isJsonString(tabs[activeTab].response) ? (
                            <ReactJson
                              src={JSON.parse(tabs[activeTab].response)}
                              displayDataTypes={true}
                              enableClipboard={(e) => customCopyFunction(e.src)}
                              theme={
                                localStorage.getItem("darkMode") === "true"
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
                          ) : activeTab === -1 ? (
                            ""
                          ) : (
                            tabs[activeTab].response
                          )}
                        </div>
                      ) : (
                        <>
                          {logs
                            .filter((log: any) => log?.classes === currentClass?.className)
                            .filter((item: any) => item.tab === tabs[activeTab]?.tab).length !== 0 &&
                            logsLoading && <Alert>Getting logs in progress, it might take up to 10 seconds.</Alert>}
                          <div
                            className="table-responsive"
                            style={{
                              overflow: "initial",
                            }}
                          >
                            {/* TODO: FILTER by active class */}
                            {logs
                              .filter((log: any) => log?.classes === currentClass?.className)
                              .filter((item: any) => item.tab === tabs[activeTab]?.tab).length === 0 ||
                            environment?.value === "Local" ? (
                              <Alert>
                                {environment?.value === "Local"
                                  ? "You can see the logs in the CLI."
                                  : logsLoading !== true
                                    ? "There are no logs."
                                    : "Getting logs in progress, it might take up to 10 seconds."}
                              </Alert>
                            ) : (
                              <table style={{ border: "none" }} className="table borderless mb-0">
                                <thead>
                                  <tr>
                                    <th className="text-left">
                                      <span className="tabletitle">Timestamp</span>
                                    </th>
                                    <th className="text-left">
                                      <span className="tabletitle">Message</span>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* TODO: create Log component */}
                                  {logs
                                    .filter((log: any) => log?.classes === currentClass?.className)
                                    .filter((item: any) => item.tab === tabs[activeTab]?.tab)
                                    .reverse()
                                    .map((elem: any, key: GLint64) => {
                                      return (
                                        <tr key={key}>
                                          <td
                                            style={{
                                              borderBottom: "1px solid #6F42C1",
                                            }}
                                            className="text-left text-nowrap"
                                          >
                                            {moment.unix(elem.Timestamp / 1000).format("YYYY-MM-DD HH:mm:ss.SSS")}
                                          </td>

                                          <td
                                            className="text-left"
                                            style={{
                                              width: "100%",
                                              borderBottom: "1px solid #6F42C1",
                                              color:
                                                elem.Message.search("ERROR") !== -1
                                                  ? "#f9301e"
                                                  : elem.Message.search("WARNING") !== -1
                                                    ? "#f9b31e"
                                                    : elem.Message.search("INFO") !== -1
                                                      ? "#28944F"
                                                      : "inherit",
                                            }}
                                          >
                                            {/* show {elem.Message} and make INFO, ERROR with bold  - do the split by /t and space */}
                                            {/* regex that mathc by \t and space */}
                                            {/* split by regex */}
                                            {elem.Message.split(/(\t|\s|:)/).map((word: any) => {
                                              if (MESSAGES_TYPES.includes(word)) {
                                                return <b key={Math.random() * 1000}>{word}</b>;
                                              }
                                              return word;
                                            })}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                </tbody>
                              </table>
                            )}
                          </div>
                        </>
                      )}

                      <div className="mt-10"></div>
                    </Col>
                  </Row>
                </div>
              </Panel>
              {/* <!-- /Lower Panel (Response) --> */}
            </PanelGroup>
            {/* <!-- /Resizable Panels --> */}
          </Card>
        </Col>
        {/* <!-- /Right Card --> */}
      </Row>
      {/* <!-- /Main Content --> */}
    </div>
  );
};
