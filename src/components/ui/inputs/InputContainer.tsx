import { ReactNode } from "react";
import { InputGeneralType, InputWrapper } from "./utils";

const InputContainer = ({
  label,
  labelNote,
  note,
  error,
  children,
}: InputGeneralType & { children: ReactNode }) => {
  return (
    <InputWrapper>
      {label && (
        <label className="field_label">
          {label}
          {labelNote && (
            <>
              {" "}
              <span>{labelNote}</span>
            </>
          )}
        </label>
      )}
      {children}
      {(note || error) && (
        <div className="field_note">
          <p className={error ? "error" : "note"}>{note || error}</p>
        </div>
      )}
    </InputWrapper>
  );
};

export default InputContainer;
