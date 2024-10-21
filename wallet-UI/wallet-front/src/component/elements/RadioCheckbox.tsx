import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";

export type RadioCheckboxProps<Type extends FieldValues> = {
  label?: string;
  checked?: string;
  isRequired?: boolean;
  name: Path<Type>;
  control: Control<Type, any>;
  errors?: FieldError;
  options: GenderOption[];
  defaultValue?: any;
  editable?: boolean;
  disabled?: boolean;
};

type GenderOption = {
  label: string;
  value: string;
};

function RadioCheckbox<Type extends FieldValues>(
  props: RadioCheckboxProps<Type>
) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field }) => (
        <div className="mb-4 h-[80px] w-[190px]">
          <label className="block text-gray-900 text-BodyText/14/Medium mb-2">
            {props.label}
            {props.isRequired && <span className="text-red-500">*</span>}
          </label>

          {props.options.map((option, index) => (
            <label key={index} className="inline-flex items-center">
              <input
                type="radio"
                {...field}
                value={option.value}
                checked={field.value === option.value}
                className=" text-primary-600 h-5 w-5 ml-1"
                disabled={
                  props.disabled
                    ? props.disabled
                    : props.editable
                    ? false
                    : props.defaultValue
                    ? true
                    : false
                }
              />
              <span className="ml-4 text-BodyText/14/Regular">
                {option.label}
              </span>
            </label>
          ))}

          {props.errors ? (
            <p className="text-Body-OneLine/14/Regular text-red-600">
              {props.errors.message}
            </p>
          ) : (
            <span className="invisible">invisible</span>
          )}
        </div>
      )}
    />
  );
}

export default RadioCheckbox;
