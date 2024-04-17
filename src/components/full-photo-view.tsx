import { getImage } from "@/server/queries";

export default async function FullPagePhotoView(props: { id: number }) {
  const image = await getImage(props.id);

  return (
    <div className="w-full max-w-full h-full max-h-full flex flex-row gap-4">
      <div className="flex justify-center items-center">
        <img src={image.url} className="object-contain" />
      </div>
      <div className="w-48 flex-shrink-0 flex flex-col gap-2 border-l pl-2 bg-black">
        <div className="text-xl font-bold">{image.name}</div>
      </div>
    </div>
  )
}

