import { getImage } from "@/server/queries";
import { clerkClient } from "@clerk/nextjs/server";

export default async function FullPagePhotoView(props: { id: number }) {
  const image = await getImage(props.id);

  const user = await clerkClient.users.getUser(image.userId);

  return (
    <div className="w-full max-w-full overflow-hidden h-full max-h-full flex flex-row gap-4">
      <div className="flex justify-center items-center flex-1">
        <img src={image.url} className="object-contain" />
      </div>
      <div className="w-64 flex-shrink-0 flex flex-col border-l pl-2">
        <div className="text-lg border-b text-center p-2">{image.name}</div>
        <div className="flex flex-col py-2">
          <span>Uploaded by: </span>
          <span>{user.fullName}</span>
        </div>
        <div className="flex flex-col py-2">
          <span>Uploaded at: </span>
          <span>{image.createdAt.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}

