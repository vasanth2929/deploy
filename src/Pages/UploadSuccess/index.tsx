import { Button, Modal, Tab, Tabs } from "@mantine/core";
import clsx from "clsx";
import React, { FC, useMemo, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { MdDelete, MdMoreHoriz } from "react-icons/md";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Navbar } from "../../Components/Shared/Navbar";
import { deleteAsset, getAssets } from "../../services/assets.service";
import { getUser } from "../../utils";
import "./index.css";
const RenderImages: FC<{
  data: Array<{ src: string; _id: string }>;
  onDelete: (id: string) => void;
  isRejected?: boolean;
  onViewReason?: (id: string) => void;
}> = ({ data, onDelete, isRejected, onViewReason }) => {
  const navigate = useNavigate();
  return (
    <div className="mx-5 flex flex-wrap gap-4">
      {data.map((t: any) => {
        return (
          <div className="relative group">
            <img
              key={t._id}
              src={t.src}
              className="w-60 h-60 object-cover border rounded-lg"
            />
            <div className="absolute opacity-0 bg-gray-700 group-hover:opacity-50 w-full h-full top-0 rounded-lg"></div>
            <div className="absolute opacity-0 group-hover:opacity-100 w-full h-full top-0 rounded-lg flex flex-col justify-center items-center">
              <Button
                style={{ background: "#189EFF" }}
                variant="filled"
                className="w-[130px]"
                onClick={() => navigate(`/upload/Photo?id=${t._id}`)}
              >
                EDIT
              </Button>
              <Button
                style={{ background: "white" }}
                className="w-[130px] mt-4 border shadow text-gray-300"
                variant="filled"
                onClick={() => onDelete(t._id)}
              >
                DELETE
              </Button>
              {isRejected && (
                <Button
                  style={{ background: "white" }}
                  className="w-[130px] mt-4 border shadow text-gray-300"
                  variant="filled"
                  onClick={() => onViewReason(t._id)}
                >
                  VIEW REASON
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export const MyUploads = () => {
  const params = useSearchParams();
  const tabId = params[0]?.get("tab") || 0;
  const [modalType, setModalType] = useState<"delete" | "view">("delete");
  const [activeTab, setActiveTab] = useState(+tabId);
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const user = getUser();

  const { data, isLoading, refetch } = useQuery(
    "my-uploads",
    () => getAssets(`isAll=true&type=Photo&uploadedBy=${user?.id}`),
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      select: (d) => d.data,
    }
  );

  const onDelete = (id: string) => {
    setId(id);
    setModalType("delete");
    setOpen(true);
  };

  const deleteItem = () => {
    setDeleting(true);
    deleteAsset(id).then(() => {
      setDeleting(false);
      refetch();
      setOpen(false);
    });
  };

  const { draft, published, rejected, review } = useMemo(() => {
    return {
      published: data ? data?.filter((t: any) => t.status === "published") : [],
      review: data ? data?.filter((t: any) => t.status === "review") : [],
      draft: data ? data?.filter((t: any) => t.status === "draft") : [],
      rejected: data ? data?.filter((t: any) => t.status === "rejected") : [],
    };
  }, [data]);

  const isDelete = modalType === "delete";

  const text = isDelete
    ? "Are you sure you want to continue? "
    : rejected?.find((t) => t._id == id)?.reason;

  return (
    <div>
      <Navbar />

      <div className="mx-[100px]">
        <h3 className="text-[30px] my-10">Upload</h3>

        {!isLoading && (
          <div className="flex">
            <Tabs
              className="flex-1"
              active={activeTab}
              onTabChange={setActiveTab}
            >
              <Tab label="Published">
                <RenderImages data={published} onDelete={onDelete} />
              </Tab>
              <Tab label="Pending Review">
                <RenderImages data={review} onDelete={onDelete} />
              </Tab>
              <Tab label="Rejected">
                <RenderImages
                  data={rejected}
                  isRejected
                  onViewReason={(id) => {
                    setId(id);
                    setModalType("view");
                    setOpen(true);
                  }}
                  onDelete={onDelete}
                />
              </Tab>
              <Tab label="Drafts">
                <RenderImages data={draft} onDelete={onDelete} />
              </Tab>
            </Tabs>
            <div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="flex-1 cursor-pointer border-b-2 right-0 mt-[10px] pb-1 flex justify-end items-center"
              >
                <MdMoreHoriz />
                <span className="mx-2">More</span>
              </div>
            </div>
          </div>
        )}

        <Modal
          centered
          title={
            <div className="flex items-center">
              {isDelete && (
                <div className="w-10 h-10 flex justify-center items-center rounded-full bg-red-50">
                  <FaTrashAlt className="text-[#F32D2D]" />
                </div>
              )}
              <h3
                className={clsx("text-lg font-bold", {
                  "ml-4": isDelete,
                })}
              >
                {isDelete ? "Delete Photo" : "Reason"}
              </h3>
            </div>
          }
          onClose={() => setOpen(false)}
          opened={open}
        >
          <p>{text}</p>
          {isDelete && (
            <>
              <p className="text-[#F32D2D] mt-2">
                This action is permanent and cannot be undone!
              </p>

              <div className="pt-4  justify-end w-full flex">
                <button
                  className="text-[#696969] mr-5"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
                <Button
                  variant="filled"
                  loading={deleting}
                  onClick={deleteItem}
                  className="bg-[#F32D2D] hover:bg-[#F32D2D]"
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};
