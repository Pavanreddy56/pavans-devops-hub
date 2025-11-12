import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "Deploying Microservices on AWS EKS with Helm",
    excerpt: "A comprehensive guide to deploying and managing microservices on Amazon EKS using Helm charts and best practices for production environments.",
    date: "2024-11-15",
    readTime: "8 min read",
    tags: ["Kubernetes", "AWS", "Microservices"],
    slug: "#",
  },
  {
    title: "Infrastructure as Code: Terraform vs CloudFormation",
    excerpt: "An in-depth comparison of Terraform and AWS CloudFormation for infrastructure automation, covering pros, cons, and use cases.",
    date: "2024-11-08",
    readTime: "6 min read",
    tags: ["Terraform", "AWS", "IaC"],
    slug: "#",
  },
  {
    title: "Building CI/CD Pipelines with Jenkins and Docker",
    excerpt: "Step-by-step tutorial on creating robust CI/CD pipelines using Jenkins, Docker, and GitHub for automated deployments.",
    date: "2024-10-28",
    readTime: "10 min read",
    tags: ["Jenkins", "Docker", "CI/CD"],
    slug: "#",
  },
  {
    title: "Securing Your AWS Infrastructure",
    excerpt: "Best practices for securing AWS infrastructure including IAM policies, VPC design, encryption, and security monitoring.",
    date: "2024-10-15",
    readTime: "7 min read",
    tags: ["AWS", "Security", "IAM"],
    slug: "#",
  },
  {
    title: "Ansible Automation: From Basics to Advanced",
    excerpt: "Master Ansible for configuration management and deployment automation with practical examples and real-world scenarios.",
    date: "2024-10-05",
    readTime: "9 min read",
    tags: ["Ansible", "Automation", "DevOps"],
    slug: "#",
  },
  {
    title: "Monitoring Kubernetes with Prometheus and Grafana",
    excerpt: "Complete guide to setting up monitoring and alerting for Kubernetes clusters using Prometheus and Grafana.",
    date: "2024-09-22",
    readTime: "8 min read",
    tags: ["Kubernetes", "Monitoring", "Grafana"],
    slug: "#",
  },
];

export const BlogSection = () => {
  return (
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Latest Blog Posts</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing knowledge about DevOps, cloud computing, and automation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Card
              key={post.title}
              className="group hover:shadow-xl transition-smooth hover:-translate-y-2 flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="group-hover:text-primary transition-smooth line-clamp-2">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-3">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full group-hover:text-primary group-hover:bg-primary/10 transition-smooth"
                  asChild
                >
                  <a href={post.slug}>
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
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
