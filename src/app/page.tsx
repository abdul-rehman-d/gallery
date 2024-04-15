import { db } from "@/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

async function Images() {
  const imagesFromDB = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return (
    <div className="flex flex-wrap gap-4">
      {imagesFromDB.map(image => (
        <div className="w-48 flex flex-col items-center gap-2" key={image.id}>
          <img src={image.url} className="w-48 h-40 object-cover" />
          <span>{image.name}</span>
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

