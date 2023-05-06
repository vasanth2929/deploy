import { InputWrapper, Input as I, PasswordInput } from "@mantine/core";
import React, { FC } from "react";

export type InputProps = {
  label?: string;
  placholder?: string;
  value: string;
  onChange: any;
  type?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
};
export const Input: FC<InputProps> = ({
  label,
  placholder,
  value,
  onChange,
  type = "text",
  required,
  error,
  disabled = false,
}) => {
  return (
    <InputWrapper
      label={label}
      labelProps={{ className: "input-label" }}
      required={required}
      error={error}
    >
      {type === "password" && (
        <PasswordInput
          id={`input-${label}`}
          placeholder={placholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
      {type !== "password" && (
        <I
          id={`input-${label}`}
          placeholder={placholder}
          value={value}
          onChange={onChange}
          type={type}
          disabled={disabled}
        />
      )}
    </InputWrapper>
  );
};
