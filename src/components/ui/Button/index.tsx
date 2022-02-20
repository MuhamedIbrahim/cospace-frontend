import { Link } from "react-router-dom";
import { ButtonType } from "./utils";
import Wrapper from "./styles";

const Button = ({
  buttonType,
  styleType,
  size,
  icon,
  label,
  iconPosition = "end",
  fullRadius = false,
  url,
  target,
  onClick,
  className = "",
  disabled = false,
  isLoading = false,
  extraStyle,
}: ButtonType) => {
  return (
    <Wrapper
      {...(buttonType === "link" || buttonType === "outsideLink"
        ? {
            as: buttonType === "outsideLink" ? "a" : Link,
            [buttonType === "outsideLink" ? "href" : "to"]: url,
            target,
          }
        : { type: buttonType, disabled: disabled })}
      {...(buttonType === "outsideLink" ? { rel: "noreferrer" } : {})}
      {...(onClick ? { onClick } : {})}
      className={`${styleType} ${size}${className ? ` ${className}` : ""}`}
      $fullRadius={fullRadius}
      $hasLabelIcon={label && icon ? "both" : "single"}
      $iconOnly={icon && !label ? true : false}
      $iconPosition={iconPosition}
      style={{ ...extraStyle }}
    >
      {isLoading ? (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          {iconPosition === "start" && icon}
          {label && <i>{label}</i>}
          {iconPosition === "end" && icon}
        </>
      )}
    </Wrapper>
  );
};

export default Button;
