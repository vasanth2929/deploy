import { Button, Modal, Textarea } from "@mantine/core";
import React, { FC } from "react";
type Props = {
  opened: boolean;
  onClose: () => void;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
  onSuccess: () => void;
};
export const RejectModal: FC<Props> = ({
  opened,
  onClose,
  onChange,
  value,
  onSuccess,
}) => {
  return (
    <Modal opened={opened} title="Enter reason" onClose={onClose}>
      <Textarea
        onChange={onChange}
        value={value}
        minRows={6}
        placeholder="Enter reason here"
      />
      <Button
        className="action-btn reject mt-4 w-full"
        variant="filled"
        onClick={onSuccess}
        fullWidth
      >
        Reject
      </Button>
    </Modal>
  );
};
