import clsx from "clsx";
import React from "react";
import { AssetTabItemProps } from "./types";
export const AssetTab = (
  props: AssetTabItemProps & {
    activeAccessor: string;
    onClick: (accessor: string) => void;
  }
) => {
  const { accessor, name, Icon, activeAccessor, onClick, value } = props;
  const isActive = accessor === activeAccessor;
  return (
    <button
      className={clsx(
        "mr-5 py-3 px-5 flex items-center rounded-lg cursor-pointer bg-white shadow border",
        { "bg-[#189EFF]": isActive }
      )}
      onClick={() => onClick(accessor)}
    >
      {Icon && (
        <div
          className={clsx("p-2 rounded bg-[#e8f6fe]  mr-2", {
            "bg-[#47b0fb]": isActive,
          })}
        >
          <Icon color={isActive ? "white" : "#094785"} size={20} />
        </div>
      )}
      <span
        className={clsx({ "text-white": isActive, "font-medium": isActive })}
      >
        {name} ({value})
      </span>
    </button>
  );
};
