import React from "react";
import { Modal, Button } from "react-bootstrap";

interface TestInterfaceModalProps {
  modal: boolean;
  name: string;
  onHide: () => void;
}

const TestInterfaceModal: React.FC<TestInterfaceModalProps> = ({ modal, name, onHide }) => {
  return (
    <Modal show={modal}>
      <Modal.Header>
        <Button variant="" className="btn btn-close" onClick={() => onHide()}>
          x
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="tx-center ps-2 pe-2">
          {" "}
          <i className="icon icon ion-ios-close-circle-outline tx-100 tx-danger lh-1 mg-t-20 d-inline-block"></i>{" "}
          <h4 className="tx-danger mg-b-20">Oops! Looks like you have a different project opened on port 8083.</h4>{" "}
          <p className="mg-b-20 mg-x-20">
            If you have project "{name}" open on another port, please close this modal, enter that port and click
            "Connect"
          </p>
          <p className="mg-b-20 mg-x-20">
            If you want to test the project running on port 8083, clik the link provided in your terminal, or click{" "}
            <a
              style={{ color: "#6F42C1" }}
              href={`${import.meta.env.REACT_APP_BASE_URL}/test-interface/local?port=8083`}
            >
              here
            </a>
          </p>
          <Button
            variant=""
            aria-label="Close"
            className="btn ripple btn-danger pd-x-25"
            type="button"
            onClick={() => onHide()}
          >
            Continue
          </Button>{" "}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default TestInterfaceModal;
