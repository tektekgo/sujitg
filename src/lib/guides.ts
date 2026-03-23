import matter from "gray-matter";
import Slugger from "github-slugger";

const guideModules = import.meta.glob("../content/guides/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const GUIDES_PREFIX = "../content/guides/";

export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  updated?: string;
  order: number;
  series?: string;
  seriesLabel?: string;
  role?: string;
  relatedSlugs?: string[];
  relatedBlogId?: string;
  /** Relative path under guides/ for debugging */
  sourcePath: string;
}

export interface GuideDoc extends GuideMeta {
  body: string;
}

function pathToDefaultSlug(filePath: string): string {
  const rel = filePath.replace(/^\.\.\/content\/guides\//, "").replace(/\.md$/i, "");
  return rel.replace(/\\/g, "/").replace(/\//g, "-");
}

function parseGuideFile(filePath: string, raw: string): GuideDoc | null {
  const { data, content } = matter(raw);
  const title = typeof data.title === "string" ? data.title.trim() : "";
  if (!title) return null;

  const defaultSlug = pathToDefaultSlug(filePath);
  const slug =
    typeof data.slug === "string" && data.slug.trim()
      ? data.slug.trim().replace(/^\/+|\/+$/g, "")
      : defaultSlug;

  const description =
    typeof data.description === "string" ? data.description.trim() : "";

  const order = typeof data.order === "number" && Number.isFinite(data.order) ? data.order : 999;

  const relatedSlugs = Array.isArray(data.relatedSlugs)
    ? data.relatedSlugs.filter((s: unknown): s is string => typeof s === "string")
    : undefined;

  const relatedBlogId =
    typeof data.relatedBlogId === "string" && data.relatedBlogId.trim()
      ? data.relatedBlogId.trim()
      : undefined;

  return {
    slug,
    title,
    description,
    updated: typeof data.updated === "string" ? data.updated : undefined,
    order,
    series: typeof data.series === "string" ? data.series : undefined,
    seriesLabel: typeof data.seriesLabel === "string" ? data.seriesLabel : undefined,
    role: typeof data.role === "string" ? data.role : undefined,
    relatedSlugs,
    relatedBlogId,
    sourcePath: filePath.replace(GUIDES_PREFIX, ""),
    body: content.trim(),
  };
}

function loadAllGuides(): GuideDoc[] {
  const list: GuideDoc[] = [];
  for (const [path, raw] of Object.entries(guideModules)) {
    const doc = parseGuideFile(path, raw);
    if (doc) list.push(doc);
  }
  return list;
}

let cache: GuideDoc[] | null = null;

export function getAllGuides(): GuideDoc[] {
  if (!cache) cache = loadAllGuides();
  return cache;
}

export function getGuideBySlug(slug: string): GuideDoc | undefined {
  return getAllGuides().find((g) => g.slug === slug);
}

export function getGuidesForBlogId(blogId: string): GuideMeta[] {
  return getAllGuides()
    .filter((g) => g.relatedBlogId === blogId)
    .sort((a, b) => {
      if (a.order !== b.order) return a.order - b.order;
      const sa = a.series ?? "";
      const sb = b.series ?? "";
      if (sa !== sb) return sa.localeCompare(sb);
      return a.title.localeCompare(b.title);
    })
    .map(({ body: _, ...meta }) => meta);
}

export function extractToc(markdownBody: string): { depth: 2 | 3; text: string; id: string }[] {
  const slugger = new Slugger();
  const toc: { depth: 2 | 3; text: string; id: string }[] = [];
  const lines = markdownBody.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    const m = /^(#{2,3})\s+(.+)$/.exec(trimmed);
    if (!m) continue;
    const depth = m[1].length as 2 | 3;
    if (depth !== 2 && depth !== 3) continue;
    const text = m[2].replace(/\s+#+\s*$/, "").trim();
    if (!text) continue;
    toc.push({ depth, text, id: slugger.slug(text) });
  }
  return toc;
}
