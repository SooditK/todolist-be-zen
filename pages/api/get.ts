import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  } else {
    const { skip, take } = req.query;
    const posts = await prisma.todo.findMany({
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
    });
    const hasMore = posts.length === (take ? Number(take) : 6);
    const hasPrevious = skip ? Number(skip) > 0 : false;
    res.status(200).json({ posts, hasMore, hasPrevious });
  }
}
