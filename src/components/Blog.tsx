import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock } from "lucide-react";

const blogPosts = [
  {
    category: "Automation",
    title: "The Future of DevOps Engineering: A Confluence of Infrastructure, Automation, AI, and Quantum",
    excerpt: "Exploring how the convergence of infrastructure automation, artificial intelligence, and quantum computing is reshaping the DevOps landscape.",
    date: "2024",
    readTime: "8 min read",
    link: "https://medium.com/@gsujit/the-future-of-devops-engineering-a-confluence-of-infrastructure-automation-ai-and-quantum-89ff08feb0db"
  },
  {
    category: "AI",
    title: "Building ExcelGPT: AI-Powered Spreadsheet Intelligence",
    excerpt: "How custom GPT models are transforming enterprise data analysis and decision-making processes.",
    date: "Mar 2024",
    readTime: "5 min read",
    link: "https://chatgpt.com/g/g-68a7d16bee7c819183b9b7124469644b-excelgpt"
  },
  {
    category: "Automation",
    title: "Infrastructure as Code: A 400% Efficiency Journey",
    excerpt: "Lessons learned from piloting BrainBoard and achieving dramatic improvements in infrastructure delivery.",
    date: "Feb 2024",
    readTime: "7 min read"
  },
  {
    category: "Cloud",
    title: "Cloud-First Strategy in Regulated Industries",
    excerpt: "Navigating compliance, security, and innovation in financial services cloud transformation.",
    date: "Jan 2024",
    readTime: "6 min read"
  },
  {
    category: "Leadership",
    title: "Building High-Performing Global DevOps Teams",
    excerpt: "Strategies for scaling teams across US, Europe, and Asia while maintaining culture and delivery excellence.",
    date: "Dec 2023",
    readTime: "8 min read"
  },
  {
    category: "Innovation",
    title: "SplitBI: Democratizing Business Intelligence",
    excerpt: "The story behind creating an accessible BI tool that empowers non-technical users.",
    date: "Nov 2023",
    readTime: "5 min read",
    link: "https://splitbi.app"
  },
  {
    category: "AI",
    title: "AI-Focus.org: A Platform for AI Transformation",
    excerpt: "Building a community resource to help organizations navigate their AI adoption journey.",
    date: "Oct 2023",
    readTime: "4 min read",
    link: "https://www.ai-focus.org"
  }
];

const categories = ["All", "AI", "Automation", "Cloud", "Leadership", "Innovation"];

export const Blog = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden" id="blog">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 to-background"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxyZWN0IHg9IjIwIiB5PSIyMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBzdHJva2U9IiMzMzY2OTkiIHN0cm9rZS1vcGFjaXR5PSIuMDMiLz48L2c+PC9zdmc+')] opacity-20"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Insights & <span className="text-gradient">Articles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Perspectives on technology leadership, automation, and digital transformation
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12 animate-slide-in">
          {categories.map((category) => (
            <Badge 
              key={category}
              variant={category === "All" ? "default" : "outline"}
              className="px-4 py-2 text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogPosts.map((post, index) => (
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
                      Visit Project
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                ) : (
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between group-hover:text-primary"
                  >
                    Read More
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
