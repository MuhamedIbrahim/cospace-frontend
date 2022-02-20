import { components } from "react-select";
import { OptionWrapper } from "./style";

export const Control = ({ children, ...rest }: any) => (
  <components.Control
    {...rest}
    className={`select_control ${
      rest.menuIsOpen ? "select_control--open" : ""
    }`}
  >
    {children}
  </components.Control>
);

export const Menu = ({ children, ...rest }: any) => (
  <components.Menu {...rest} className={`select_menu`}>
    {children}
  </components.Menu>
);

export const GroupHeading = ({ children, ...rest }: any) =>
  children ? (
    <components.GroupHeading {...rest} className={`select_menu__heading`}>
      {children}
    </components.GroupHeading>
  ) : null;

export const NoOptionsMessage =
  () =>
  ({ children, ...rest }: any) =>
    (
      <components.NoOptionsMessage {...rest}>
        <p style={{ margin: 0, padding: "7px 5px" }}>No options</p>
      </components.NoOptionsMessage>
    );

export const LoadingMessage =
  () =>
  ({ children, ...rest }: any) =>
    (
      <components.NoOptionsMessage {...rest}>
        <p style={{ margin: 0, padding: "7px 5px" }}>Loading...</p>
      </components.NoOptionsMessage>
    );

export const Option = ({ children, ...rest }: any) => {
  return (
    <OptionWrapper {...rest}>
      {rest.data.labelComponent ? rest.data.labelComponent : children}
    </OptionWrapper>
  );
};
