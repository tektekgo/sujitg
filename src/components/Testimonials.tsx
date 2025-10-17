import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Quote, Linkedin } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Chief Information Officer",
    company: "Fortune 500 Insurance Company",
    text: "Sujit's ability to align technology strategy with business objectives is unparalleled. He led our cloud transformation initiative that resulted in a 30% cost reduction while significantly improving our infrastructure delivery speed.",
    linkedIn: "#"
  },
  {
    name: "James Rodriguez",
    role: "VP of Technology",
    company: "Financial Services Firm",
    text: "Working with Sujit on our DevOps transformation was a game-changer. His expertise in building high-performing global teams and implementing automation frameworks delivered measurable results - 50% faster deployments and 99.99% uptime.",
    linkedIn: "#"
  },
  {
    name: "Emily Chen",
    role: "Director of Engineering",
    company: "Technology Company",
    text: "Sujit's leadership in M&A technology integration is exceptional. He seamlessly guided our teams through complex system consolidations while maintaining business continuity and driving innovation.",
    linkedIn: "#"
  },
  {
    name: "Michael Thompson",
    role: "Board Member",
    company: "Enterprise Technology Advisory",
    text: "As a technology executive and strategic advisor, Sujit brings a rare combination of deep technical expertise and business acumen. His insights on AI integration and digital transformation have been invaluable to our organization.",
    linkedIn: "#"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-secondary" id="testimonials">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What People <span className="text-gradient">Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Recommendations from colleagues and business partners
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/1">
                  <Card className="h-full border-border bg-card shadow-card hover:shadow-primary transition-all duration-300">
                    <CardContent className="p-8">
                      <Quote className="h-10 w-10 text-primary mb-4 opacity-50" />
                      
                      <p className="text-lg text-card-foreground leading-relaxed mb-6 italic">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="flex items-center justify-between border-t border-border pt-6">
                        <div>
                          <p className="font-bold text-card-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-primary">
                            {testimonial.role}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.company}
                          </p>
                        </div>
                        
                        <a 
                          href={testimonial.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-primary-light hover:bg-primary transition-colors duration-300 group"
                        >
                          <Linkedin className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};
