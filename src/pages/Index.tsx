import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Expertise } from "@/components/Expertise";
import { Speaking } from "@/components/Speaking";
import { Testimonials } from "@/components/Testimonials";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen" id="home">
      <Navigation />
      <Hero />
      <Expertise />
      <Speaking />
      <Testimonials />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
