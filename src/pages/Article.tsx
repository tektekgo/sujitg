import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Clock,
  Calendar,
  Linkedin,
  Twitter,
  Link2,
  Check,
  BookOpen,
  Code2,
  Rss,
  type LucideIcon,
} from "lucide-react";
import { NotionBlockRenderer } from "@/components/NotionBlockRenderer";
import { Footer } from "@/components/Footer";
import blogPosts from "@/data/blogPosts.json";

// Import all article content files
const articleModules = import.meta.glob("@/data/articles/*.json", { eager: true });

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  link?: string | null;
  hasContent?: boolean;
  source: string;
  /** Cross-post: published copies on other platforms (from Notion) */
  mediumURL?: string | null;
  devtoURL?: string | null;
  substackURL?: string | null;
  linkedinURL?: string | null;
  twitterxURL?: string | null;
}

interface NotionBlock {
  id: string;
  type: string;
  [key: string]: unknown;
}

import headshot from "@/assets/headshot.jpg";

// Author info - could be moved to a config file
const author = {
  name: "Sujit Gangadharan",
  title: "Fractional CIO & Advisor for Cloud, AI & Transformation",
  bio: "Leading digital transformation initiatives and building high-performing technology teams across global enterprises.",
  linkedin: "https://www.linkedin.com/in/sujitg/",
  image: headshot
};

const CROSS_POST_LINKS: {
  key: keyof Pick<
    BlogPost,
    "mediumURL" | "devtoURL" | "substackURL" | "linkedinURL" | "twitterxURL"
  >;
  label: string;
  Icon: LucideIcon;
}[] = [
  { key: "mediumURL", label: "Medium", Icon: BookOpen },
  { key: "devtoURL", label: "Dev.to", Icon: Code2 },
  { key: "substackURL", label: "Substack", Icon: Rss },
  { key: "linkedinURL", label: "LinkedIn post", Icon: Linkedin },
  { key: "twitterxURL", label: "X (Twitter)", Icon: Twitter },
];

function CrossPostLinks({ post }: { post: BlogPost }) {
  const items = CROSS_POST_LINKS.filter(({ key }) => {
    const url = post[key];
    return typeof url === "string" && url.trim().length > 0;
  }).map(({ key, label, Icon }) => ({
    url: post[key] as string,
    label,
    Icon,
  }));

  if (items.length === 0) return null;

  return (
    <div className="mb-6 space-y-2">
      <span className="text-sm font-medium text-foreground">Also published on</span>
      <div className="flex flex-wrap gap-2">
        {items.map(({ url, label, Icon }) => (
          <a
            key={label}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            aria-label={`Open on ${label}`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary/30"
          >
            <Icon className="h-4 w-4" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}

function ShareSection({
  copied,
  onShareLinkedIn,
  onShareTwitter,
  onCopyLink,
  className,
}: {
  copied: boolean;
  onShareLinkedIn: () => void;
  onShareTwitter: () => void;
  onCopyLink: () => void;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-sm font-medium text-foreground">Share</span>
      <p className="text-xs text-muted-foreground -mt-1">
        Share this page on your networks or copy the link.
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={onShareLinkedIn} className="gap-2">
          <Linkedin className="h-4 w-4" />
          LinkedIn
        </Button>
        <Button variant="outline" size="sm" onClick={onShareTwitter} className="gap-2">
          <Twitter className="h-4 w-4" />
          X
        </Button>
        <Button variant="outline" size="sm" onClick={onCopyLink} className="gap-2">
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              Copied!
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              Copy link
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

function getAudienceForCategory(category: string): string {
  switch (category) {
    case "AI": return "Leaders exploring AI strategy and adoption";
    case "Cloud": return "CIOs and tech leaders in regulated industries";
    case "Leadership": return "VPs and directors scaling global teams";
    case "Automation": return "DevOps and platform leaders";
    default: return `${category} leaders and practitioners`;
  }
}

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blocks, setBlocks] = useState<NotionBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const post = (blogPosts as BlogPost[]).find((p) => p.id === slug);

  // Get related articles (same category, excluding current)
  const relatedArticles = (blogPosts as BlogPost[])
    .filter((p) => p.category === post?.category && p.id !== slug)
    .slice(0, 3);

  useEffect(() => {
    if (!post) {
      setLoading(false);
      return;
    }

    // If post has external link, redirect
    if (post.link) {
      window.location.href = post.link;
      return;
    }

    // Load article content
    const matchingKey = Object.keys(articleModules).find(key => key.includes(`${slug}.json`));

    if (matchingKey) {
      const module = articleModules[matchingKey] as { default?: NotionBlock[] } | NotionBlock[];
      const content = 'default' in module ? module.default : module;
      setBlocks(content as NotionBlock[]);
    }

    setLoading(false);
  }, [slug, post]);

  const handleCopyLink = async () => {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post?.title || '');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold text-foreground">Article not found</h1>
        <Button onClick={() => navigate("/")} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Button
            onClick={() => navigate("/#blog")}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Articles
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
          {/* Article content - Left side */}
          <article className="flex-grow max-w-3xl">
            {/* Meta */}
            <div className="mb-8">
              <Badge className="mb-4 bg-primary-light text-primary">
                {post.category}
              </Badge>

              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-4">
                {post.excerpt}
              </p>
              <div className="mb-6 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm">
                <span className="font-medium text-foreground">Who this is for: </span>
                <span className="text-muted-foreground">{getAudienceForCategory(post.category)}</span>
              </div>

              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
            </div>

            {/* Author section */}
            <div className="flex items-center gap-4 p-4 bg-card rounded-lg border border-border mb-8">
              <img
                src={author.image}
                alt={author.name}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-foreground">{author.name}</h3>
                <p className="text-sm text-muted-foreground">{author.title}</p>
              </div>
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-primary/20 rounded-full hover:bg-primary transition-colors group"
              >
                <Linkedin className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
              </a>
            </div>

            <CrossPostLinks post={post} />
            <ShareSection
              copied={copied}
              onShareLinkedIn={handleShareLinkedIn}
              onShareTwitter={handleShareTwitter}
              onCopyLink={handleCopyLink}
              className="mb-8 pb-8 border-b border-border"
            />

            {/* Content */}
            {blocks.length > 0 ? (
              <NotionBlockRenderer blocks={blocks} />
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Article content is being prepared.</p>
                <p className="text-sm mt-2">Please check back soon.</p>
              </div>
            )}

            <div className="mt-12 pt-8 border-t border-border space-y-6">
              <CrossPostLinks post={post} />
              <ShareSection
                copied={copied}
                onShareLinkedIn={handleShareLinkedIn}
                onShareTwitter={handleShareTwitter}
                onCopyLink={handleCopyLink}
              />
            </div>
          </article>

          {/* Sidebar - Right side */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    More in {post.category}
                  </h3>
                  <div className="space-y-4">
                    {relatedArticles.map((article) => (
                      <Card key={article.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          {article.link ? (
                            <a
                              href={article.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <h4 className="font-medium text-card-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
                                {article.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {article.readTime}
                              </div>
                            </a>
                          ) : article.hasContent ? (
                            <Link to={`/blog/${article.id}`} className="block">
                              <h4 className="font-medium text-card-foreground hover:text-primary transition-colors line-clamp-2 mb-2">
                                {article.title}
                              </h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {article.readTime}
                              </div>
                            </Link>
                          ) : (
                            <div>
                              <h4 className="font-medium text-card-foreground line-clamp-2 mb-2">
                                {article.title}
                              </h4>
                              <div className="text-xs text-muted-foreground italic">
                                Coming soon
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Back to all articles */}
              <Button
                onClick={() => navigate("/#blog")}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                All Articles
              </Button>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
