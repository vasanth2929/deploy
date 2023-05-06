import React, { useState } from "react";
import { Hero } from "../../Components/Shared/Hero";
import { Navbar } from "../../Components/Shared/Navbar";
import {
  FiFacebook,
  FiInstagram,
  FiMapPin,
  FiPlus,
  FiTwitter,
} from "react-icons/fi";
import { Masonry } from "../../Components/Masonary";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getUserInfoAndAssets } from "../../services/user.services";
import { FaUser } from "react-icons/fa";
import { HiPhotograph } from "react-icons/hi";
import { AssetTabs } from "../../Components/AssetTabs";
import { BiPlayCircle } from "react-icons/bi";
import { BsMusicNote, BsSoundwave } from "react-icons/bs";
import { groupBy } from "lodash";
import { UploaderRes } from "../../types/uploader-response";

const tabs = [
  {
    name: "Photo",
    accessor: "Photo",
    Icon: HiPhotograph,
  },
  {
    name: "Video",
    accessor: "Video",
    Icon: BiPlayCircle,
  },
  {
    name: "Music",
    accessor: "Music",
    Icon: BsMusicNote,
  },
  {
    name: "Sound Effect",
    accessor: "SFX",
    Icon: BsSoundwave,
  },
];
type ASSET_TYPE = "Photo" | "Video" | "Music" | "SFX";
export const Uploader = () => {
  const params = useParams();
  const [activeAccessor, setActiveAccessor] = useState<ASSET_TYPE>("Photo");
  const { data, isLoading } = useQuery(
    "getUserInfoAndAssets" + params?.name,
    () => {
      return getUserInfoAndAssets(params.name || "");
    },
    {
      enabled: Boolean(params.name),
      select: (res) => {
        return {
          data: {
            ...res.data,
            assetsMap: groupBy(res?.data?.assets, "type"),
            assets: res.data.assets.map((t: any) => {
              return { ...t, uploadedBy: res.data.user };
            }),
          } as UploaderRes,
        };
      },
    }
  );
  const onHiremeClick = () => {};
  const renderComp = () => {
    switch (activeAccessor) {
      case "Photo":
        return <Masonry data={data?.data?.assets} fetchInternal={false} />;
      case "Music":
        return <>m</>;
      case "Video":
        return <>v</>;
      case "SFX":
        return <>s</>;
    }
  };
  return (
    <div>
      <Navbar />

      {!isLoading && (
        <>
          <Hero className="" bg={data?.data.user.cover}>
            <div className="relative text-white p-10 flex justify-between">
              <div className="flex">
                {data?.data.user.img ? (
                  <img
                    className="h-20 w-20 rounded-full"
                    src={data?.data.user.img}
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full border flex justify-center items-center">
                    <FaUser color="white" size={40} />
                  </div>
                )}

                <div className="w-[600px] mx-5">
                  <h3 className="text-3xl mb-2">{data?.data.user.username}</h3>
                  <p className="text-sm">{data?.data.user.bio}</p>

                  <div className="mt-5 flex">
                    <button className="flex items-center border rounded px-2 py-1">
                      <FiPlus /> Follow
                    </button>
                    <button
                      onClick={onHiremeClick}
                      className="bg-[#189EFF] flex items-center rounded px-2 py-1 mx-4"
                    >
                      Hire me
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center h-max">
                <div className="flex items-center mr-4">
                  <FiMapPin />
                  <span className="ml-1">{data?.data.user.location}</span>
                </div>

                <div className="flex">
                  <a href={data?.data.user.instagram} target="_blank">
                    <FiInstagram />
                  </a>
                  <a href={data?.data.user.facebook} target="_blank">
                    <FiFacebook className="mx-3" />
                  </a>
                  <a href={data?.data.user.twitter} target="_blank">
                    <FiTwitter />
                  </a>
                </div>
              </div>
            </div>
          </Hero>
          <div className="my-5">
            <AssetTabs
              activeAccessor={activeAccessor}
              tabs={tabs.map((t) => ({
                ...t,
                value: data.data?.assetsMap[t.accessor]?.length || 0,
              }))}
              onClick={(a) => {
                setActiveAccessor(a as ASSET_TYPE);
              }}
            />
          </div>
          {renderComp()}
        </>
      )}
    </div>
  );
};
