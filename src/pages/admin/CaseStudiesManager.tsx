import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface CaseStudy {
  title: string;
  slug: string;
  client: string;
  category: string;
  challenge: string;
  solution: string;
  impact: string;
  image: string;
}

export default function CaseStudiesManager() {
  const { getData, saveData } = useAdmin();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setCaseStudies(getData("caseStudies"));
  }, []);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleSave = async () => {
    if (!editing) return;

    const caseStudy = {
      ...editing,
      slug: editing.slug || generateSlug(editing.title),
    };

    let updated;
    if (isNew) {
      updated = [...caseStudies, caseStudy];
    } else {
      updated = caseStudies.map((cs) => (cs.slug === caseStudy.slug ? caseStudy : cs));
    }

    await saveData("caseStudies", updated);
    setCaseStudies(updated);
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure?")) return;
    const updated = caseStudies.filter((cs) => cs.slug !== slug);
    await saveData("caseStudies", updated);
    setCaseStudies(updated);
    toast.success("Case study deleted");
  };

  const handleNew = () => {
    setEditing({
      title: "",
      slug: "",
      client: "",
      category: "Salesforce",
      challenge: "",
      solution: "",
      impact: "",
      image: "",
    });
    setIsNew(true);
  };

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{isNew ? "New Case Study" : "Edit Case Study"}</h1>
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
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Title *</label>
                <Input
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="glass border-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Client *</label>
                <Input
                  value={editing.client}
                  onChange={(e) => setEditing({ ...editing, client: e.target.value })}
                  className="glass border-primary/30"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Category *</label>
              <Input
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="glass border-primary/30"
                placeholder="e.g., Salesforce, AI, SAP"
              />
            </div>

            <ImageUpload
              value={editing.image}
              onChange={(url) => setEditing({ ...editing, image: url })}
              label="Featured Image"
            />

            <div>
              <label className="text-sm font-medium mb-2 block">Challenge *</label>
              <Textarea
                value={editing.challenge}
                onChange={(e) => setEditing({ ...editing, challenge: e.target.value })}
                className="glass border-primary/30"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Solution *</label>
              <Textarea
                value={editing.solution}
                onChange={(e) => setEditing({ ...editing, solution: e.target.value })}
                className="glass border-primary/30"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Impact *</label>
              <Textarea
                value={editing.impact}
                onChange={(e) => setEditing({ ...editing, impact: e.target.value })}
                className="glass border-primary/30"
                rows={2}
                placeholder="e.g., 35% increase in productivity, 50% cost reduction"
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
        <h1 className="text-4xl font-bold">Case Studies</h1>
        <Button onClick={handleNew} className="glow-orange-hover">
          <Plus size={16} className="mr-2" />
          New Case Study
        </Button>
      </div>

      <div className="grid gap-4">
        {caseStudies.map((cs) => (
          <GlassCard key={cs.slug} hover={false}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">{cs.category}</span>
                  <span className="text-xs text-muted-foreground">{cs.client}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{cs.title}</h3>
                <p className="text-sm text-primary font-semibold">{cs.impact}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { setEditing(cs); setIsNew(false); }}
                >
                  <Edit size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:bg-destructive/20"
                  onClick={() => handleDelete(cs.slug)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}

        {caseStudies.length === 0 && (
          <GlassCard>
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No case studies yet</p>
              <Button onClick={handleNew} variant="outline" className="border-primary/50">
                <Plus size={16} className="mr-2" />
                Create First Case Study
              </Button>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
