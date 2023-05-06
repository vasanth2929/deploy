import clsx from "clsx";
import React from "react";

export const SavedCollection = ({
  label = "Photos",
  className = "",
  data = [],
}) => {
  const [first, second, third] = data;
  return (
    <div className={clsx("border rounded h-[420px] p-5 shadow", className)}>
      <div className="flex h-[350px] gap-2">
        <img
          className="flex-1 w-3/4 object-cover h-full rounded-l-md border"
          src={first?.src}
        />

        <div className="flex flex-col w-1/4  gap-2">
          <img
            className="flex-1 object-cover h-full rounded-r-md border"
            src={second?.src}
          />
          <img
            className="flex-1 object-cover h-full rounded-r-md border"
            src={third?.src}
          />
        </div>
      </div>
      <p className="font-semibold text-xl mt-2">{label}</p>
    </div>
  );
};
