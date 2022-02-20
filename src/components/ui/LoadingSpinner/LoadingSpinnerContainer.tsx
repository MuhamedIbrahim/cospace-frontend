import { ReactNode } from "react";
import { CSSProperties } from "styled-components";
import { LoadingSpinnerContainerStyle } from "./style";

const LoadingSpinnerContainer = ({
  children,
  cssStyle,
}: {
  children: ReactNode;
  cssStyle?: CSSProperties;
}) => {
  return (
    <LoadingSpinnerContainerStyle style={cssStyle}>
      {children}
    </LoadingSpinnerContainerStyle>
  );
};

export default LoadingSpinnerContainer;
