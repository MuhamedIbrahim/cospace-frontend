import { MouseEventHandler, ReactElement } from "react";
import { CSSProperties } from "styled-components";

export type ButtonGeneralType = {
  icon?: ReactElement;
  iconPosition?: "start" | "end";
  label?: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  extraStyle?: CSSProperties;
};

export type ButtonStyleType = {
  styleType:
    | "primary"
    | "secondary"
    | "blue"
    | "danger"
    | "secondary_blue"
    | "outline"
    | "icon";
  size: "xl" | "lg" | "md";
  fullRadius?: boolean;
};

export type ButtonSortType =
  | {
      buttonType: "submit" | "reset";
      url?: never;
      target?: never;
      onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    }
  | {
      buttonType: "button";
      url?: never;
      target?: never;
      onClick: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
    }
  | {
      buttonType: "link";
      url: string;
      target?: never;
      onClick?: never;
    }
  | {
      buttonType: "link" | "outsideLink";
      url: string;
      target: "_blank" | "_self" | "_parent" | "_top";
      onClick?: never;
    };

export type ButtonType = ButtonStyleType & ButtonGeneralType & ButtonSortType;
