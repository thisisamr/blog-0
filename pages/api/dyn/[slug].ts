import prisma from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { buildDynamicMDX, buildDynamicMeta } from "nextra/remote";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = req.query
  let dynamicMdx = {};
  try {
    const r = await prisma.post.findFirst({ where: { slug: params.slug as string } });
    const t = r != null ? r.content : "";
    dynamicMdx = await buildDynamicMDX(t, { mdxOptions: {} });
    return res.json({
      props: {
        ...dynamicMdx,
      },
    });
  } catch (error) {
    console.log(error);

    dynamicMdx = await buildDynamicMDX(
      "# Error\n\n## OOPS We Couldn't Get Your Post Please Be patient we Are under Construction\n\n## 🚧",
      { mdxOptions: {} }
    );
    return res.json({
      props: {
        error,
        ...dynamicMdx,
      },
    });
  }
}
