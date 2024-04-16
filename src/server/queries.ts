import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Not authenticated");

  const images = await db.query.images.findMany({
    where: (model, { eq }) => (eq(model.userId, user.userId)),
    orderBy: (model, { desc }) => desc(model.createdAt),
  });

  return images;
}

