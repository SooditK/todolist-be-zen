import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  } else {
    const { id, content, tags, title, pinned, completed } = req.body;
    if (!id) {
      res.status(400).json({ error: "Missing Params" });
      return;
    } else {
      const todo = await prisma.todo.update({
        where: {
          id: id,
        },
        data: {
          content: content,
          tags: tags,
          title: title,
          pinned: pinned,
          completed: completed,
        },
      });
      res.status(200).json({ todo });
    }
  }
}
