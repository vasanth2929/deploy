import React from "react";
import { AssetTab } from "./AssetTab";
import { AssetTabsProps } from "./types";

export const AssetTabs = ({
  tabs,
  activeAccessor,
  onClick,
}: AssetTabsProps) => {
  return (
    <div className="flex">
      {tabs.map((t) => {
        return (
          <AssetTab
            key={t.name}
            {...t}
            activeAccessor={activeAccessor}
            onClick={onClick}
          />
        );
      })}
    </div>
  );
};
