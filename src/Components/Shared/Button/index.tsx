import React, { FC } from "react";
import { Button as Btn, ButtonVariant } from "@mantine/core";
import clsx from "clsx";
export const Button: FC<{
  text: string;
  variant?: ButtonVariant;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  color?: "primary" | "secondary";
  disabled?: boolean;
  isLoading?: boolean;
}> = ({
  text,
  variant = "filled",
  onClick,
  color = "primary",
  disabled,
  isLoading,
}) => {
  return (
    <Btn
      loading={isLoading}
      className={clsx({
        "bg-[#189eff]": color == "primary" && variant !== "outline",
        "text-[#4B3A5A] border-gray-200 font-medium": color === "secondary",
      })}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Btn>
  );
};
