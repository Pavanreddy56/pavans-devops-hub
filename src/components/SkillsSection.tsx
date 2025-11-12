import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Cloud,
  Container,
  Database,
  GitBranch,
  Server,
  Settings,
  Terminal,
  Network,
} from "lucide-react";
import { useState, useEffect } from "react";

const defaultSkillCategories = [
  {
    title: "Cloud Platforms",
    icon: Cloud,
    skills: [
      { name: "AWS (EC2, S3, RDS, Lambda, EKS)", level: 90 },
      { name: "Microsoft Azure", level: 75 },
    ],
  },
  {
    title: "Containerization & Orchestration",
    icon: Container,
    skills: [
      { name: "Docker", level: 90 },
      { name: "Kubernetes (EKS, Helm)", level: 85 },
      { name: "Amazon ECS", level: 80 },
    ],
  },
  {
    title: "CI/CD & Automation",
    icon: Settings,
    skills: [
      { name: "Jenkins", level: 90 },
      { name: "GitHub Actions", level: 85 },
      { name: "Maven", level: 80 },
    ],
  },
  {
    title: "Infrastructure as Code",
    icon: Terminal,
    skills: [
      { name: "Terraform", level: 85 },
      { name: "Ansible", level: 85 },
      { name: "CloudFormation", level: 80 },
    ],
  },
  {
    title: "Version Control",
    icon: GitBranch,
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 90 },
      { name: "Bitbucket", level: 85 },
    ],
  },
  {
    title: "Operating Systems",
    icon: Server,
    skills: [
      { name: "Linux (RHEL, CentOS, Ubuntu)", level: 90 },
      { name: "Shell Scripting (Bash)", level: 85 },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    skills: [
      { name: "MySQL", level: 80 },
      { name: "PostgreSQL", level: 80 },
      { name: "MongoDB", level: 75 },
    ],
  },
  {
    title: "Programming & Scripting",
    icon: Terminal,
    skills: [
      { name: "Python", level: 85 },
      { name: "Shell Scripting", level: 90 },
      { name: "Groovy", level: 75 },
    ],
  },
];

const iconMap: Record<string, any> = {
  Cloud,
  Container,
  Database,
  GitBranch,
  Server,
  Settings,
  Terminal,
  Network,
};

export const SkillsSection = () => {
  const [skillCategories, setSkillCategories] = useState(defaultSkillCategories);

  useEffect(() => {
    const saved = localStorage.getItem('skillsData');
    if (saved) {
      const savedData = JSON.parse(saved);
      // Map icon names back to icon components
      const categoriesWithIcons = savedData.map((cat: any) => ({
        ...cat,
        icon: iconMap[cat.title.split(' ')[0]] || Terminal,
      }));
      setSkillCategories(categoriesWithIcons);
    }
  }, []);
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Technical Skills</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive expertise in modern DevOps tools and technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <Card
              key={category.title}
              className="group hover:shadow-lg transition-smooth hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-smooth">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                <div className="space-y-4">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
