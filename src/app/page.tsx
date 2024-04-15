import { db } from "@/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";

async function Images() {
  const user = auth();

  if (!user.userId) return

  const imagesFromDB = await db.query.images.findMany({
    where: (model, { eq }) => (eq(model.userId, user.userId)),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return (
    <div className="flex flex-wrap gap-4">
      {imagesFromDB.map(image => (
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

