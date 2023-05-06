import React, { memo } from "react";
import { Hero } from "../../Components/Shared/Hero";
import { Masonry } from "../../Components/Masonary";
import { Navbar } from "../../Components/Shared/Navbar";
import { HomePageHeroContent } from "../../Components/Home/HeroSection";
import Footer from "../../Components/Shared/Footer";

export const Home = memo(() => {
  return (
    <div>
      <Navbar />
      <Hero>
        <HomePageHeroContent />
      </Hero>
      <Masonry type="Photo" />
      <Footer />
    </div>
  );
});
