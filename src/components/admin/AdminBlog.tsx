import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Trash2, Edit } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  link: string;
}

export const AdminBlog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<BlogPost>({
    title: '',
    excerpt: '',
    date: new Date().toISOString().split('T')[0],
    link: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('blogData');
    if (saved) {
      setPosts(JSON.parse(saved));
    }
  }, []);

  const savePosts = (updatedPosts: BlogPost[]) => {
    localStorage.setItem('blogData', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    toast({
      title: "Success",
      description: "Blog posts updated successfully!",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...posts];
      updated[editingIndex] = formData;
      savePosts(updated);
      setEditingIndex(null);
    } else {
      savePosts([...posts, formData]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      date: new Date().toISOString().split('T')[0],
      link: '',
    });
    setEditingIndex(null);
  };

  const editPost = (index: number) => {
    setFormData(posts[index]);
    setEditingIndex(index);
  };

  const deletePost = (index: number) => {
    const updated = posts.filter((_, i) => i !== index);
    savePosts(updated);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingIndex !== null ? 'Edit Post' : 'Add New Post'}</CardTitle>
          <CardDescription>Create or update blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Link</Label>
              <Input
                id="link"
                type="url"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingIndex !== null ? 'Update' : 'Add'} Post
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
          <CardTitle>Existing Posts</CardTitle>
          <CardDescription>Manage your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {posts.map((post, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <h3 className="font-semibold mb-1">{post.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground mb-3">{post.date}</p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => editPost(index)}>
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deletePost(index)}>
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
