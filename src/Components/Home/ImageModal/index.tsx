import React, { FC, useEffect, useState } from "react";
import Modal from "react-modal";
import "./index.css";
import {
  FaFacebookSquare,
  FaLinkedin,
  FaTwitterSquare,
  FaYoutube,
  FaBookmark,
  FaRegBookmark,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { toggleImageModalOpen } from "../../../store/ui";
import { downloadAsset } from "../../../services/assets.service";
import { saveAs } from "file-saver";
import { saveUserActivity } from "../../../services/stat.service";
import clsx from "clsx";
import { getFileExtension } from "../../../utils";
import { useQuery } from "react-query";
import {
  getAssetSavedStatus,
  saveAsset as saveAssetApi,
  removeAsset as removeAssetApi,
} from "../../../services/user.services";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

export const ImageModal: FC<{ photos: any; index: number }> = ({ index, photos }) => {
  const { isOpen, isAuthenticated } = useSelector((state: RootState) => {
    return {
      isOpen: state.ui.isImageModalOpen,
      isAuthenticated: state.auth.isAuthenticated,
    };
  });
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(toggleImageModalOpen(false));
  };

  const saveViewCount = (assetId: string) => {
    saveUserActivity({ assetId, stat_type: "view" });
  };

  const [ind, setIndex] = useState(index);

  const prev = () => {
    setIndex((i) => i - 1);
    saveViewCount(photos[ind - 1]?._id);
  };

  const next = () => {
    setIndex((i) => i + 1);
    saveViewCount(photos[ind + 1]?._id);
  };

  const { data, refetch } = useQuery(
    ["get-saved-info", photos[ind]?._id],
    () => getAssetSavedStatus(photos[ind]?._id),
    { enabled: isOpen && isAuthenticated, select: (d) => d.data }
  );

  const unSaveAsset = (assetId: string) => {
    removeAssetApi(assetId).then(() => {
      refetch();
    });
  };
  const saveAsset = (assetId: string) => {
    saveAssetApi(assetId).then(() => {
      refetch();
    });
  };

  useEffect(() => {
    if (isOpen) {
      document.querySelector("body")?.classList.add("overflow-y-hidden");
      saveViewCount(photos[index]?._id);
    } else
      document.querySelector("body")?.classList.remove("overflow-y-hidden");

    return () => {
      setIndex(0);
    };
  }, [isOpen]);

  useEffect(() => {
    setIndex(index);
  }, [index]);

  const download = (asset) => {
    downloadAsset(asset?.key).then((d) => {
      const url = URL.createObjectURL(d.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${asset?.title}.${getFileExtension(asset?.src)}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      saveUserActivity({ assetId: asset?._id, stat_type: "download" });
    });
  };

  const photo = photos[ind];

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
      >
        <div className="relative">
          <button onClick={closeModal} className="absolute top-2 right-2">
            <span className="material-symbols-outlined">clear</span>
          </button>
          {/*Prev button*/}
          <button
            onClick={prev}
            disabled={ind == 0}
            className={clsx(
              "absolute top-[243px] prev-btn rounded-full w-[50px] h-[50px] flex justify-center items-center",
              { "text-gray-300 cursor-not-allowed": ind == 0 }
            )}
          >
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </button>
          {/*Next button*/}
          <button
            onClick={next}
            disabled={ind == photos?.length - 1}
            className={clsx(
              "absolute top-[243px] right-2 next-btn rounded-full w-[50px] h-[50px] flex justify-center items-center",
              { "text-gray-300 cursor-not-allowed": ind == photos?.length - 1 }
            )}
          >
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </button>
          <div className="flex justify-between w-[95%]">
            <div className="flex items-center">
              <img
                className="h-10 w-10 rounded-full"
                src="https://randomuser.me/api/portraits/men/32.jpg"
              />

              <div className="ml-[10px]">
                <p>Jennifer Fernadaz</p>
                {/* <p className="text-sm text-[#696969]">36.3k Followers</p> */}
              </div>

              {/* <button className="border flex items-center h-8 px-5 mx-7 rounded-md text-[#696969]">
                <span className="material-symbols-outlined text-[18px] mr-2">
                  add
                </span>
                <span>Follow</span>
              </button> */}
            </div>

            <div className="flex text-[#696969] h-10">
              <button className="border flex items-center rounded px-2">
                <span className="material-symbols-outlined text-xl">
                  favorite
                </span>
                <span className="text-sm ml-1">21</span>
              </button>

              <button className="border px-2 mx-4 flex justify-center items-center">
                {data === "Saved" ? (
                  <FaBookmark
                    onClick={() => unSaveAsset(photo?._id)}
                    color="#189eff"
                  />
                ) : (
                  <FaRegBookmark onClick={() => saveAsset(photo?._id)} />
                )}
              </button>

              <button className="border px-2 rounded flex justify-center items-center">
                <span className="material-symbols-outlined text-xl">share</span>
              </button>

              <button
              onClick={() => download(photo)}
                // onClick={() => download(photos[ind]?.src)}
                className="ml-4 flex items-center text-white px-2 rounded btnn-hover download-btn"
              >
                <span className="material-symbols-outlined">download</span>
                <span className="mx-4 font-medium">Download</span>
                <span className="material-symbols-outlined border-l border-[#49A314] h-full flex items-center pl-2">
                  expand_more
                </span>
              </button>
            </div>
          </div>

          <div className="flex py-8 justify-between w-[95%]">
            <img
              className="max-h-[600px]  object-cover w-full mr-20 ml-14"
              src={photo?.src}
            />

            <div>
              <div className="min-w-[300px] max-w-[300px] border rounded-lg overflow-hidden">
                <div className="bg-[#F0F2F5] px-6 py-[18px]">
                  <h3 className="text-[#52667A] font-medium underline">
                    <Link to="/license">Stocklerz License</Link>
                  </h3>
                </div>
                <div className="px-6 py-[18px] text-sm text-[#52667A]">
                  <p>Free for commercial use No attribution required</p>
                </div>
              </div>

              <div className="min-w-[300px] max-w-[300px] border rounded-lg overflow-hidden mt-5">
                <div className="bg-[#F0F2F5] px-6 py-[18px]">
                  <h3 className="text-[#52667A] font-medium underline">
                    Follow us on
                  </h3>
                </div>
                <div className="px-6 py-[18px] text-sm text-[#52667A] flex items-center">
                  <FaFacebookSquare className="text-2xl text-[#189EFF]" />

                  <FaLinkedin className="text-2xl ml-4 text-[#189EFF]" />

                  <FaTwitterSquare className="text-2xl mx-4 text-[#189EFF]" />

                  <FaYoutube className="text-3xl text-[#189EFF]" />
                </div>
              </div>
            </div>
          </div>

          {/* <div>
            <h2 className="text-[#4B3A5A] font-medium text-3xl">
              Related Images
            </h2>
            <div className="flex gap-2 mt-5">
              <img
                className="max-w-[300px] rounded-lg"
                src="https://images.pexels.com/photos/8652888/pexels-photo-8652888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              />
              <img
                className="max-w-[300px] rounded-lg"
                src="https://images.pexels.com/photos/8652888/pexels-photo-8652888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              />
              <img
                className="max-w-[300px] rounded-lg"
                src="https://images.pexels.com/photos/8652888/pexels-photo-8652888.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              />
            </div>
          </div> */}
        </div>
      </Modal>
    </div>
  );
};
