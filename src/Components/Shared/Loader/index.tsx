import { Loader } from "@mantine/core";
import clsx from "clsx";
import React, { FC } from "react";

export const AppLoader: FC<{ isFullscreen?: boolean; className?: string }> = ({
  isFullscreen,
  className = "",
}) => {
  return (
    <div
      className={clsx("w-full flex justify-center items-center", className, {
        "h-screen": isFullscreen,
      })}
    >
      <Loader />
    </div>
  );
};
