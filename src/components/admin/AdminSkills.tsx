import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Trash2, Plus } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
}

export const AdminSkills = () => {
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState(80);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem('skillsData');
    if (saved) {
      setCategories(JSON.parse(saved));
    }
  }, []);

  const saveSkills = (updatedCategories: SkillCategory[]) => {
    localStorage.setItem('skillsData', JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
    toast({
      title: "Success",
      description: "Skills updated successfully!",
    });
  };

  const addCategory = () => {
    if (newCategory.trim()) {
      const updated = [...categories, { title: newCategory, skills: [] }];
      saveSkills(updated);
      setNewCategory('');
    }
  };

  const deleteCategory = (index: number) => {
    const updated = categories.filter((_, i) => i !== index);
    saveSkills(updated);
    setSelectedCategory(0);
  };

  const addSkill = () => {
    if (newSkillName.trim() && categories[selectedCategory]) {
      const updated = [...categories];
      updated[selectedCategory].skills.push({
        name: newSkillName,
        level: newSkillLevel,
      });
      saveSkills(updated);
      setNewSkillName('');
      setNewSkillLevel(80);
    }
  };

  const deleteSkill = (categoryIndex: number, skillIndex: number) => {
    const updated = [...categories];
    updated[categoryIndex].skills = updated[categoryIndex].skills.filter((_, i) => i !== skillIndex);
    saveSkills(updated);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Categories</CardTitle>
          <CardDescription>Add or remove skill categories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="New category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <Button onClick={addCategory}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            {categories.map((category, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <span className="font-medium">{category.title}</span>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedCategory(index)}
                  >
                    Select
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteCategory(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Skills</CardTitle>
          <CardDescription>
            {categories[selectedCategory]
              ? `Add or remove skills in ${categories[selectedCategory].title}`
              : 'Select a category first'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {categories[selectedCategory] && (
            <>
              <div className="space-y-2">
                <Label>Skill Name</Label>
                <Input
                  placeholder="Enter skill name"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Skill Level: {newSkillLevel}%</Label>
                <Input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkillLevel}
                  onChange={(e) => setNewSkillLevel(Number(e.target.value))}
                />
              </div>
              <Button onClick={addSkill} className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Skill
              </Button>

              <div className="space-y-2 mt-4">
                {categories[selectedCategory].skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <div>
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground ml-2">({skill.level}%)</span>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteSkill(selectedCategory, skillIndex)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
