import React from "react";
import { Modal, Button, Text } from "../Components";
import { Icon } from "@iconify/react";

interface TestInterfaceModalProps {
  modal: boolean;
  name: string;
  onHide: () => void;
}

export const TestInterfaceModal: React.FC<TestInterfaceModalProps> = ({ modal, name, onHide }) => {
  return (
    <Modal isOpen={modal} onClose={onHide}>
      <Button variant="purple700" onClick={() => onHide()}>
        x
      </Button>
      <div className="text-center pl-2 pr-2">
        {" "}
        <Icon className="icon-modal mb-3" icon="ion:ios-close-circle-outline"></Icon>{" "}
        <Text className="mb-4" as={"h4"}>
          Oops! Looks like you have a different project opened on port 8083.
        </Text>{" "}
        <Text className="mb-4 ml-3 mr-3" as={"p"}>
          If you have project "{name}" open on another port, please close this modal, enter that port and click
          "Connect"
        </Text>
        <Text className="mb-4 ml-3 mr-3" as={"p"}>
          If you want to test the project running on port 8083, clik the link provided in your terminal, or click{" "}
          <a style={{ color: "#6F42C1" }} href={`http://localhost:5173/test-interface/local?port=8083`}>
            here
          </a>
        </Text>
        <Button className="btn-continue" variant="purple700" type="button" onClick={() => onHide()}>
          Continue
        </Button>{" "}
      </div>
    </Modal>
  );
};
