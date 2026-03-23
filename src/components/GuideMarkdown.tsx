import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { Components } from "react-markdown";

const rehypePlugins = [
  rehypeSlug,
  [rehypeAutolinkHeadings, { behavior: "wrap" as const }],
] as const;

const markdownComponents: Components = {
  a: ({ href, children, className, ...props }) => {
    if (href?.startsWith("/")) {
      return (
        <Link to={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  },
};

export function GuideMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="guide-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[...rehypePlugins] as never}
        components={markdownComponents}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
