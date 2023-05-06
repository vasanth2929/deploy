import React, { memo } from "react";
import { Hero } from "../../Components/Shared/Hero";
import { Masonry } from "../../Components/Masonary";
import { Navbar } from "../../Components/Shared/Navbar";
import { HomePageHeroContent } from "../../Components/Home/HeroSection";
import { Loader } from "@mantine/core";
import { useQuery } from "react-query";
import { getAssets } from "../../services/assets.service";
import Footer from "../../Components/Shared/Footer";

export const Photos = memo(() => {

  const { data, isLoading } = useQuery(
    "get-videos",
    () => getAssets("type=Photo"),
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(data);

  return (
    <div>
      <Navbar />
      <Hero>
        <HomePageHeroContent />
      </Hero>


      {/* {isLoading ? (
        <div className="flex  justify-center items-center h-[200px]">
          <Loader />
        </div>
      ) : data.data.length === 0 ? (
        <div className="text-center py-4">No photos found.</div>
      ) : (
        <Masonry />
      )} */}

      <Masonry />
      <Footer />

    </div>
  );
});
