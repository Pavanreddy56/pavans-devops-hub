import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Trash2, Plus, Edit } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  live: string;
}

export const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    tech: [],
    github: '',
    live: '',
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('projectsData');
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  const saveProjects = (updatedProjects: Project[]) => {
    localStorage.setItem('projectsData', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    toast({
      title: "Success",
      description: "Projects updated successfully!",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...projects];
      updated[editingIndex] = formData;
      saveProjects(updated);
      setEditingIndex(null);
    } else {
      saveProjects([...projects, formData]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      tech: [],
      github: '',
      live: '',
    });
    setTechInput('');
    setEditingIndex(null);
  };

  const editProject = (index: number) => {
    setFormData(projects[index]);
    setTechInput(projects[index].tech.join(', '));
    setEditingIndex(index);
  };

  const deleteProject = (index: number) => {
    const updated = projects.filter((_, i) => i !== index);
    saveProjects(updated);
  };

  const handleTechChange = (value: string) => {
    setTechInput(value);
    setFormData({ ...formData, tech: value.split(',').map(t => t.trim()).filter(t => t) });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingIndex !== null ? 'Edit Project' : 'Add New Project'}</CardTitle>
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
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="live">Live URL</Label>
              <Input
                id="live"
                value={formData.live}
                onChange={(e) => setFormData({ ...formData, live: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingIndex !== null ? 'Update' : 'Add'} Project
              </Button>
              {editingIndex !== null && (
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
            {projects.map((project, index) => (
              <div key={index} className="p-4 border rounded-lg">
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
                  <Button size="sm" variant="outline" onClick={() => editProject(index)}>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteProject(index)}>
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
