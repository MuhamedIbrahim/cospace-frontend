import {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
} from "react";
import styled from "styled-components";

export type InputOptionGeneralType = {
  label: string;
  value: string;
  icon?: ReactElement;
};

export type InputGeneralType = {
  label?: string | ReactNode;
  labelNote?: string;
  props?: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
  error?: string;
  note?: string;
  dependantConditions?: DependantConditionsType[];
  setDependantValues?: (name: string, value: string) => void;
  allInputsValues?: any;
  disabled?: boolean;
};

export type InputRadioType = {
  currentValue: string;
  options: InputOptionGeneralType[];
  shape?: "normal" | "with_icon";
};

export type InputCheckboxType = {
  topLabel?: string;
  checkboxStyle: "checkbox" | "switcher";
};

export type InputFieldType = {
  type: "text" | "number" | "textarea" | "password" | "date" | "time" | "email";
  icon?: ReactElement;
  iconPosition?: "start" | "end";
  iconBorder?: boolean;
};

export type SelectOption = {
  label: string;
  value: string;
  labelComponent?: ReactNode;
  isDisabled?: boolean;
  dependsOn?: {
    or?: {
      name: string;
      value: string;
    }[];
    and?: {
      name: string;
      value: string;
    }[];
  };
};

export type InputSelectType = {
  options: { label?: string; options: SelectOption[] }[];
  isMulti?: boolean;
  isLoading?: boolean;
};

export type DependantConditionsType = {
  name: string;
  value: {
    [name: string]: any;
  };
};

export type InputFileType = {
  onChangeFiles: (files: { id: number; file: File }[]) => void;
  defaultFiles: {
    id: number;
    src: string;
  }[];
  watchedFiles: {
    id: number;
    file: File;
  }[];
  onAddToDeletedFiles?: (ids: number) => void;
};

export const InputWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  .field_label {
    font-size: 15px;
    font-weight: 500;
    color: var(--darkGrey2);
    span {
      color: var(--lightGrey5);
      font-weight: 400;
    }
  }
  .field_note {
    margin-top: 0px;
    p {
      margin: 0;
      font-size: 15px;
      &.error {
        color: var(--red);
      }
      &.note {
        color: var(--lightGrey6);
      }
    }
  }
`;

export const onChangeInputHandler = (
  e: ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>,
  onChange?: ChangeEventHandler<
    HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
  >,
  dependantConditions?: DependantConditionsType[],
  setDependantValues?: (name: string, value: string) => void
) => {
  if (onChange) onChange(e);
  if (dependantConditions && setDependantValues) {
    dependantConditions.forEach((condition) => {
      //check if the dependant input needs to be hidden/shown or to be value changed
      let isHidingInputFlag = false;
      Object.values(condition.value).forEach((value) => {
        if (value === "hide_input" || value === "show_input")
          isHidingInputFlag = true;
      });
      if (!isHidingInputFlag) {
        setDependantValues(
          condition.name,
          condition.value.any
            ? condition.value.any
            : condition.value[
                e.target.type === "checkbox" || e.target.type === "radio"
                  ? (e.target as HTMLInputElement).checked.toString()
                  : e.target.value.toString()
              ]
        );
      }
    });
  }
};
