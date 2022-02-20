import styled from "styled-components";

const InputFieldStyle = styled.div<{
  hasIcon?: boolean;
  iconPosition?: "start" | "end";
  iconBorder?: boolean;
  hasError?: boolean;
  inputOnFocus?: boolean;
  disabled?: boolean;
}>`
  position: relative;
  background-color: #fff;
  color: var(--lightGrey6);
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  display: flex;
  align-items: center;
  border: 1px solid
    var(
      --${(props) => (props.inputOnFocus ? "purple" : props.hasError ? "red" : "lightGrey5")}
    );
  transition: border-color 0.2s ease-in-out;
  border-radius: 3px;
  ${(props) =>
    props.disabled
      ? ""
      : `&:hover {
    border-color: var(
      --${props.inputOnFocus ? "purple" : "darkBlue"}
    );
  }`}
  input,
  textarea {
    font-size: 16px;
    background: none;
    outline: none;
    border: none;
    width: 100%;
    height: 55px;
    padding: 15px;
    line-height: inherit;
    flex: 1;
    :disabled {
      cursor: not-allowed;
    }
  }
  textarea {
    resize: none;
    min-height: 100px;
  }
  span {
    width: fit-content;
    height: 55px;
    min-width: 55px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${(props) =>
      props.iconBorder
        ? `
    border-${
      props.theme.lang === "ar"
        ? props.iconPosition === "start"
          ? "left"
          : "right"
        : props.iconPosition === "start"
        ? "right"
        : "left"
    }: 1px solid var(--lightGrey4);
    `
        : ""}
    padding: 10px;
    cursor: default;
    font-size: 18px;
  }
  input[type="date"]::-webkit-inner-spin-button,
  input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
  }
`;

export default InputFieldStyle;
