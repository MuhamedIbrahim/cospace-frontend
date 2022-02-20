import { components } from "react-select";
import styled from "styled-components";

export const OptionWrapper = styled(components.Option)`
  color: var(
    --${(props) => (props.isDisabled ? "lightGrey6" : "darkGrey")}
  ) !important;
  background-color: var(
    --${(props) =>
      props.isSelected
        ? "lightBlue"
        : props.isFocused
        ? "lightGrey"
        : "transparent"}
  ) !important;
  display: flex;
  align-items: center;
  &:not(:last-child) {
    border-bottom: 1px solid var(--lightGrey2);
  }
  img, svg {
    width: 30px;
    height: 30px;
    object-fit: contain;
    margin-${(props) => (props.theme.lang === "ar" ? "left" : "right")}: 7px;
    flex: 1;
  }
`;

const Wrapper = styled.div<{ hasError: boolean }>`
  .dropdown_indicator {
    padding: 0 10px;
    font-size: 20px;
    line-height: 20px;
  }
  .select_control {
    min-height: 45px;
    border: 1px solid var(--lightGrey4);
    transition: border-color 0.1s ease-in-out;
    box-shadow: none;
    cursor: pointer;
    overflow: hidden;
    font-weight: 600;
    input {
      color: var(--darkGrey) !important;
    }
    &:hover {
      border-color: var(--darkGrey);
    }
    ${(props) => (props.hasError ? `border-color: var(--red);` : "")}
  }
  .select_control--open:hover,
  .select_control--open {
    border-color: var(--blue);
  }
  .select_menu {
    box-shadow: 0 2px 7px rgb(164 173 186 / 20%);
    border: 1px solid var(--lightGrey3);
    border-radius: 3px;
    top: calc(100% - 1px);
    z-index: 100;
    & > div,
    & > div > div {
      padding: 0;
    }
  }
  .select_menu__heading {
    font-size: 18px;
    font-weight: 700;
    text-transform: none;
    color: var(--darkGrey);
    margin: 10px 0;
  }
`;

export default Wrapper;
