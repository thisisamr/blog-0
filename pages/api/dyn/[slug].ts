import prisma from "@/prisma/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { buildDynamicMDX, buildDynamicMeta } from "nextra/remote";
import { serialize} from 'next-mdx-remote/serialize'
import {compileMDX} from 'next-mdx-remote/rsc'
import { MDXRemote } from 'next-mdx-remote'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = req.query
 
 
    const r = await prisma.post.findFirst({ where: { slug: params.slug as string } });
    console.log(r?.content)
    const s =await serialize(
      // Raw MDX contents as a string
      r!.content,
      // Optional parameters
      {
        // made available to the arguments of any custom MDX component
        scope: {},
        // MDX's available options, see the MDX docs for more info.
        // https://mdxjs.com/packages/mdx/#compilefile-options
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
          format: 'mdx',
        },
        // Indicates whether or not to parse the frontmatter from the MDX source
        parseFrontmatter: true,
      }
    )

return res.json(s)
  
}
