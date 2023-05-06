import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SearchBar } from "../../Shared/SearchBar";
const quickLinks = [
  {
    name: "Love",
  },
  {
    name: "Wedding",
  },
  {
    name: "Nature",
  },
  {
    name: "Sports",
  },
  {
    name: "Food",
  },
  {
    name: "Camera",
  },
  {
    name: "Business",
  },
  { name: "Technology" },
  { name: "Software" },
  { name: "Fitness" },
  { name: "Yoga" },
];
export const HomePageHeroContent = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/search?q=" + search);
  };
  return (
    <div className="relative z-20  font-medium">
      <h1 className="mb-7 text-[44px] text-white">
        Make content with our own culture. It’s free now!
      </h1>

      {/* search bar */}
      <SearchBar
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onSearch={handleSearch}
      />

      {/*Quick access*/}

      <div className="text-white mx-auto my-5 text-center">
        <span className="mr-1 text-sm">Quick Access:</span>
        {quickLinks.map((link, i) => {
          return (
            <Link to={"/"} className="text-sm" key={link.name}>
              {link.name}
              {quickLinks.length - 1 !== i && ","}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
