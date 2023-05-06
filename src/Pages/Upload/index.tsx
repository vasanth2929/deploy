import clsx from "clsx";
import React, { useState } from "react";
import { FaArrowRight, FaImage, FaRegPlayCircle } from "react-icons/fa";
import { BsMusicNote, BsSoundwave } from "react-icons/bs";
import { TbVector } from "react-icons/tb";
import { MdOutlineMusicNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Components/Shared/Navbar";
import "./index.css";

const getIcon = (type: string) => {
  switch (type) {
    case "Photo":
      return <FaImage />;
    case "Vector":
      return <TbVector />;
    case "Video":
      return <FaRegPlayCircle />;
    case "Course":
      return <FaRegPlayCircle />;
    case "Music":
      return <MdOutlineMusicNote />;
    case "Sound Effect":
      return <BsSoundwave />;
    case "3DModel":
      return <FaRegPlayCircle />;
    case "Icon":
      return <FaRegPlayCircle />;
  }
};
const _types = [
  {
    name: "Photo",
    active: true,
  },
  {
    name: "Vector",
  },
  {
    name: "Video",
  },
  // {
  //   name: "Course",
  // },
  {
    name: "Music",
  },
  {
    name: "Sound Effect",
  },
  // {
  //   name: "3DModel",
  // },
  // {
  //   name: "Icon",
  // },
];
export const UploadPage = () => {
  const [types, setTypes] = useState(_types);
  const setType = (type: typeof _types[0]) => {
    setTypes(
      types.map((t) => {
        return {
          ...t,
          active: t.name === type.name,
        };
      })
    );
  };
  const navigate = useNavigate();
  const upload = () => {
    navigate(`/upload/${types.find((t) => t.active)?.name}`);
  };
  return (
    <div>
      <Navbar />
      <div className="">
        <h3 className="text-[22px] text-center mt-16 mb-8">I want to upload</h3>
        <div className="flex justify-center max-w-[660px] mx-auto gap-7 flex-wrap">
          {types.map((t) => (
            <div
              onClick={() => setType(t)}
              className={clsx(
                {
                  "bg-[#189EFF]": t.active,
                  "in-active": !t.active,
                },
                "flex items-center px-5 py-4 w-max rounded-[20px] cursor-pointer"
              )}
            >
              <div
                className={clsx(
                  "w-12 h-12 bg-blue-100 rounded-[14px] flex items-center justify-center"
                )}
              >
                {getIcon(t.name)}
              </div>
              <p className={clsx({ "text-white": t.active }, "ml-3")}>
                {t.name}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16  flex justify-center  buttons">
          <button
            onClick={upload}
            className="px-10 py-2 bg-[#189EFF] text-white rounded-[13px] flex items-center btn-hover color-1"
          >
            <span className="mr-2">Continue</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};
