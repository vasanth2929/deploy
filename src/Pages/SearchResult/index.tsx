import {
  Button,
  Menu,
  MenuItem,
  MenuLabel,
  Radio,
  RadioGroup,
  SegmentedControl,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { BiSort } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import { Masonry } from "../../Components/Masonary";
import { Navbar } from "../../Components/Shared/Navbar";
import styles from "./search.module.css";

export const SearchResult = () => {
  const params = useSearchParams()[0];
  const [search, setSearch] = useState(params.get("q") || "");
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [value, setValue] = useState("png");
  useEffect(() => {
    setSearch(params.get("q") || "");
  }, [params.get("q")]);
  return (
    <div>
      <Navbar showSearchBar={true} />
      <div className="px-4">
        <div className="my-12 flex items-center">
          <h3 className="font-medium text-3xl">{search}</h3>
          <SegmentedControl
            className="ml-5"
            classNames={{
              label: styles.label,
              labelActive: styles.labelActive,
            }}
            data={[
              { label: "JPEG", value: "jpeg" },
              { label: "JPG", value: "jpg" },
              { label: "PNG", value: "png" },
              { label: "SVG", value: "svg" },
            ]}
            value={value}
            onChange={setValue}
          />

          <Menu
            className="sssssssss"
            style={{ width: "150px" }}
            classNames={{ root: "sort-menu" }}
            control={
              <Button
                leftIcon={<BiSort />}
                variant="outline"
                onClick={() => {
                  setSortDropdownOpen(true);
                }}
              >
                Sort
              </Button>
            }
            trigger="click"
          >
            <RadioGroup
              classNames={{
                root: "sort-radio",
              }}
            >
              <Radio value="recent" label="Recent" />

              <Radio value="popular" label="Popular" />

              <Radio value="quality" label="Quality" />
            </RadioGroup>
          </Menu>
        </div>
      </div>

      {search && <Masonry search={search} filter={value} />}
    </div>
  );
};
