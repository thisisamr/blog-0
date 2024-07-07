import prisma from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const slug = req.query.slug as string;
  if (req.method != "GET") {
    return res.status(405).end("unsupported http verb");
  }
  if (typeof slug == "undefined" || slug.length <= 0) {
    return res.status(400).end("no slug provided");
  }

  try {
    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
    });
    return res.status(200).json(post);
  } catch (err) {
    console.log(err);
    res.status(500).send((err as unknown as Error).message);
  }
}
