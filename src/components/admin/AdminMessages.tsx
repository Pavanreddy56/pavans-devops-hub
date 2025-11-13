import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Trash2, Mail } from 'lucide-react';

interface Message {
  name: string;
  email: string;
  message: string;
  date: string;
}

export const AdminMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('contactMessages');
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  const deleteMessage = (index: number) => {
    const updated = messages.filter((_, i) => i !== index);
    localStorage.setItem('contactMessages', JSON.stringify(updated));
    setMessages(updated);
    toast({
      title: "Success",
      description: "Message deleted successfully!",
    });
  };

  const clearAll = () => {
    localStorage.removeItem('contactMessages');
    setMessages([]);
    toast({
      title: "Success",
      description: "All messages cleared!",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Contact Messages</CardTitle>
            <CardDescription>View messages from the contact form</CardDescription>
          </div>
          {messages.length > 0 && (
            <Button variant="destructive" onClick={clearAll}>
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {messages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{msg.name}</h3>
                    <p className="text-sm text-muted-foreground">{msg.email}</p>
                  </div>
                  <div className="flex gap-2 items-start">
                    <span className="text-xs text-muted-foreground">{msg.date}</span>
                    <Button size="sm" variant="destructive" onClick={() => deleteMessage(index)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm mt-2">{msg.message}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
