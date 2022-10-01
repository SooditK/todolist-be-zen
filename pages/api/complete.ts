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
    const { id } = req.body;
    if (!id) {
      res.status(400).json({ error: "Missing id" });
      return;
    } else {
      const todo = await prisma.todo.findUnique({
        where: {
          id,
        },
      });
      if (!todo) {
        res.status(404).json({ error: "Todo not found" });
        return;
      }
      const updatedTodo = await prisma.todo.update({
        where: {
          id,
        },
        data: {
          completed: !todo.completed,
        },
      });
      res.status(200).json(updatedTodo);
    }
  }
}
