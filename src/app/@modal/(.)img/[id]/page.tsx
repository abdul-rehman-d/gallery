import React from "react";
import FullPagePhotoView from "@/components/full-photo-view";
import { Modal } from "./modal";

export default function PhotoModal({
  params: { id: photoId },
}: {
  params: { id: string };
}) {
  const idAsNumber = parseInt(photoId, 10);
  if (isNaN(idAsNumber)) {
    throw new Error("Invalid photo ID");
  }

  return (
    <Modal>
      <FullPagePhotoView id={idAsNumber} />
    </Modal>
  );
}

