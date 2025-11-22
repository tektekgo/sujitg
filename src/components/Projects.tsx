import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Smartphone, Terminal, Globe, Wrench } from "lucide-react";

type ProjectCategory = "All" | "Web Apps" | "CLI Tools" | "Mobile Apps" | "Dev Tools";

interface Project {
  title: string;
  description: string;
  category: ProjectCategory;
  icon: typeof Globe;
  technologies: string[];
  link?: string;
  github?: string;
  status?: string;
}

const projects: Project[] = [
  {
    title: "AI-Focus.org",
    description: "A comprehensive website focused on AI integration and enterprise solutions, showcasing AI capabilities and use cases.",
    category: "Web Apps",
    icon: Globe,
    technologies: ["Web Development", "AI", "Enterprise"],
    link: "https://www.ai-focus.org",
  },
  {
    title: "Sherlock-logs",
    description: "A powerful Python-based CLI tool that helps developers, DevOps engineers, and sysadmins analyze log files quickly and efficiently with styled output, summaries, and export options.",
    category: "CLI Tools",
    icon: Terminal,
    technologies: ["Python", "CLI", "DevOps"],
    github: "https://github.com/jisujit/sherlock-logs",
  },
  {
    title: "Splitbi",
    description: "A PFA/mobile app for expense sharing between friends. Track shared expenses, split bills, and settle up seamlessly.",
    category: "Mobile Apps",
    icon: Smartphone,
    technologies: ["Mobile", "Finance", "Social"],
    status: "Soon on Android & iOS App Stores",
  },
  {
    title: "Dev Workflow Generator",
    description: "Creates persistent development context that bridges every coding session, helping developers maintain continuity and productivity across projects.",
    category: "Dev Tools",
    icon: Wrench,
    technologies: ["Developer Tools", "Productivity", "Automation"],
  },
  {
    title: "Retirement Ready Vault",
    description: "A secure retirement planning application that helps individuals organize and maintain retirement information for easy sharing with consultants or planners.",
    category: "Web Apps",
    icon: Globe,
    technologies: ["Security", "Finance", "Planning"],
    github: "https://github.com/tektekgo/Retirement-Ready-Vault",
  },
];

const categories: ProjectCategory[] = ["All", "Web Apps", "CLI Tools", "Mobile Apps", "Dev Tools"];

export const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section className="py-24 bg-background relative overflow-hidden" id="projects">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik00MCAyMGM1LjUyMyAwIDEwIDQuNDc3IDEwIDEwcy00LjQ3NyAxMC0xMCAxMC0xMC00LjQ3Ny0xMC0xMCA0LjQ3Ny0xMCAxMC0xMHoiIHN0cm9rZT0iIzMzNjY5OSIgc3Ryb2tlLW9wYWNpdHk9Ii4wOCIvPjwvZz48L3N2Zz4=')] opacity-40"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Projects & <span className="text-gradient">Innovations</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Building tools and applications that solve real-world challenges in technology, automation, and enterprise operations
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-in">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`
                transition-all duration-300
                ${selectedCategory === category 
                  ? "bg-primary text-primary-foreground shadow-primary" 
                  : "border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary"
                }
              `}
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <Card 
              key={project.title}
              className="group hover:shadow-primary transition-all duration-300 hover:-translate-y-2 border-border bg-card animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="mb-4 inline-flex p-4 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors duration-300 w-fit">
                  <project.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary"
                      className="bg-secondary/50 text-secondary-foreground border-primary/20"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                {project.status && (
                  <div className="text-sm text-primary font-medium">
                    {project.status}
                  </div>
                )}
                
                <div className="flex gap-3 pt-2">
                  {project.link && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-primary/30 hover:bg-primary/10 hover:border-primary"
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="border-primary/30 hover:bg-primary/10 hover:border-primary"
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};