import { getMyImages } from "@/server/queries";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {images.map(image => (
        <div className="w-48 flex flex-col items-center gap-2 overflow-hidden" key={image.id}>
          <img src={image.url} className="w-48 h-40 object-cover" />
          <span className="max-w-full text-center">{image.name}</span>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="w-full text-center">
        <p>Sign in to see images</p>
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}

