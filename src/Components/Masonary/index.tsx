import { Button, Modal, Textarea } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { isEmpty } from "lodash";
import React, { FC, useEffect, useMemo, useState } from "react";
import { useInView } from "react-intersection-observer";
import MasonryComponent from "react-masonry-css";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getAssets, updateAsset } from "../../services/assets.service";
import { toggleImageModalOpen } from "../../store/ui";
import { getFileExtension } from "../../utils";
import { ImageModal } from "../Home/ImageModal";
import "external-svg-loader";
import "./index.css";
import { FaUser } from "react-icons/fa";
import { Input } from "../Shared/Input";
import { RejectModal } from "../RejectModal";
import { AssetViewModal } from "../AssetViewModal";


import { AppLoader } from "../Shared/Loader";

const _Masonry: FC<{
  search?: string;
  fetchInternal?: boolean;
  data?: any[];
  userIn?: "users" | "admin";
  filter?: any;
  type?: string;
}> = ({
  search,
  fetchInternal = true,
  data = [],
  userIn = "users",
  filter = "",
  type = "",
}) => {
  const { ref, inView } = useInView({ threshold: 0, triggerOnce: true });
  const [assetNeedAction, setAssetNeedAction] = useState(null);
  const [reason, setReason] = useState("");
  const [modalType, setModalType] = useState<"view" | "reject" | undefined>(
    undefined
  );
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState<any>(data?.length ? data : []);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);

  const { refetch, isLoading } = useQuery(
    ["getAssets", page],
    () => {
      let params = new URLSearchParams();
      params.set("page", page.toString());
      params.set("limit", "40");
      if (type) params.set("type", type);
      if (search) params.set("search", search);
      return getAssets(params.toString());
    },
    {
      select: (d) => d.data,
      enabled: page < 4 && fetchInternal,
      onSuccess: (d: any) =>
        setPhotos([
          ...photos,
          ...d.filter((t: any) => {
            if (userIn == "admin") return t.status === "review";
            else return true;
          }),
        ]),
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (search) {
      setPhotos([]);
      setPage(1);
      refetch();
    }
  }, [search]);

  useEffect(() => {
    if (inView) {
      setPage((p) => p + 1);
    }
  }, [inView]);

  const openPopup = (ind: number) => {
    setIndex(ind);
    dispatch(toggleImageModalOpen(true));
  };

  const rejectOrViewAsset = (asset, modalType: "reject" | "view") => {
    setAssetNeedAction(asset);
    setModalType(modalType);
    setActionModalOpen(true);
  };

  const approveOrReject = (asset: any, status: "published" | "rejected") => {
    const payload = { status };

    let message = "";

    if (status == "published") {
      message = "Asset approved!";
    } else {
      message = "Asset rejected!";
      payload["reason"] = reason;
    }

    updateAsset(asset._id, payload).then(() => {
      showNotification({ message, color: "green" });
      setPhotos([]);
      setActionModalOpen(false);
      setAssetNeedAction(null);
      setReason("");
      setPage(1);
      refetch();
    });
  };

  const filteredPhotos = useMemo(() => {
    return photos.filter((t: any) =>
      filter ? getFileExtension(t.src) === filter?.toLowerCase() : true
    );
  }, [photos, filter]);

  const noResults = isEmpty(filteredPhotos);
  const closeModal = () => {
    setActionModalOpen(false);
    setAssetNeedAction(null);
    setReason("");
    setModalType(undefined);
  };

  if (isLoading) {
    return <AppLoader isFullscreen />;
  }

  return (
    <div className="p-5">
      {noResults ? (
        <>No results found.</>
      ) : (
        <>
          {actionModalOpen && modalType == "view" && (
            <AssetViewModal
              opened={true}
              asset={assetNeedAction as any}
              onClose={closeModal}
              onChange={(e) => setReason(e.target.value)}
              value={reason}
              onSuccess={(status: "rejected" | "published") => {
                approveOrReject(assetNeedAction, status);
              }}
            />
          )}
          <RejectModal
            onClose={closeModal}
            opened={actionModalOpen && modalType == "reject"}
            onChange={(e) => setReason(e.target.value)}
            value={reason}
            onSuccess={() => {
              approveOrReject(assetNeedAction, "rejected");
            }}
          />
          <ImageModal photos={filteredPhotos} index={index} />
          {/* <MasonryComponent
            breakpointCols={4}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          > */}
          <div className="grid grid-cols-4 gap-5">
            {filteredPhotos.map((photo: any, ind: number) => {
              const isSvg = getFileExtension(photo.src) === "svg";
              return (
                <div key={ind} className="relative group rounded-lg">
                  {isSvg ? (
                    <svg
                      className="w-full h-full relative img cursor-pointer border"
                      ref={filteredPhotos?.length - 4 === ind ? ref : null}
                      data-src={photo.src}
                    />
                  ) : (
                    // <img
                    //   ref={filteredPhotos?.length - 4 === ind ? ref : null}
                    //   src={photo.src}
                    //   className="w-full relative img cursor-pointer h-full object-cover rounded-lg"
                    // />

                    <></>
                  )}

                  <div
                    onClick={() => openPopup(ind)}
                    className="cursor-pointer rounded-lg absolute top-0 left-0 right-0 bottom-0 bg-black opacity-0 group-hover:opacity-50"
                  ></div>

                  {userIn === "users" && (
                    <div className="cursor-pointer absolute justify-between p-4 flex items-end opacity-0 group-hover:opacity-100  w-full bottom-[20px]">
                      <Link
                        to={`/uploader/${photo.uploadedBy?.slug}`}
                        className="flex items-center"
                      >
                        {photo.uploadedBy?.url ? (
                          <img
                            className="w-8 h-8 rounded-full"
                            src={photo.uploadedBy?.url}
                          />
                        ) : (
                          <div>
                            <FaUser color="white" />
                          </div>
                        )}
                        <span className="text-white ml-2">
                          {photo.uploadedBy?.username}
                        </span>
                      </Link>

                      <div>
                        <span className="material-symbols-outlined text-white">
                          favorite
                        </span>
                      </div>
                    </div>
                  )}

                  {userIn === "admin" && (
                    <div className="cursor-pointer absolute justify-center  flex-col p-4 flex items-center opacity-0 group-hover:opacity-100  w-full h-full top-5">
                      <Button
                        className="action-btn view"
                        variant="filled"
                        onClick={() => rejectOrViewAsset(photo, "view")}
                      >
                        View
                      </Button>
                      <Button
                        className="action-btn approve"
                        variant="filled"
                        onClick={() => approveOrReject(photo, "published")}
                      >
                        Approve
                      </Button>
                      <Button
                        className="action-btn reject"
                        variant="filled"
                        onClick={() => rejectOrViewAsset(photo, "reject")}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export const Masonry = React.memo(_Masonry);
