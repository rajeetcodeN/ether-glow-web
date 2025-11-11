import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface Career {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export default function CareersManager() {
  const { getData, saveData } = useAdmin();
  const [careers, setCareers] = useState<Career[]>([]);
  const [editing, setEditing] = useState<Career | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setCareers(getData("careers"));
  }, []);

  const handleSave = async () => {
    if (!editing) return;

    let updated;
    if (isNew) {
      updated = [...careers, editing];
    } else {
      const index = careers.findIndex((c) => c.title === editing.title);
      updated = [...careers];
      updated[index] = editing;
    }

    await saveData("careers", updated);
    setCareers(updated);
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = async (title: string) => {
    if (!confirm("Are you sure?")) return;
    const updated = careers.filter((c) => c.title !== title);
    await saveData("careers", updated);
    setCareers(updated);
    toast.success("Job deleted");
  };

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{isNew ? "New Job" : "Edit Job"}</h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={() => { setEditing(null); setIsNew(false); }}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="glow-orange-hover">
              <Save size={16} className="mr-2" />
              Save
            </Button>
          </div>
        </div>

        <GlassCard>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Job Title *</label>
              <Input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="glass border-primary/30"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Department *</label>
                <Input
                  value={editing.department}
                  onChange={(e) => setEditing({ ...editing, department: e.target.value })}
                  className="glass border-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Location *</label>
                <Input
                  value={editing.location}
                  onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                  className="glass border-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Type *</label>
                <Input
                  value={editing.type}
                  onChange={(e) => setEditing({ ...editing, type: e.target.value })}
                  className="glass border-primary/30"
                  placeholder="e.g., Full-time, Contract"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description *</label>
              <Textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="glass border-primary/30"
                rows={4}
              />
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Careers</h1>
        <Button
          onClick={() => {
            setEditing({ title: "", department: "", location: "", type: "Full-time", description: "" });
            setIsNew(true);
          }}
          className="glow-orange-hover"
        >
          <Plus size={16} className="mr-2" />
          New Job Posting
        </Button>
      </div>

      <div className="space-y-4">
        {careers.map((career) => (
          <GlassCard key={career.title} hover={false}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{career.title}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                  <span>📁 {career.department}</span>
                  <span>📍 {career.location}</span>
                  <span>⏰ {career.type}</span>
                </div>
                <p className="text-sm text-muted-foreground">{career.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => { setEditing(career); setIsNew(false); }}>
                  <Edit size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:bg-destructive/20"
                  onClick={() => handleDelete(career.title)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}

        {careers.length === 0 && (
          <GlassCard>
            <div className="text-center py-12">
              <p className="text-muted-foreground">No job postings yet</p>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
