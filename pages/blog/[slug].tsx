import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import prisma from "../../prisma/prisma";
export const getServerSideProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  try {
    const r = await prisma.post.findFirst({ where: { slug: params.slug } });

    const data = await serialize(r!.content, {
      parseFrontmatter: true,
      mdxOptions: { rehypePlugins: [rehypePrettyCode, rehypeSlug] },
    });
    return {
      props: data,
    };
  } catch (error) {
    console.log(error);

    return {
      props: {},
    };
  }
};

export default function Post(props: any) {
  return (
    <div className="prose mx-auto mt-20 mb-8">
      <MDXRemote
        {...props}
        components={{
          h1: ({ children }) => {
            return <h1 className="dark:text-zinc-300">{children}</h1>;
          },
          blockquote: ({ children }) => {
            return (
              <div className="bg-slate-900  text-white font-bold italic p-4 rounded-md">
                {children}
              </div>
            );
          },
          code: ({ children }) => {
            return <code className="dark:text-teal-600">{children}</code>;
          },
          li: ({ children }) => {
            return <li className="dark:text-white">{children}</li>;
          },
          strong: ({ children }) => {
            return (
              <strong className="dark:text-white font-bold">{children}</strong>
            );
          },
          p: ({ children }) => {
            return <p className="dark:text-white">{children}</p>;
          },
          h3: ({ children }) => {
            return <h3 className="dark:text-white">{children}</h3>;
          },
        }}
      />
    </div>
  );
}
