import React from "react";
import { Col, Row, Button, Text } from "../Components";
import { useTheme } from "styled-components";

export const StatusBar: React.FC<{
  environment: string;
  success: boolean;
  port: number;
  url: string;
  tabs: any;
  activeTab: number;
  updatePort: (port: any) => any;
}> = ({ environment, success, port, url, tabs, activeTab, updatePort }) => {
  const [value, setValue] = React.useState<any>("");

  const theme = useTheme();
  return (
    <div className="mx-lg-4 mx-0 px-4 px-lg-0 mt-4 mb-4 w-100">
      {success ? (
        <div
          style={{
            border: "1px solid #62C353",
            borderRadius: "5px",
            paddingLeft: 10,
          }}
          className="w-100 pt-2 pb-2"
        >
          <Row>
            <Col lg={environment === "Local" ? 7 : 12}>
              {tabs[activeTab]?.method.type === "function" ? (
                <Text as={"div"} fontSize="14">
                  Send requests to <strong>{tabs[activeTab]?.method.cloudUrl}</strong>
                </Text>
              ) : url ? (
                <Text as={"span"} fontSize="14">
                  Requests will be sent to <strong>{url}</strong>
                </Text>
              ) : (
                <Text as={"div"}>Choose a function</Text>
              )}
            </Col>
            {environment === "Local" && (
              <Col lg={5} className="d-flex align-items-center justify-content-end">
                <Text as={"div"} style={{ paddingRight: "10px", color: "#62C353" }} fontSize="14">
                  Successfully connected to port {port ? port : 8083}
                </Text>
              </Col>
            )}
          </Row>
        </div>
      ) : (
        <div
          style={{
            border: "1px solid #C35353",
            borderRadius: "5px",
            paddingLeft: 10,
            color: "#C35353",
            paddingTop: 2,
            paddingBottom: 2,
          }}
          className="w-100"
        >
          <Row>
            <Col lg={5}>
              <Row>
                <Col lg={4} className="d-flex align-items-center">
                  <Text as={"div"} style={{ color: "#C35353" }} fontSize="14">
                    Enter port:
                  </Text>
                </Col>
                <Col lg={4} className="mr-3 mr-lg-0 port-input-div" style={{ paddingTop: "2px" }}>
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Port"
                    value={value}
                    onChange={(v) => setValue(v.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        updatePort(value);
                        setValue("");
                      }
                    }}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={7} className="d-flex align-items-center justify-content-end">
              {!value ? (
                <Text as={"div"} style={{ paddingRight: "10px", color: "#C35353" }} fontSize="14">
                  Couldn't connect to port {port ? port : 8083}! Provide a valid port and try again!
                </Text>
              ) : (
                <div style={{ paddingRight: "10px" }}>
                  <Button
                    size="sm"
                    variant="purple500"
                    style={{ color: `${theme.colors.white}` }}
                    className="mt-2 mb-2 mt-lg-0 mb-lg-0"
                    noIconFill={true}
                    onClick={() => {
                      updatePort(value);
                      setValue("");
                    }}
                  >
                    Connect
                  </Button>{" "}
                </div>
              )}
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};
