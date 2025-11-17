import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  avatar: string;
  linkedin?: string;
}

export default function TeamManager() {
  const { getData, saveData } = useAdmin();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TeamMember>({
    id: "",
    name: "",
    role: "",
    description: "",
    avatar: "",
    linkedin: "",
  });

  useEffect(() => {
    const savedTeam = getData("team");
    if (savedTeam && savedTeam.length > 0) {
      setTeam(savedTeam);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.role || !formData.description) {
      toast.error("Please fill in all required fields");
      return;
    }

    let updatedTeam;
    if (editingId) {
      updatedTeam = team.map((member) =>
        member.id === editingId ? { ...formData, id: editingId } : member
      );
      toast.success("Team member updated successfully");
    } else {
      const newMember = { ...formData, id: Date.now().toString() };
      updatedTeam = [...team, newMember];
      toast.success("Team member added successfully");
    }

    await saveData("team", updatedTeam);
    setTeam(updatedTeam);
    resetForm();
  };

  const handleEdit = (member: TeamMember) => {
    setFormData(member);
    setEditingId(member.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    const updatedTeam = team.filter((member) => member.id !== id);
    await saveData("team", updatedTeam);
    setTeam(updatedTeam);
    toast.success("Team member deleted successfully");
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      role: "",
      description: "",
      avatar: "",
      linkedin: "",
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Team Management</h1>
        <p className="text-muted-foreground">Manage your team members</p>
      </div>

      {/* Form */}
      <GlassCard>
        <h2 className="text-2xl font-bold mb-6">
          {editingId ? "Edit Team Member" : "Add Team Member"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <ImageUpload
            label="Avatar Image"
            value={formData.avatar}
            onChange={(url) => setFormData({ ...formData, avatar: url })}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Name *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Role/Title *
              </label>
              <Input
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                placeholder="SALESFORCE DEVELOPER"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Description *
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              placeholder="Experience and expertise..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              LinkedIn URL (optional)
            </label>
            <Input
              type="url"
              value={formData.linkedin}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="flex space-x-3">
            <Button type="submit" className="glow-orange-hover">
              {editingId ? "Update Member" : "Add Member"}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </GlassCard>

      {/* Team List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Team Members ({team.length})</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member) => (
            <GlassCard key={member.id}>
              <div className="text-center">
                {member.avatar ? (
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-secondary">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <p className="text-sm font-semibold text-primary mb-3 uppercase">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {member.description}
                </p>

                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-primary mb-4 hover:underline"
                  >
                    <ExternalLink size={14} className="mr-1" />
                    LinkedIn
                  </a>
                )}

                <div className="flex space-x-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(member)}
                    className="flex-1"
                  >
                    <Edit size={16} className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(member.id)}
                    className="text-destructive border-destructive/50 hover:bg-destructive/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {team.length === 0 && (
          <GlassCard className="text-center py-12">
            <Plus size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              No team members yet. Add your first team member above.
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
