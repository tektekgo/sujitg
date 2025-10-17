import { Linkedin, Mail, ExternalLink } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-primary mb-2">Sujit Gangadharan</h3>
            <p className="text-muted-foreground">
              Enterprise Technology Executive | Digital Transformation Leader
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/sujitg/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-light rounded-full hover:bg-primary transition-colors group"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
            </a>
            <a
              href="mailto:gsujit@gmail.com"
              className="p-3 bg-primary-light rounded-full hover:bg-primary transition-colors group"
              aria-label="Email Contact"
            >
              <Mail className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
            </a>
            <a
              href="https://www.ai-focus.org"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary-light rounded-full hover:bg-primary transition-colors group"
              aria-label="AI Focus Website"
            >
              <ExternalLink className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p className="mb-2">
            © {currentYear} Sujit Gangadharan. All rights reserved.
          </p>
          <p className="text-sm">
            Jacksonville, FL | 904-859-1589 | gsujit@gmail.com
          </p>
        </div>
      </div>
    </footer>
  );
};
