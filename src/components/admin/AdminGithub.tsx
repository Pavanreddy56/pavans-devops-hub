import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Trash2, Plus, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface GithubRepo {
  id?: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export const AdminGithub = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<GithubRepo>({
    name: '',
    description: '',
    stars: 0,
    forks: 0,
    language: '',
    url: '',
  });

  useEffect(() => {
    fetchRepos();
  }, []);

  const fetchRepos = async () => {
    const { data, error } = await supabase
      .from('github_repos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch GitHub repos",
        variant: "destructive",
      });
    } else {
      setRepos(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      const { error } = await supabase
        .from('github_repos')
        .update({
          name: formData.name,
          description: formData.description,
          stars: formData.stars,
          forks: formData.forks,
          language: formData.language,
          url: formData.url,
        })
        .eq('id', editingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update repository",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Repository updated successfully!",
        });
        setEditingId(null);
      }
    } else {
      const { error } = await supabase
        .from('github_repos')
        .insert([{
          name: formData.name,
          description: formData.description,
          stars: formData.stars,
          forks: formData.forks,
          language: formData.language,
          url: formData.url,
        }]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add repository",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Repository added successfully!",
        });
      }
    }
    
    resetForm();
    fetchRepos();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      stars: 0,
      forks: 0,
      language: '',
      url: '',
    });
    setEditingId(null);
  };

  const editRepo = (repo: any) => {
    setFormData({
      name: repo.name,
      description: repo.description || '',
      stars: repo.stars,
      forks: repo.forks,
      language: repo.language || '',
      url: repo.url,
    });
    setEditingId(repo.id);
  };

  const deleteRepo = async (id: string) => {
    const { error } = await supabase
      .from('github_repos')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete repository",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Repository deleted successfully!",
      });
      fetchRepos();
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Repository' : 'Add New Repository'}</CardTitle>
          <CardDescription>Manage your GitHub repository showcase</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Repository Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stars">Stars</Label>
                <Input
                  id="stars"
                  type="number"
                  value={formData.stars}
                  onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value) || 0 })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="forks">Forks</Label>
                <Input
                  id="forks"
                  type="number"
                  value={formData.forks}
                  onChange={(e) => setFormData({ ...formData, forks: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Repository URL</Label>
              <Input
                id="url"
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? 'Update' : 'Add'} Repository
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
          <CardTitle>Existing Repositories</CardTitle>
          <CardDescription>Manage your GitHub showcase</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {repos.map((repo) => (
              <div key={repo.id} className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-2">{repo.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{repo.description}</p>
                <div className="flex gap-4 text-xs text-muted-foreground mb-3">
                  <span>⭐ {repo.stars}</span>
                  <span>🔀 {repo.forks}</span>
                  {repo.language && <span>💻 {repo.language}</span>}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => editRepo(repo)}>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteRepo(repo.id!)}>
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
