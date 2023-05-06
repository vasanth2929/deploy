import { Button, Modal, Skeleton, Textarea } from "@mantine/core";
import React, { FC } from "react";
import { useQuery } from "react-query";
import { getPreviousSubmissionResults } from "../../services/assets.service";
import { Asset } from "../../types/asset.type";

type Props = {
  opened: boolean;
  asset: Asset;
  onClose: () => void;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSuccess: (status: "published" | "rejected") => void;
};

export const AssetViewModal: FC<Props> = ({
  opened,
  asset,
  onClose,
  value,
  onChange,
  onSuccess,
}) => {
  const { uploadedBy, src } = asset;

  const { username, userImg, _id } = uploadedBy as any;

  const { data, isLoading } = useQuery(
    ["get-previous-submissions-status"],
    () => getPreviousSubmissionResults(_id),
    {
      select: (d) => d.data,
    }
  );

  return (
    <Modal
      title={
        <div className="flex gap-2 items-center">
          <img
            className="w-8 h-8 rounded-full object-cover border shadow"
            src={userImg}
          />
          <p>{username}</p>
        </div>
      }
      opened={opened}
      onClose={onClose}
      size="80%"
    >
      <div className="flex gap-10">
        <div className="w-60 border h-max">
          <div className="px-6 py-3 bg-[#f0f2f5]">
            <h4>Upload Details</h4>
          </div>

          {isLoading ? (
            <div className="px-6 py-3">
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
              <Skeleton height={8} mt={6} radius="xl" />
            </div>
          ) : (
            <div className="px-6 py-3 text-sm text-[#52667A]">
              <div className="flex gap-1">
                <span>Upload Date:</span>
                <span>02/07/2022</span>
              </div>
              <div className="flex gap-1">
                <span>Previous Approved:</span>
                <span>{data?.published}</span>
              </div>
              <div className="flex gap-1">
                <span>Upload Rejected:</span>
                <span>{data?.rejected}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1">
          <img className="flex-1" src={src} />
        </div>

        <div>
          <Textarea
            className="w-80"
            minRows={4}
            placeholder="Enter reason here"
            value={value}
            onChange={onChange}
          />

          <div className="mt-2 gap-5 flex">
            <Button
              className="action-btn approve flex-1"
              variant="filled"
              onClick={() => onSuccess("published")}
            >
              Approve
            </Button>
            <Button
              className="action-btn reject flex-1"
              variant="filled"
              onClick={() => onSuccess("rejected")}
            >
              Reject
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
