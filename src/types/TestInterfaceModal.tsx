import React from "react";
import { Modal, Button, Text } from "../Components";
import styles from "../styles/TestInterface.module.css";
import { Icon } from "@iconify/react";
import { BtnClose, ButtonContinueModal, DivModal, HeaderModal, IconModal, PModal } from "../styles/TestInterfaceModal";

interface TestInterfaceModalProps {
  modal: boolean;
  name: string;
  onHide: () => void;
}

export const TestInterfaceModal: React.FC<TestInterfaceModalProps> = ({ modal, name, onHide }) => {
  return (
    <Modal isOpen={modal} onClose={onHide}>
      <BtnClose>
        <Button variant="purple700" onClick={() => onHide()}>
          x
        </Button>
      </BtnClose>
      <DivModal>
        {" "}
        <IconModal>
          <Icon icon="ion:ios-close-circle-outline"></Icon>{" "}
        </IconModal>
        <HeaderModal>
          <Text as={"h4"}>Oops! Looks like you have a different project opened on port 8083.</Text>{" "}
        </HeaderModal>
        <PModal>
          <Text as={"p"}>
            If you have project "{name}" open on another port, please close this modal, enter that port and click
            "Connect"
          </Text>
        </PModal>
        <PModal>
          <Text as={"p"}>
            If you want to test the project running on port 8083, clik the link provided in your terminal, or click{" "}
            <a style={{ color: "#6F42C1" }} href={`http://localhost:5173/test-interface/local?port=8083`}>
              here
            </a>
          </Text>
        </PModal>
        <ButtonContinueModal>
          <Button variant="purple700" type="button" onClick={() => onHide()}>
            Continue
          </Button>{" "}
        </ButtonContinueModal>
      </DivModal>
    </Modal>
  );
};
