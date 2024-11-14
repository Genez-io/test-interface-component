import { useState } from "react";
import { Button, Input } from "..";
import Alert from "../Alert";
import Text from "../Text";

export interface ConfirmProps {
  title: string;
  variant: "danger" | "warning";
  message: {
    question: string;
    alert: string;
    inputPrompt: string;
    buttonText: string;
  };
  expectedInput: string;
  onConfirm: () => void;
}

export default function Confirm(props: ConfirmProps) {
  const [input, setInput] = useState("");
  const variant = props.variant === "danger" ? "red" : "yellow";

  return (
    <>
      <Text as="h2">{props.title}</Text>
      <Text as="p">{props.message.question}</Text>
      <Alert>
        <Text as="p">{props.message.alert}</Text>
      </Alert>
      <Text as="p">{props.message.inputPrompt}</Text>
      <Input onChange={(e) => setInput(e.target.value)}></Input>
      <Button variant={variant} disabled={input !== props.expectedInput} onClick={props.onConfirm}>
        {props.message.buttonText}
      </Button>
    </>
  );
}
