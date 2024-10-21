import { ReactNode, useEffect, useState } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import useAddComma from "../../hooks/useAddComma";
import { toast } from "react-toastify";

export type InputComponentProps<Type extends FieldValues> = {
  label?: string;
  itemsLtr?: boolean;
  size?: "small" | "regular" | "large" | "verySmall" | undefined;
  direction?: "ltr" | "rtl";
  content?: "center";
  placeholder?: string;
  defaultValue?: any;
  type?:
    | "button"
    | "checkbox"
    | "date"
    | "email"
    | "number"
    | "password"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "file";
  svgIcon?: ReactNode;
  hasLeftIcon?: boolean;
  leftIcon?: any;
  helperText?: string | ReactNode;
  helperTextCenter?: boolean;
  success?: boolean;
  errors?: FieldError;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  value?: any;
  isRequired?: boolean;
  dynamicRows?: number;
  sizeClassName?: any;
  name: Path<Type> | any;
  control: Control<Type, any>;
  hideHelperText?: boolean;
  nativeProps?: any;
  inputRef?: any;
  maxLength?: number;
  fixNumber?: string;
  editable?: boolean;
  dataFromOcr?: any;
  fromOCR?: any;
  inputType?: any;
  paddingStart?: any;
  addedComma?: any;
  minValue?: any;
  cancelError?: any;
  maxValue?: number; // Optional property for maximum value
  addedLabel?: any;
  labelFlex?: any;
};

function convertPersianNumbersToEnglish(string: any) {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  for (let i = 0; i < 10; i++) {
    string = string.replace(
      new RegExp(persianNumbers[i], "g"),
      englishNumbers[i]
    );
  }
  return string;
}

function InputComponent<Type extends FieldValues>(
  props: InputComponentProps<Type>
) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(props.defaultValue || "");

  useEffect(() => {
    if (props.defaultValue) {
      setInputValue(props.defaultValue);
    } else if (props.dataFromOcr) {
      setInputValue(props.fromOCR);
    } else {
      setInputValue("");
    }
  }, [props.defaultValue, props.dataFromOcr, props.fromOCR]);

  const getSvgClassName = () => {
    if (props.errors) {
      return "text-red-700";
    } else if (isFocused) {
      return "text-primary-700";
    } else if (props.disabled) {
      return "text-gray-400";
    } else {
      return "text-gray-700";
    }
  };

  const getHeight = {
    verySmall: "h-[30px]",
    small: "h-[82px]",
    regular: "h-[90px]",
    large: "h-[116px]",
  }[props?.size || "small"];

  const getInputClassName = () => {
    const baseClassName = `block w-full px-4 ${props.fixNumber} ${
      props.content ? "text-center" : ""
    } ${props.paddingStart ? props.paddingStart : "pr-8"}  py-2 ${
      props.inputType ? "border-b" : "border rounded-lg"
    }  focus:outline-none focus:border-primary-700  `;

    const sizeClassName = {
      verySmall: "h-[30px]",
      small: "h-[36px]",
      regular: "h-[44px]",
      large: "h-[52px]",
    }[props?.size || "small"];

    if (props.success) {
      return `${baseClassName} ${sizeClassName} text-green-600 border-green-500 bg-green-100 focus:text-green-700`;
    } else if (props.errors) {
      return `${baseClassName} ${sizeClassName} text-red-600 border-red-500 bg-red-100 focus:text-red-700`;
    } else if (
      props.disabled ||
      (props.editable === true && props.defaultValue && props.editable)
    ) {
      return `${baseClassName} ${sizeClassName} cursor-not-allowed text-gray-900 border-gray-300 bg-gray-50 opacity-50`;
    } else {
      return `${baseClassName} ${sizeClassName} focus:text-gray-900 ${
        props.inputType ? "" : "bg-gray-50"
      }  text-gray-900 border-gray-300`;
    }
  };

  const addComma = useAddComma();

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <div
          className={`flex ${
            props.labelFlex ? "flex-row items-center " : "flex-col"
          } 
        ${getHeight}
       `}
        >
          <label
            htmlFor="search"
            className={` ${
              props.labelFlex ? "mb-0 flex" : "mb-[4px]"
            }  text-gray-900 text-Body-OneLine/18/Regular`}
          >
            {props.label}{" "}
            <span className={`${props.labelFlex ? "ml-2" : ""}`}>
              {props.labelFlex ? ":" : ""}{" "}
            </span>
            {props.isRequired && <span className="text-red-500">*</span>}{" "}
            <span>{props.addedLabel}</span>
          </label>
          <div className={"relative flex items-center justify-between"}>
            {props.itemsLtr ? (
              <>
                {props.hasLeftIcon && (
                  <div
                    className={`absolute top-0 bottom-0 right-0 flex items-center ps-3 pointer-events-none ${getSvgClassName()}`}
                  >
                    {props.leftIcon}
                  </div>
                )}
              </>
            ) : (
              <>
                <div
                  className={`absolute top-0 bottom-0 right-0 flex items-center ps-3 pointer-events-none ${getSvgClassName()}`}
                >
                  {props.svgIcon}
                </div>
              </>
            )}

            <input
              dir={props.direction || "rtl"}
              disabled={
                props.defaultValue && props.editable ? true : props.disabled
              }
              type={props.type}
              className={getInputClassName()}
              placeholder={props.placeholder}
              value={inputValue}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => {
                let value: any = e.target.value;
                let value2: any = e.target.value.replace(/[^0-9]/g, "");
                if (props.addedComma) {
                  if (value) {
                    value = value.replace(/[^0-9]/g, "");
                    value = addComma(value);
                  }
                } else if (props.type === "number") {
                  value = value.replace(/[^0-9]/g, "");
                  value = value ? Number(value) : "";
                }

                value = convertPersianNumbersToEnglish(value);

                if (props.type === "number") {
                  value = Number(value.replace(/[^0-9]/g, ""));
                }

                if (props.maxValue !== undefined && value2 > props.maxValue) {
                  value = addComma(props.maxValue);
                  toast.warning("پیش پرداخت نمیتواند بیش از کل مبلغ وام باشد.");
                }

                if (
                  props.maxLength &&
                  value.toString()?.length > props.maxLength
                ) {
                  return;
                }

                setInputValue(value);
                field.onChange(value);
                if (props.onChange) props.onChange(value);
              }}
              onKeyPress={(e) => {
                if (
                  props.type === "tel" &&
                  !/^\d$/.test(e.key) &&
                  e.key !== "Enter" &&
                  e.keyCode !== 13
                ) {
                  e.preventDefault();
                }
              }}
              ref={props.inputRef}
              maxLength={props.maxLength}
            />
            {props.itemsLtr ? (
              <>
                <div
                  className={`absolute top-0 bottom-0 left-0 flex items-center pe-3 pointer-events-none ${getSvgClassName()}`}
                >
                  {props.svgIcon}
                </div>
              </>
            ) : (
              <>
                {props.hasLeftIcon && (
                  <div
                    className={`absolute top-0 bottom-0 left-0 flex items-center pe-3 pointer-events-none ${getSvgClassName()}`}
                  >
                    {props.leftIcon}
                  </div>
                )}
              </>
            )}
          </div>
          {props.errors && props.errors.message ? (
            <p className={`text-Body-OneLine/14/Regular text-red-600`}>
              {props.errors.message}
            </p>
          ) : (
            <div
              className={`${
                props.helperTextCenter && "flex items-center justify-center"
              }
              "text-Body-OneLine/14/Regular text-gray-500"`}
            >
              {props.helperText ? (
                props.helperText
              ) : (
                <span className="invisible">invisible</span>
              )}
            </div>
          )}
        </div>
      )}
    />
  );
}

export default InputComponent;
