import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  } else {
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ error: "Missing title or content" });
      return;
    } else {
      const newPost = await prisma.todo.create({
        data: {
          title,
          content,
        },
      });
      res.status(200).json(newPost);
    }
  }
}
