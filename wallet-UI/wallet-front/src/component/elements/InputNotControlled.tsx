import React, {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Control, FieldError, FieldValues, Path } from "react-hook-form";

export type InputNotControlledProps<Type extends FieldValues> = {
  label?: string;
  size?: "small" | "regular" | "large" | undefined;
  placeholder?: string;
  default_phone?: string | any;
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
    | "time";
  svgIcon?: ReactNode;
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
  name: Path<Type>;
  control: Control<Type, any>;
  hideHelperText?: boolean;
  nativeProps?: React.MutableRefObject<HTMLInputElement | null>;
};

function InputNotControlled<Type extends FieldValues>(
  props: InputNotControlledProps<Type>
) {
  const [rows, setRows] = useState(1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    const currentRef = inputRef.current;
    const listener = (evt: any) => {
      !/(^\d*\.?\d*$)|(Backspace|Control|Meta)/.test(evt.key) &&
        evt.preventDefault();
    };

    if (
      props.type === "number" &&
      currentRef &&
      navigator.userAgent.indexOf("Firefox") !== -1
    ) {
      currentRef.addEventListener("keydown", listener);
    }

    return () => {
      currentRef?.removeEventListener("keydown", listener);
    };
  }, [props.type]);

  const checkFieldOverflow = useCallback(
    (e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const inputElement = inputRef.current;
      if (
        inputElement &&
        inputElement.scrollHeight > inputElement.clientHeight + 5 &&
        props.dynamicRows! > rows
      )
        setRows(rows + 1);
      else if (e?.target.value.length === 0) setRows(1);
    },
    [rows, props.dynamicRows]
  );

  useEffect(() => {
    if (rows > 1 && props.dynamicRows! > rows)
      setTimeout(() => checkFieldOverflow(), 0);
  }, [rows, props.dynamicRows, checkFieldOverflow]);

  const getHeight = {
    small: "h-[92px]",
    regular: "h-[100px]",
    large: "h-[116px]",
  }[props?.size || "small"];

  const getInputClassName = () => {
    const baseClassName =
      "block w-full pr-8 px-4 py-2 border rounded-lg focus:outline-none focus:border-primary-700 ";

    const sizeClassName = {
      small: "h-[36px]",
      regular: "h-[44px]",
      large: "h-[52px]",
    }[props?.size || "small"];

    if (props.success) {
      return `${baseClassName} ${sizeClassName} text-green-600 border-green-500 bg-green-100 focus:text-green-700`;
    } else if (props.errors) {
      return `${baseClassName} ${sizeClassName} text-red-600 border-red-500 bg-red-100 focus:text-red-700`;
    } else if (props.disabled) {
      return `${baseClassName} ${sizeClassName} cursor-not-allowed text-gray-900 border-gray-300 bg-gray-50 opacity-50`;
    } else {
      return `${baseClassName} ${sizeClassName} focus:text-gray-900 bg-gray-50 text-gray-900 border-gray-300`;
    }
  };

  return (
    <div className={`flex flex-col justify-between ${getHeight}`}>
      <label
        htmlFor="search"
        className="mb-2 text-gray-900 text-Body-OneLine/14/Regular"
      >
        {props.label}
        {props.isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute top-0 bottom-0 right-0 flex items-center text-gray-500 ps-3 pointer-events-none">
          {props.svgIcon}
        </div>
        <input
          {...props.nativeProps}
          ref={inputRef}
          defaultValue={props.default_phone}
          type={props.type}
          className={getInputClassName()}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={(e) => {
            const value =
              props.type === "number" ? Number(e.target.value) : e.target.value;
            // Perform any additional logic if needed
            if (props.onChange) props.onChange(value);
            // if (props.nativeProps?.onChange) props.nativeProps.onChange(e);
            if (props.dynamicRows) checkFieldOverflow(e);
          }}
        />
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
  );
}

export default InputNotControlled;
