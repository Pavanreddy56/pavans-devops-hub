import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useState, useEffect } from "react";

const defaultProjects = [
  {
    title: "AWS Infrastructure Automation",
    description: "Automated AWS infrastructure deployment using Terraform and CloudFormation, including VPC, EC2, RDS, S3, and ELB configuration with IAM security policies.",
    tech: ["AWS", "Terraform", "CloudFormation", "IAM", "VPC"],
    github: "#",
    live: "#",
  },
  {
    title: "CI/CD Pipeline Implementation",
    description: "Built end-to-end CI/CD pipelines using Jenkins, GitHub, Maven, and SonarQube for automated build, test, and deployment of microservices.",
    tech: ["Jenkins", "GitHub", "Maven", "SonarQube", "Docker"],
    github: "#",
    live: "#",
  },
  {
    title: "Kubernetes Cluster on AWS EKS",
    description: "Deployed and managed production-ready Kubernetes clusters on AWS EKS with Helm charts, auto-scaling, and monitoring using Prometheus and Grafana.",
    tech: ["Kubernetes", "AWS EKS", "Helm", "Prometheus", "Grafana"],
    github: "#",
    live: "#",
  },
  {
    title: "Microservices Deployment with Docker",
    description: "Containerized Java REST APIs and deployed them using Docker and Amazon ECS. Implemented service discovery and load balancing.",
    tech: ["Docker", "Amazon ECS", "Java", "Microservices", "REST API"],
    github: "#",
    live: "#",
  },
  {
    title: "Configuration Management with Ansible",
    description: "Developed Ansible playbooks and roles for automated server configuration, application deployment, and infrastructure management across multiple environments.",
    tech: ["Ansible", "Python", "Linux", "YAML", "Shell Scripting"],
    github: "#",
    live: "#",
  },
  {
    title: "Hybrid Cloud Migration",
    description: "Planned and executed hybrid cloud migration from on-premises to AWS with minimal downtime. Implemented monitoring using ELK stack and New Relic.",
    tech: ["AWS", "Azure", "ELK Stack", "New Relic", "Migration"],
    github: "#",
    live: "#",
  },
];

export const ProjectsSection = () => {
  const [projects, setProjects] = useState(defaultProjects);

  useEffect(() => {
    const saved = localStorage.getItem('projectsData');
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);
  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Notable DevOps and cloud infrastructure projects showcasing automation and scalability
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="group hover:shadow-xl transition-smooth hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <CardTitle className="group-hover:text-primary transition-smooth">
                  {project.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary hover:text-white transition-smooth"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 hover:bg-primary hover:text-white hover:border-primary transition-smooth"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button
                  size="sm"
                  className="flex-1 gradient-hero text-white hover:shadow-glow transition-smooth"
                  asChild
                >
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Details
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
