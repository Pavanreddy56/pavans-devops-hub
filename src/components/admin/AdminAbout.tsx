import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export const AdminAbout = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    profileImageUrl: '',
  });
  const [aboutId, setAboutId] = useState<string | null>(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    const { data } = await supabase
      .from('about')
      .select('*')
      .maybeSingle();

    if (data) {
      setAboutId(data.id);
      setFormData({
        name: data.name,
        role: data.role,
        bio: data.bio,
        profileImageUrl: data.profile_image_url || '',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (aboutId) {
      const { error } = await supabase
        .from('about')
        .update({
          name: formData.name,
          role: formData.role,
          bio: formData.bio,
          profile_image_url: formData.profileImageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', aboutId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update about section",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "About section updated successfully!",
        });
      }
    } else {
      const { error } = await supabase
        .from('about')
        .insert([{
          name: formData.name,
          role: formData.role,
          bio: formData.bio,
          profile_image_url: formData.profileImageUrl,
        }]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to create about section",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "About section created successfully!",
        });
        fetchAboutData();
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit About Section</CardTitle>
        <CardDescription>Update your personal information and bio</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profileImageUrl">Profile Image URL</Label>
            <Input
              id="profileImageUrl"
              value={formData.profileImageUrl}
              onChange={(e) => setFormData({ ...formData, profileImageUrl: e.target.value })}
              placeholder="Enter image URL or path"
            />
            <p className="text-sm text-muted-foreground">
              Enter a URL or path to your profile image
            </p>
          </div>

          <Button type="submit">Save Changes</Button>
        </form>
      </CardContent>
    </Card>
  );
};
