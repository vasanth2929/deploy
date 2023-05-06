import { IconType } from "react-icons/lib";

export type AssetTabItemProps = {
  name: string;
  accessor: string;
  Icon?: IconType;
  value: number;
};

export type AssetTabsProps = {
  tabs: AssetTabItemProps[];
  activeAccessor: string;
  onClick: (accessor: string) => void;
};
