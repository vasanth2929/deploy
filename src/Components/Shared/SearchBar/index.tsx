import clsx from "clsx";
import { isEqual } from "lodash";
import React, { ChangeEvent, FC, memo, useState } from "react";
import Select from "react-select";

const _SearchBar: FC<{
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onSearch: () => void;
  className?: string;
}> = ({ onChange, value, onSearch, className }) => {
  const options = [
    { label: "Photos", value: "Photos" },
    { label: "Videos", value: "Videos" },
  ];
  const [category, setCategory] = useState({
    label: "Photos",
    value: "Photos",
  });
  const handleCategoryChange = (val: { label: string; value: string }) => {
    if (!isEqual(category, val)) {
      setCategory(val);
    }
  };
  return (
    <form
      className={clsx(
        "bg-white w-[720px] mx-auto flex p-2 rounded items-center justify-between",
        className
      )}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <div className="flex items-center flex-1">
        <Select
          isSearchable={false}
          classNamePrefix={"category"}
          className="category-select"
          value={category}
          onChange={handleCategoryChange}
          options={options}
        />

        <input
          className="ml-4 border-none outline-none text-base flex-1"
          placeholder="Search Photos"
          value={value}
          onChange={onChange}
        />
      </div>

      <button type="submit">
        <span
          onClick={onSearch}
          className="material-symbols-outlined text-xl ml-1 cursor-pointer"
        >
          search
        </span>
      </button>
    </form>
  );
};

export const SearchBar = memo(_SearchBar);
