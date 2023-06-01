import React from "react";
import { useFormContext } from "react-hook-form";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
};

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="">
      <label htmlFor={name} className="block text-ct-blue-600 mb-1 mt-5">
        {label}
      </label>
      <input
        type={type}
        placeholder=" "
        className="p-input"
        {...register(name, { valueAsNumber: type === "number" ? true : false })}
      />
      {errors[name] && (
        <span className="text-red-500 text-xs pt-1 block">
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;
