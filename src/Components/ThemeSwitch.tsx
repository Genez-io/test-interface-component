import { useTheme } from "../contexts/ThemeContext";
import styled from "styled-components";
import { SunIcon } from "../assets/icons/sun";
import { MoonIcon } from "../assets/icons/moon";

const dark = {
  active: "#666666",
  inactive: "#2D2E2E",
};

const light = {
  active: "#FFFFFF",
  inactive: "#EAEAEB",
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => (theme.name === "dark" ? "#2D2E2E" : "#EAEAEB")};
  border-radius: 18px;
  padding: 1px;
`;

const Tile = styled.div<{ active?: boolean; position: "left" | "right" | "center" }>`
  background-color: ${({ theme, active }) =>
    active
      ? theme.name === "dark"
        ? dark.active
        : light.active
      : theme.name === "dark"
      ? dark.inactive
      : light.inactive};
  width: 38px;
  height: 36px;
  border-radius: ${({ position }) =>
    position === "right" ? "0 18px 18px 0" : position === "left" ? "18px 0 0 18px" : "0px"};
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;

  svg {
    fill: ${({ theme }) => (theme.name === "light" ? "#1D1B20" : "#FAFAFA")};
  }
`;

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Container
      onClick={() => {
        toggleTheme();
      }}
    >
      <Tile active={theme.name === "dark"} position="left">
        <MoonIcon />
      </Tile>
      <Tile active={theme.name === "light"} position="right">
        <SunIcon />
      </Tile>
    </Container>
  );
}
