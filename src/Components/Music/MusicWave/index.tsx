import ReactWaves from "@dschoon/react-waves";
import React, { useEffect, useRef, useState } from "react";
import { BiPlayCircle, BiPauseCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { downloadAsset } from "../../../services/assets.service";
import { setPlayingId } from "../../../store/music";
import { getFileExtension } from "../../../utils";
import { Button } from "../../Shared/Button";
import "./index.css";
export const MusicWave = ({ audio, asset, playingId }) => {
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const dispatch = useDispatch();
  const [duration, setDuration] = useState(0);
  const eleObj = useRef(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const download = () => {
    setIsDownloading(true);
    downloadAsset(asset?.key).then((d) => {
      const url = URL.createObjectURL(d.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${asset?.title}.${getFileExtension(asset?.src)}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsDownloading(false);
      // saveUserActivity({ assetId: asset?._id, stat_type: "download" });
    });
  };

  useEffect(() => {
    const tempAudio = new Audio(audio);
    const loadMeta = () => {
      setDuration(Math.ceil(tempAudio.duration));
    };
    tempAudio.addEventListener("loadedmetadata", loadMeta);

    return () => {
      tempAudio.removeEventListener("loadedmetadata", loadMeta);
    };
  }, []);

  useEffect(() => {
    if (playingId != asset?._id) {
      setPlaying(false);
      eleObj.current?.seekTo(0);
    }
  }, [playingId]);

  return (
    <div className="flex relative group hover:bg-[#e7f1fc] items-center max-w-[1000px] m-auto border p-4 rounded my-5 cursor-pointer">
      <div className="mr-4">
        {!playing && playingId != asset?._id ? (
          <BiPlayCircle
            onClick={() => {
              setPlaying(true);
              dispatch(setPlayingId(asset?._id));
            }}
            className="play-icon cursor-pointer text-[#189EFF]"
          />
        ) : (
          <BiPauseCircle
            onClick={() => setPlaying(false)}
            className="play-icon cursor-pointer text-[#189EFF]"
          />
        )}
      </div>
      <div className="mt-2 text-black min-w-[100px] max-w-[100px]">
        <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {asset?.title}
        </p>
        <p className="text-sm overflow-hidden text-ellipsis whitespace-nowrap">
          {asset?.uploadedBy?.username} <span></span>
        </p>
      </div>

      <ReactWaves
        audioFile={audio}
        className={"react-waves"}
        pos={pos}
        options={{
          barHeight: 2,
          cursorWidth: 0,
          height: 200,
          hideScrollbar: true,
          progressColor: "#EC407A",
          responsive: true,
          waveColor: "#D1D6DA",
          interact: true,
          loopSelection: true,
        }}
        volume={1}
        zoom={1}
        playing={playing}
        onPosChange={
          ((a, b) => {
            if (duration == a && pos) {
              eleObj.current?.seekTo(0);
              setPos(0);
              setPlaying(false);
              dispatch(setPlayingId(undefined));
            } else {
              setPos(a);
            }
            if (!eleObj.current) {
              eleObj.current = b;
            }
          }) as any
        }
      ></ReactWaves>

      <span className="text-xs text-[#696969]">
        Duration: {pos}s / {duration}s
      </span>

      <div className="bg-[#e7f1fc] pl-8 absolute right-4 opacity-0 group-hover:opacity-100">
        <Button
          isLoading={isDownloading}
          onClick={download}
          text={isDownloading ? "Downloading" : "Download"}
          color="primary"
          variant="filled"
        />
      </div>
    </div>
  );
};
