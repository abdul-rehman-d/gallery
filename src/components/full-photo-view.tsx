import { deleteImage, getImage } from "@/server/queries";
import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

function DeleteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-4 h-4">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

export default async function FullPagePhotoView(props: { id: number }) {
  const image = await getImage(props.id);

  const user = await clerkClient.users.getUser(image.userId);

  return (
    <div className="w-full max-w-full overflow-hidden h-full max-h-full flex flex-row gap-4">
      <div className="flex justify-center items-center flex-1">
        <img src={image.url} className="object-contain max-h-full" />
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
        <div className="py-2">
          <form
            action={async () => {
              "use server"

              await deleteImage(image.id);
            }}
          >
            <Button variant="destructive" type="submit">
              <DeleteIcon /><span> Delete</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

