import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-gradient mb-4">
              Pavan Reddy Cheedeti
            </h3>
            <p className="text-muted-foreground">
              DevOps Engineer specializing in AWS, Docker, Kubernetes, and CI/CD automation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#blog"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-smooth"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Resume */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex gap-2 mb-4">
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-white hover:border-primary transition-smooth"
                asChild
              >
                <a
                  href="https://github.com/Pavanreddy56"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-white hover:border-primary transition-smooth"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/pavan-reddy-cheedeti-918237281"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="hover:bg-primary hover:text-white hover:border-primary transition-smooth"
                asChild
              >
                <a href="mailto:cpreddy.devops@gmail.com" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <Button
              className="gradient-hero text-white hover:shadow-glow transition-smooth"
              asChild
            >
              <a href="#resume" download>
                Download Resume
              </a>
            </Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border text-center text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            © {currentYear} Pavan Reddy Cheedeti. Built with{" "}
            <Heart className="h-4 w-4 text-red-500 fill-red-500" /> using React
            & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
