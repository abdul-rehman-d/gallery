import { deleteImage, getImage } from "@/server/queries";
import { clerkClient } from "@clerk/nextjs/server";
import DeleteForm from "./delete-form";


export default async function FullPagePhotoView(props: { id: number }) {
  const image = await getImage(props.id);

  const user = await clerkClient.users.getUser(image.userId);

  const deleteThisImage = async () => {
    "use server";
    await deleteImage(props.id);
  }

  return (
    <div className="w-full max-w-full overflow-x-hidden md:overflow-y-hidden h-full md:max-h-full flex flex-row flex-wrap md:flex-nowrap gap-4">
      <div className="flex justify-center items-center md:flex-1">
        <img src={image.url} className="object-contain max-h-full" />
      </div>
      <div className="w-full md:w-64 md:flex-shrink-0 flex flex-col border-t pt-2 md:pt-0 md:border-t-0 md:border-l md:pl-2">
        <div className="text-lg border-b text-center p-2">{image.name}</div>
        <div className="flex flex-col py-2">
          <span>Uploaded by: </span>
          <span>{user.fullName}</span>
        </div>
        <div className="flex flex-col py-2">
          <span>Uploaded at: </span>
          <span>{image.createdAt.toLocaleString()}</span>
        </div>
        <div className="py-2">
          <DeleteForm deleteImage={deleteThisImage} />
        </div>
      </div>
    </div>
  )
}

