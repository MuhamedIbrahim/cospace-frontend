import styled from "styled-components";

const Wrapper = styled.button<{
  $fullRadius: boolean;
  $hasLabelIcon: "both" | "single";
  $iconOnly: boolean;
  $iconPosition: "start" | "end";
}>`
  border: 1px solid;
  border-radius: ${(props) => (props.$fullRadius ? "50px" : "3px")};
  display: inline-flex;
  align-items: center;
  justify-content: ${(props) =>
    props.$hasLabelIcon === "both"
      ? props.$iconPosition !== "start"
        ? "space-between"
        : "center"
      : "center"};
  transition: 0.1s background-color, 0.1s color, 0.1s border-color;
  min-width: ${(props) => (props.$iconOnly ? "auto" : "120px")};
  padding: ${(props) => (props.$iconOnly ? "0" : "0 15px")};
  &,
  &:hover {
    text-decoration: none;
  }
  &,
  &:focus {
    outline: none;
  }
  &.primary {
    background-color: var(--purple2);
    color: var(--white);
    border-color: var(--purple2);
    &:hover,
    &:focus {
      background-color: var(--purple2);
      border-color: var(--purple2);
    }
  }
  &.secondary {
    background-color: var(--white);
    color: var(--darkGrey);
    border-color: var(--lightGrey4);
    &:hover,
    &:focus {
      border-color: var(--darkGrey);
    }
  }
  &.outline {
    background-color: var(--white);
    color: var(--darkBlue);
    &,
    &:hover,
    &:focus {
      border-color: transparent;
    }
    padding: 0;
  }
  &.icon {
    background-color: transparent;
    & {
      border-color: transparent;
    }
    &:hover,
    &:focus {
      background-color: var(--lightGrey2);
      border-color: var(--lightGrey2);
    }
  }
  &.blue {
    background-color: var(--blue);
    color: var(--white);
    border-color: var(--blue);
    &:hover,
    &:focus {
      border-color: var(--blue);
    }
  }
  &.danger {
    background-color: var(--red);
    color: var(--white);
    border-color: var(--red);
    &:hover,
    &:focus {
      border-color: var(--red);
    }
  }
  &.secondary_blue {
    background-color: var(--white);
    color: var(--purple2);
    border-color: var(--purple2);
    &:hover,
    &:focus {
      color: var(--white);
      background-color: var(--purple2);
    }
  }
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  &.xl {
    height: ${(props) => (props.$iconOnly ? "47px" : "52px")};
    font-size: 16px;
    font-weight: 500;
    ${(props) => (props.$iconOnly ? "width: 47px;" : "")}
    svg {
      font-size: 20px;
      line-height: 20px;
    }
  }
  &.lg {
    height: ${(props) => (props.$iconOnly ? "41px" : "46px")};
    font-weight: 500;
    ${(props) => (props.$iconOnly ? "width: 41px;" : "")}
  }
  &.md {
    height: ${(props) => (props.$iconOnly ? "35px" : "40px")};
    font-weight: 500;
    font-size: 15px;
    ${(props) => (props.$iconOnly ? "width: 35px; font-size: 17px;" : "")}
  }
  i {
    font-style: normal;
    ${(props) =>
      props.$hasLabelIcon === "both"
        ? `
        margin-${
          props.theme.lang === "ar"
            ? props.$iconPosition === "end"
              ? "left"
              : "right"
            : props.$iconPosition === "end"
            ? "right"
            : "left"
        }: 10px;
    `
        : ""}
  }
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 26px;
    height: 26px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 20px;
    height: 20px;
    margin: 3px;
    border: 3px solid transparent;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  &.primary,
  &.danger,
  &.blue {
    .lds-ring div {
      border-color: var(--white) transparent transparent transparent;
    }
  }
  &.secondary,
  &.outline {
    .lds-ring div {
      border-color: var(--darkBlue) transparent transparent transparent;
    }
  }
  &.secondary_blue {
    .lds-ring div {
      border-color: var(--purple2) transparent transparent transparent;
    }
    &:hover {
      .lds-ring div {
        border-color: var(--white) transparent transparent transparent;
      }
    }
  }
`;

export default Wrapper;
