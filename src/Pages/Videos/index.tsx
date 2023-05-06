import React, { useMemo, useState } from "react";
import Masonry from "react-masonry-css";
import { HomePageHeroContent } from "../../Components/Home/HeroSection";
import { Hero } from "../../Components/Shared/Hero";
import { Navbar } from "../../Components/Shared/Navbar";
import video1 from "../../assets/video-1.mp4";
import video2 from "../../assets/video-2.mp4";
import video3 from "../../assets/video-3.mp4";
import ReactPlayer from "react-player";
import "./index.css";
import { useQuery } from "react-query";
import { getAssets } from "../../services/assets.service";
import { Loader } from "@mantine/core";
// import {Media, Video } from '@vidstack/player-react';
import { VideoModal } from "../../Components/Home/VideoModal/videomodal";
import { toggleImageModalOpen } from "../../store/ui";
import { useDispatch } from "react-redux";
import Footer from "../../Components/Shared/Footer";

export const VideosPage = () => {
  
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const { data, isLoading } = useQuery(
    "get-videos",
    () => getAssets("type=Video"),
    {
      refetchOnWindowFocus: false,
    }
  );


  const openPopup = (ind: number) => {
    setIndex(ind);
    dispatch(toggleImageModalOpen(true));
  };

  return (
    <div>
      <Navbar />
      <Hero>
        <HomePageHeroContent />
      </Hero>
      {isLoading ? (
        <div className="flex  justify-center items-center h-[200px]">
          <Loader />
        </div>
      ) : data.data.length === 0 ? (
        <div className="text-center py-4">No videos found.</div>
      ) : (
        <>
        <VideoModal videos={data.data} index={index} />
          <Masonry
            breakpointCols={4}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            <div className="p-5 flex gap-4" style={{width: '700px'}}>
              {data.data.map((video: any, ind: number) => {
                return (
                  <div onClick={() => openPopup(ind)}>
                    {/* <ReactPlayer
                    width={300}
                    height={300}
                    key={t.key}
                    // url={t.src}
                    url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                    playing
                    controls
                  /> */}
                  </div>
                );
              })}
            </div>
          </Masonry>

          <Footer />
        </>
      )}
    </div>
  );
};
