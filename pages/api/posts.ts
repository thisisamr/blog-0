import prisma from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const posts = await prisma.post.findMany({});
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).send((err as unknown as Error).message);
  }
}
