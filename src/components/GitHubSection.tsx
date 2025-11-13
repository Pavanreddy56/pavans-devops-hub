import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, GitFork, Star, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const languageColors: Record<string, string> = {
  HCL: "#844fba",
  YAML: "#cb171e",
  Groovy: "#4298b8",
  Python: "#3572a5",
  Shell: "#89e051",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
};

export const GitHubSection = () => {
  const [repos, setRepos] = useState<any[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      const { data } = await supabase
        .from('github_repos')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(4);

      if (data) {
        setRepos(data);
      }
    };

    fetchRepos();
  }, []);
  return (
    <section id="github" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">GitHub Repositories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Open-source contributions and personal projects
          </p>
          <Button
            size="lg"
            className="gradient-hero text-white hover:shadow-glow transition-smooth"
            asChild
          >
            <a
              href="https://github.com/Pavanreddy56"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5" />
              View All Repositories
            </a>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {repos.map((repo, index) => (
            <Card
              key={repo.name}
              className="group hover:shadow-lg transition-smooth hover:-translate-y-1 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="group-hover:text-primary transition-smooth flex items-center gap-2">
                      <Github className="h-5 w-5" />
                      {repo.name}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {repo.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: languageColors[repo.language] || "#888",
                        }}
                      />
                      <span>{repo.language}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork className="h-4 w-4" />
                      <span>{repo.forks}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:text-primary"
                    asChild
                  >
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${repo.name} repository`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
