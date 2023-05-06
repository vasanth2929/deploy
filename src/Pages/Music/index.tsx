import { HomePageHeroContent } from "../../Components/Home/HeroSection";
import { Hero } from "../../Components/Shared/Hero";
import { Navbar } from "../../Components/Shared/Navbar";
import React, { useEffect, useState } from "react";
import "./index.css";
import { MusicWave } from "../../Components/Music/MusicWave";
import { useQuery } from "react-query";
import { getAssets } from "../../services/assets.service";
import { Loader } from "@mantine/core";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Button } from "../../Components/Shared/Button";
import Footer from "../../Components/Shared/Footer";

export const MusicPage = () => {
  const [page, setPage] = useState(1);
  const playingId = useSelector((state: RootState) => state.music.playingId);
  const [musics, setMusics] = useState([]);
  const { data, isLoading, isRefetching, isFetched } = useQuery(
    ["getMusic", page],
    () => {
      let params = new URLSearchParams();
      params.set("type", "Music");
      params.set("limit", "10");
      params.set("page", page.toString());
      return getAssets(params.toString());
    },
    {
      select: (d) => d.data,

      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      setMusics([...musics, ...data]);
    }
  }, [data]);
  const renderMusicList = () => {
    return (
      <>
        {musics.map((t) => {
          return (
            <MusicWave
              playingId={playingId}
              key={t._id}
              audio={t.src}
              asset={t}
            />
          );
        })}
      </>
    );
  };

  return (
    <div>
      <Navbar />
      <Hero>
        <HomePageHeroContent />
      </Hero>

      {isLoading && page === 1 ? (
        <div className="flex items-center justify-center h-10 my-10">
          <Loader />
        </div>
      ) : (
        <>
          {renderMusicList()}
          <div className="my-5 flex justify-center">
            {isRefetching && <Loader />}
            <Button
              text="Discover More"
              variant="outline"
              color="primary"
              onClick={() => {
                setPage((p) => p + 1);
              }}
            />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

