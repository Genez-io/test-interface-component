import React from "react";
import { Col, Row, Button } from "../Components";
import { Form } from "react-bootstrap";

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

  return (
    <div className="mx-4 mt-4 mb-4 w-lg-100">
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
            <Col className={environment === "Local" ? "col-lg-7" : "col-lg-12"}>
              {tabs[activeTab]?.method.type === "function" ? (
                <div>
                  Send requests to <strong>{tabs[activeTab]?.method.cloudUrl}</strong>
                </div>
              ) : url ? (
                <div>
                  Requests will be sent to <strong>{url}</strong>
                </div>
              ) : (
                "Choose a function"
              )}
            </Col>
            {environment === "Local" && (
              <Col lg={5} className="d-flex align-items-center justify-content-end col-lg-5">
                <div style={{ paddingRight: "10px", color: "#62C353" }}>
                  Successfully connected to port {port ? port : 8083}
                </div>
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
            <Col className="col-lg-5">
              <Row>
                <Col className="d-flex align-items-center col-lg-4">
                  <div>Enter port:</div>
                </Col>
                <Col className="col-lg-4 me-3 me-lg-0" style={{ paddingTop: "2px" }}>
                  <Form.Control
                    type="text"
                    className="form-control "
                    placeholder="Port"
                    value={value}
                    onChange={(v) => setValue(v.target.value)}
                    size="sm"
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
            <Col className="d-flex align-items-center justify-content-end col-lg-7">
              {!value ? (
                <div style={{ paddingRight: "10px" }}>
                  Couldn't connect to port {port ? port : 8083}! Provide a valid port and try again!
                </div>
              ) : (
                <div style={{ paddingRight: "10px" }}>
                  <Button
                    size="sm"
                    variant="purple200"
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
