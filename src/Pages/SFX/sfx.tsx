import { HomePageHeroContent } from "../../Components/Home/HeroSection";
import { Hero } from "../../Components/Shared/Hero";
import { Navbar } from "../../Components/Shared/Navbar";
import React from "react";
import { useQuery } from "react-query";
import { getAssets } from "../../services/assets.service";
import { Loader } from "@mantine/core";
import Footer from "../../Components/Shared/Footer";

export const SFX = () => {
  const { data, isLoading } = useQuery(
    ["getVector"],
    () => {
      let params = new URLSearchParams();
      params.set("type", "Vectors");
      return getAssets(params.toString());
    },
    {
      select: (d) => d.data,

      refetchOnWindowFocus: false,
    }
  );


  return (
    <div>
      <Navbar />
      <Hero>
        <HomePageHeroContent />
      </Hero>

      <Footer />

    </div>
  );
};

