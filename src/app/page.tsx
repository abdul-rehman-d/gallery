import Image from "next/image";
import { getMyImages } from "@/server/queries";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {images.map(image => (
        <Link
          href={`/img/${image.id}`}
          className="w-48 flex flex-col items-center gap-2 overflow-hidden" key={image.id}
        >
          <div className="w-48 h-48 bg-gray-950 relative flex items-center">
            <Image
              src={image.url}
              width={196}
              height={196}
              className="object-contain object-center"
              alt={image.name ?? image.url}
            />
          </div>
          <span className="max-w-full text-center">{image.name}</span>
        </Link>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <div>
      <SignedOut>
        <div className="w-full text-center">
          <p>Sign in to see images</p>
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </div>
  );
}

