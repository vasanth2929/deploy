import clsx from "clsx";
import React, { FC, useState } from "react";
import "./index.css";

export const Hero: FC<{
  children: React.ReactNode;
  className?: string;
  bg?: string;
}> = ({
  children,
  className = "flex justify-center items-center",
  bg = "https://images.pexels.com/photos/355747/pexels-photo-355747.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
}) => {
  return (
    <div className={clsx("hero relative h-[300px]", className)}>
      <img className="max-h-[300px] w-full object-cover absolute" src={bg} />

      <div className="bg-black opacity-75 absolute w-full top-0 bottom-0"></div>

      {children}
    </div>
  );
};
