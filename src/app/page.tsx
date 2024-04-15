import { db } from "@/server/db";

const mockURLs = [
  "https://utfs.io/f/7379636d-36e1-4727-86fb-9f67085890e2-5n3gjp.jpg",
  "https://utfs.io/f/270db83a-7d54-4dda-b604-825c331b6cc2-2rqyil.jpg",
  "https://utfs.io/f/c7867d8d-1564-43c1-963f-2f6c0eca1ddb-i71y02.jpg",
];

const mockImages = mockURLs.map((url, idx) => {
  return {
    id: idx,
    url,
  };
});

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log("posts ->", posts)
  return (
    <main className="p-4">
      <div className="flex flex-wrap gap-4">
        {mockImages.map(image => (
          <div className="w-48 aspect-video" key={image.id}>
            <img src={image.url} className="aspect-video" />
          </div>
        ))}
      </div>
    </main>
  );
}

