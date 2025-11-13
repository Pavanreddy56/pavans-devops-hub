import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Trash2, Plus, Edit } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Skill {
  id?: string;
  category: string;
  name: string;
  level: number;
}

export const AdminSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [formData, setFormData] = useState<Skill>({
    category: '',
    name: '',
    level: 80,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category');

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch skills",
        variant: "destructive",
      });
    } else {
      setSkills(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      const { error } = await supabase
        .from('skills')
        .update({
          category: formData.category,
          name: formData.name,
          level: formData.level,
        })
        .eq('id', editingId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update skill",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Skill updated successfully!",
        });
        setEditingId(null);
      }
    } else {
      const { error } = await supabase
        .from('skills')
        .insert([formData]);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add skill",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Skill added successfully!",
        });
      }
    }

    resetForm();
    fetchSkills();
  };

  const resetForm = () => {
    setFormData({
      category: '',
      name: '',
      level: 80,
    });
    setEditingId(null);
  };

  const editSkill = (skill: any) => {
    setFormData({
      category: skill.category,
      name: skill.name,
      level: skill.level,
    });
    setEditingId(skill.id);
  };

  const deleteSkill = async (id: string) => {
    const { error } = await supabase
      .from('skills')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete skill",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Skill deleted successfully!",
      });
      fetchSkills();
    }
  };

  // Group skills by category
  const groupedSkills = skills.reduce((acc: Record<string, Skill[]>, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingId ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
          <CardDescription>Manage your technical skills</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Cloud Platforms, CI/CD"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Skill Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., AWS, Docker"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Skill Level: {formData.level}%</Label>
              <Input
                id="level"
                type="range"
                min="0"
                max="100"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) })}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                {editingId ? 'Update' : 'Add'} Skill
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
          <CardTitle>Existing Skills</CardTitle>
          <CardDescription>Organized by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-3">{category}</h3>
                <div className="space-y-2">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                      <div>
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-sm text-muted-foreground ml-2">({skill.level}%)</span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => editSkill(skill)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => deleteSkill(skill.id!)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
