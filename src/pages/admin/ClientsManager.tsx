import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Client {
  id: string;
  name: string;
  logo: string;
}

export default function ClientsManager() {
  const { getData, saveData } = useAdmin();
  const [clients, setClients] = useState<Client[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Client>({
    id: "",
    name: "",
    logo: "",
  });

  useEffect(() => {
    const savedClients = getData("clients");
    if (savedClients && savedClients.length > 0) {
      setClients(savedClients);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.logo) {
      toast.error("Please fill in all fields");
      return;
    }

    let updatedClients;
    if (editingId) {
      updatedClients = clients.map((client) =>
        client.id === editingId ? { ...formData, id: editingId } : client
      );
      toast.success("Client updated successfully");
    } else {
      const newClient = { ...formData, id: Date.now().toString() };
      updatedClients = [...clients, newClient];
      toast.success("Client added successfully");
    }

    await saveData("clients", updatedClients);
    setClients(updatedClients);
    resetForm();
  };

  const handleEdit = (client: Client) => {
    setFormData(client);
    setEditingId(client.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    const updatedClients = clients.filter((client) => client.id !== id);
    await saveData("clients", updatedClients);
    setClients(updatedClients);
    toast.success("Client deleted successfully");
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      logo: "",
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Clients Management</h1>
        <p className="text-muted-foreground">Manage client logos displayed on the homepage</p>
      </div>

      {/* Form */}
      <GlassCard>
        <h2 className="text-2xl font-bold mb-6">
          {editingId ? "Edit Client" : "Add Client"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Client Name *
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Company Name"
            />
          </div>

          <ImageUpload
            label="Client Logo *"
            value={formData.logo}
            onChange={(url) => setFormData({ ...formData, logo: url })}
          />

          <div className="flex space-x-3">
            <Button type="submit" className="glow-orange-hover">
              {editingId ? "Update Client" : "Add Client"}
            </Button>
            {editingId && (
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </GlassCard>

      {/* Clients List */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Clients ({clients.length})</h2>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clients.map((client) => (
            <GlassCard key={client.id}>
              <div className="aspect-video bg-secondary/50 rounded-lg mb-4 flex items-center justify-center overflow-hidden p-4">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="font-semibold mb-4 text-center">{client.name}</h3>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(client)}
                  className="flex-1"
                >
                  <Edit size={16} className="mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(client.id)}
                  className="text-destructive border-destructive/50 hover:bg-destructive/10"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>

        {clients.length === 0 && (
          <GlassCard className="text-center py-12">
            <Plus size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">
              No clients yet. Add your first client above.
            </p>
          </GlassCard>
        )}
      </div>

      <GlassCard className="bg-secondary/30">
        <h3 className="text-lg font-semibold mb-3">Tips</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use high-quality logos with transparent backgrounds (PNG format recommended)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Logos will scroll horizontally on the homepage</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Keep logos consistent in size and style for best visual appearance</span>
          </li>
        </ul>
      </GlassCard>
    </div>
  );
}
