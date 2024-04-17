import React from "react";
import FullPagePhotoView from "@/components/full-photo-view";

export default function PhotoPage({
    params: { id: photoId },
}: {
    params: { id: string };
}) {
    const idAsNumber = parseInt(photoId, 10);
    if (isNaN(idAsNumber)) {
        throw new Error("Invalid photo ID");
    }

    return (
        <FullPagePhotoView id={idAsNumber} />
    );
}

