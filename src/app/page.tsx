import { db } from "@/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const imagesFromDB = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.createdAt),
  });
  return (
    <main className="p-4">
      <div className="flex flex-wrap gap-4">
        {imagesFromDB.map(image => (
          <div className="w-48 flex flex-col items-center gap-2" key={image.id}>
            <img src={image.url} className="w-48 h-40 object-cover" />
            <span>{image.name}</span>
          </div>
        ))}
      </div>
    </main>
  );
}

