import {
  InputFieldType,
  InputGeneralType,
  onChangeInputHandler,
} from "../utils";
import InputContainer from "../InputContainer";
import InputFieldStyle from "./style";
import { useState } from "react";

const InputField = ({
  label,
  labelNote,
  props,
  dependantConditions,
  setDependantValues,
  type,
  icon,
  iconPosition = "start",
  iconBorder = false,
  error,
  note,
  disabled = false,
}: InputGeneralType & InputFieldType) => {
  const [inputOnFocus, setInputOnFocus] = useState<boolean>(false);

  return (
    <InputContainer
      label={label}
      labelNote={labelNote}
      error={error}
      note={note}
    >
      <InputFieldStyle
        hasIcon={icon ? true : false}
        iconPosition={iconPosition}
        iconBorder={iconBorder}
        hasError={error ? true : false}
        inputOnFocus={inputOnFocus}
        disabled={disabled}
      >
        {icon && iconPosition === "start" && <span>{icon}</span>}
        {type === "textarea" ? (
          <textarea
            {...props}
            onChange={(e) =>
              onChangeInputHandler(
                e,
                props?.onChange,
                dependantConditions,
                setDependantValues
              )
            }
            onFocus={() => setInputOnFocus(true)}
            onBlur={() => setInputOnFocus(false)}
            disabled={disabled}
          />
        ) : (
          <input
            type={type}
            {...props}
            onChange={(e) =>
              onChangeInputHandler(
                e,
                props?.onChange,
                dependantConditions,
                setDependantValues
              )
            }
            onFocus={() => setInputOnFocus(true)}
            onBlur={() => setInputOnFocus(false)}
            disabled={disabled}
          />
        )}
        {icon && iconPosition === "end" && <span>{icon}</span>}
      </InputFieldStyle>
    </InputContainer>
  );
};

export default InputField;
