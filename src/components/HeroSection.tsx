import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [aboutData, setAboutData] = useState({
    name: 'Pavan Reddy Cheedeti',
    role: 'DevOps Engineer',
    bio: 'A Cloud enthusiastic team player with 2+ years of experience in IT industry, specializing in AWS, Docker, Kubernetes, CI/CD pipelines, and infrastructure automation.',
    linkedin: 'https://www.linkedin.com/in/pavan-reddy-cheedeti-918237281',
    github: 'https://github.com/Pavanreddy56',
    email: 'cpreddy.devops@gmail.com',
  });
  const [profileImage, setProfileImage] = useState(profilePhoto);
  const [resumeUrl, setResumeUrl] = useState('#resume');

  useEffect(() => {
    const saved = localStorage.getItem('aboutData');
    if (saved) {
      setAboutData(JSON.parse(saved));
    }
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
      setProfileImage(savedImage);
    }
    const savedResume = localStorage.getItem('resumeUrl');
    if (savedResume) {
      setResumeUrl(savedResume);
    }
  }, []);
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <p className="text-lg text-muted-foreground mb-2">
                Hi, I'm
              </p>
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-gradient">{aboutData.name.split(' ').slice(0, 2).join(' ')}</span>
                <br />
                {aboutData.name.split(' ').slice(2).join(' ')}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
                {aboutData.role}
              </h2>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {aboutData.bio}
            </p>

            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gradient-hero text-white hover:shadow-glow transition-smooth"
                asChild
              >
                <a href="#contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Get In Touch
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white transition-smooth"
                asChild
              >
                <a href={resumeUrl} download>
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:scale-110 transition-smooth"
                asChild
              >
                <a
                  href={aboutData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:scale-110 transition-smooth"
                asChild
              >
                <a
                  href={aboutData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:text-primary hover:scale-110 transition-smooth"
                asChild
              >
                <a
                  href={`mailto:${aboutData.email}`}
                  aria-label="Email"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Content - Profile Photo */}
          <div className="flex justify-center md:justify-end animate-fade-in">
            <div className="relative">
              <div className="absolute -inset-4 gradient-hero opacity-20 blur-2xl rounded-full animate-float"></div>
              <img
                src={profileImage}
                alt={`${aboutData.name} - ${aboutData.role}`}
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-primary shadow-xl hover:shadow-glow transition-smooth hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
