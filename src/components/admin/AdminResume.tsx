import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Upload, FileText } from 'lucide-react';

export const AdminResume = () => {
  const [resumeUrl, setResumeUrl] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('resumeUrl');
    if (saved) {
      setResumeUrl(saved);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: "Error",
          description: "Please upload a PDF file",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        localStorage.setItem('resumeUrl', url);
        setResumeUrl(url);
        toast({
          title: "Success",
          description: "Resume uploaded successfully!",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('resumeUrl', resumeUrl);
    toast({
      title: "Success",
      description: "Resume URL updated successfully!",
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Upload Resume PDF</CardTitle>
          <CardDescription>Upload a PDF file of your resume</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="resume">Resume File</Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf"
              onChange={handleFileUpload}
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Upload className="h-4 w-4" />
            <span>Upload a PDF file (recommended)</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Or Add Resume URL</CardTitle>
          <CardDescription>Link to your resume hosted elsewhere</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUrlSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input
                id="resumeUrl"
                type="url"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <Button type="submit" className="w-full">
              Save URL
            </Button>
          </form>

          {resumeUrl && (
            <div className="mt-6 p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium">Current Resume</span>
              </div>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline break-all"
              >
                View Resume
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
