import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";
import blogPosts from "@/data/blogPosts.json";

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
}

const categories = ["All", "AI", "Automation", "Cloud", "Leadership", "Innovation"];

function getAudienceForCategory(category: string): string {
  switch (category) {
    case "AI": return "Leaders exploring AI strategy and adoption";
    case "Cloud": return "CIOs and tech leaders in regulated industries";
    case "Leadership": return "VPs and directors scaling global teams";
    case "Automation": return "DevOps and platform leaders";
    default: return `${category} leaders and practitioners`;
  }
}

export const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = selectedCategory === "All"
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <section className="py-24 bg-background relative overflow-hidden scroll-mt-20 lg:scroll-mt-24" id="blog">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBzdHJva2U9IiMzMzY2OTkiIHN0cm9rZS1vcGFjaXR5PSIuMDMiLz48L2c+PC9zdmc+')] opacity-20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Insights & <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Field notes on adoption, platforms, and leadership—for operating executives who want signal, not noise.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12 animate-slide-in">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === selectedCategory ? "default" : "outline"}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredPosts.map((post, index) => (
            <Card 
              key={index}
              className="group hover:shadow-primary transition-all duration-300 hover:-translate-y-2 border-border animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4">
                  <Badge className="bg-primary-light text-primary">
                    {post.category}
                  </Badge>
                </div>

                <h3 className="text-xl font-bold mb-3 text-card-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-muted-foreground mb-4 flex-grow leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="text-xs font-medium text-primary/90 mb-4">
                  For: {getAudienceForCategory(post.category)}
                </p>

                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>

                {post.link ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:text-primary"
                    asChild
                  >
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      Read Article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                ) : (post as BlogPost).hasContent ? (
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:text-primary"
                    asChild
                  >
                    <Link to={`/blog/${post.id}`}>
                      Read Article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                ) : (
                  <div className="text-sm text-muted-foreground italic text-center py-2">
                    Coming Soon
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
