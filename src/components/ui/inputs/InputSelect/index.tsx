import { ChangeEvent, useMemo } from "react";
import { RiArrowDownSLine } from "react-icons/ri";
import Select from "react-select";
import InputContainer from "../InputContainer";
import {
  InputGeneralType,
  InputSelectType,
  onChangeInputHandler,
  SelectOption,
} from "../utils";
import {
  Control,
  Menu,
  GroupHeading,
  NoOptionsMessage,
  LoadingMessage,
  Option,
} from "./components";
import Wrapper from "./style";
import { resolveObjectKey } from "./utils";

const InputSelect = ({
  label,
  note,
  error,
  dependantConditions,
  setDependantValues,
  props,
  options,
  allInputsValues,
  isMulti = false,
  isLoading = false,
  disabled = false,
}: InputSelectType & InputGeneralType) => {
  const defaultValue = useMemo(() => {
    if (props?.value) {
      let groupIndex = -1;
      let optionIndex = -1;
      const multiOptions: string[] = [];
      options.forEach((group: any, grpIndx: number) => {
        if (group.options) {
          group.options.forEach((option: any, optIndx: number) => {
            if (isMulti) {
              if ((props.value as string[]).includes(option.value))
                multiOptions.push(option);
            } else {
              if (option.value === props.value) {
                groupIndex = grpIndx;
                optionIndex = optIndx;
              }
            }
          });
        } else {
          if (isMulti) {
            if ((props.value as string[]).includes(group.value))
              multiOptions.push(group);
          } else {
            if (group.value === props.value) optionIndex = grpIndx;
          }
        }
      });
      if (isMulti) return multiOptions.length > 0 ? multiOptions : "no_option";
      if (groupIndex === -1 && optionIndex !== -1) return options[optionIndex];
      else if (groupIndex !== -1 && optionIndex !== -1)
        return options[groupIndex].options[optionIndex];
      else return "no_option";
    } else return "no_option";
  }, [options, props, isMulti]);

  const optionsToSelect = useMemo<
    { label: string; options: SelectOption[] }[]
  >(() => {
    const viewableOptions: { label: string; options: SelectOption[] }[] = [];
    options.forEach((group, index) => {
      group.options.forEach((option) => {
        let isOptionViewable = true;
        if (option.dependsOn) {
          let orCondition = false;
          let andCondition = true;
          if (option.dependsOn.or) {
            option.dependsOn.or.forEach((condition) => {
              if (
                (resolveObjectKey(allInputsValues, condition.name) || null) ===
                condition.value
              )
                orCondition = true;
            });
          }
          if (option.dependsOn.and) {
            option.dependsOn.and.forEach((condition) => {
              if (
                (resolveObjectKey(allInputsValues, condition.name) || null) !==
                condition.value
              )
                andCondition = false;
            });
          }
          isOptionViewable = orCondition && andCondition;
        }
        if (isOptionViewable) {
          if (!viewableOptions[index])
            viewableOptions[index] = { label: group.label || "", options: [] };
          viewableOptions[index].options.push(option);
        }
      });
    });
    return viewableOptions.filter((group) => group);
  }, [options, allInputsValues]);

  return (
    <InputContainer label={label} note={note} error={error}>
      <Wrapper hasError={error ? true : false} style={{ ...props?.style }}>
        <Select
          isDisabled={disabled}
          options={optionsToSelect}
          defaultInputValue=""
          value={defaultValue}
          isMulti={isMulti}
          isLoading={isLoading}
          placeholder={props?.placeholder ? props.placeholder : "Select..."}
          onChange={(e: any) =>
            onChangeInputHandler(
              {
                target: {
                  name: props?.name || "",
                  value: isMulti ? e.map((el: any) => el.value) : e.value,
                },
              } as ChangeEvent<HTMLSelectElement>,
              props?.onChange,
              dependantConditions,
              setDependantValues
            )
          }
          components={{
            DropdownIndicator: () => (
              <span className="dropdown_indicator">
                <RiArrowDownSLine style={{ color: "var(--darkGrey)" }} />
              </span>
            ),
            IndicatorSeparator: () => null,
            Control,
            Menu,
            GroupHeading,
            NoOptionsMessage: NoOptionsMessage(),
            LoadingMessage: LoadingMessage(),
            Option,
          }}
        />
      </Wrapper>
    </InputContainer>
  );
};

export default InputSelect;
