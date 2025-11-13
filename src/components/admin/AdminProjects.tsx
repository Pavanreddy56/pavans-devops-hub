import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Trash2, Plus, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Project {
  id?: string;
  title: string;
  description: string;
  tech: string[];
  github_url: string;
  live_url: string;
}

export const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    tech: [],
    github_url: '',
    live_url: '',
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch projects",
        variant: "destructive",
      });
    } else {
      setProjects(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from('projects')
        .update({
          title: formData.title,
          description: formData.description,
          tech: formData.tech,
          github_url: formData.github_url,
          live_url: formData.live_url,
        })
        .eq('id', editingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update project",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Project updated successfully!",
        });
        setEditingId(null);
      }
    } else {
      const { error } = await supabase
        .from('projects')
        .insert([formData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add project",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Project added successfully!",
        });
      }
    }
    
    resetForm();
    fetchProjects();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tech: [],
      github_url: '',
      live_url: '',
    });
    setTechInput('');
    setEditingId(null);
  };

  const editProject = (project: any) => {
    setFormData({
      title: project.title,
      description: project.description,
      tech: project.tech,
      github_url: project.github_url,
      live_url: project.live_url,
    });
    setTechInput(project.tech.join(', '));
    setEditingId(project.id);
  };

  const deleteProject = async (id: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete project",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Project deleted successfully!",
      });
      fetchProjects();
    }
  };

  const handleTechChange = (value: string) => {
    setTechInput(value);
    setFormData({ ...formData, tech: value.split(',').map(t => t.trim()).filter(t => t) });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Project' : 'Add New Project'}</CardTitle>
          <CardDescription>Fill in the project details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tech">Tech Stack (comma separated)</Label>
              <Input
                id="tech"
                value={techInput}
                onChange={(e) => handleTechChange(e.target.value)}
                placeholder="Docker, Kubernetes, AWS"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL</Label>
              <Input
                id="github"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="live">Live URL</Label>
              <Input
                id="live"
                value={formData.live_url}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? 'Update' : 'Add'} Project
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Projects</CardTitle>
          <CardDescription>Manage your projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                <div className="flex gap-2 flex-wrap mb-3">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-primary/10 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => editProject(project)}>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteProject(project.id!)}>
                    <Trash2 className="h-3 w-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
