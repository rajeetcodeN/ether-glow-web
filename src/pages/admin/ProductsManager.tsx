import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface Product {
  title: string;
  slug: string;
  description: string;
  features: string[];
  tech: string[];
}

export default function ProductsManager() {
  const { getData, saveData } = useAdmin();
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [featureInput, setFeatureInput] = useState("");
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    setProducts(getData("products"));
  }, []);

  const handleSave = async () => {
    if (!editing) return;

    let updated;
    if (isNew) {
      updated = [...products, editing];
    } else {
      updated = products.map((p) => (p.slug === editing.slug ? editing : p));
    }

    await saveData("products", updated);
    setProducts(updated);
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure?")) return;
    const updated = products.filter((p) => p.slug !== slug);
    await saveData("products", updated);
    setProducts(updated);
    toast.success("Product deleted");
  };

  const addFeature = () => {
    if (!featureInput.trim() || !editing) return;
    setEditing({ ...editing, features: [...editing.features, featureInput] });
    setFeatureInput("");
  };

  const addTech = () => {
    if (!techInput.trim() || !editing) return;
    setEditing({ ...editing, tech: [...editing.tech, techInput] });
    setTechInput("");
  };

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{isNew ? "New Product" : "Edit Product"}</h1>
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
              <label className="text-sm font-medium mb-2 block">Title *</label>
              <Input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                className="glass border-primary/30"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description *</label>
              <Textarea
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
                className="glass border-primary/30"
                rows={3}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Features</label>
              <div className="flex space-x-2 mb-3">
                <Input
                  value={featureInput}
                  onChange={(e) => setFeatureInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addFeature()}
                  className="glass border-primary/30"
                  placeholder="Add feature"
                />
                <Button type="button" onClick={addFeature} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editing.features.map((f, i) => (
                  <span key={i} className="px-3 py-1 bg-secondary rounded-full text-sm flex items-center space-x-2">
                    <span>{f}</span>
                    <button
                      onClick={() => setEditing({ ...editing, features: editing.features.filter((_, idx) => idx !== i) })}
                      className="text-destructive"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tech Stack</label>
              <div className="flex space-x-2 mb-3">
                <Input
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addTech()}
                  className="glass border-primary/30"
                  placeholder="Add technology"
                />
                <Button type="button" onClick={addTech} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {editing.tech.map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm flex items-center space-x-2">
                    <span>{t}</span>
                    <button
                      onClick={() => setEditing({ ...editing, tech: editing.tech.filter((_, idx) => idx !== i) })}
                      className="text-destructive"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Products</h1>
        <Button
          onClick={() => {
            setEditing({ title: "", slug: "", description: "", features: [], tech: [] });
            setIsNew(true);
          }}
          className="glow-orange-hover"
        >
          <Plus size={16} className="mr-2" />
          New Product
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {products.map((product) => (
          <GlassCard key={product.slug} hover={false}>
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold">{product.title}</h3>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={() => { setEditing(product); setIsNew(false); }}>
                  <Edit size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:bg-destructive/20"
                  onClick={() => handleDelete(product.slug)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
            <div className="flex flex-wrap gap-2">
              {product.tech.map((t) => (
                <span key={t} className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                  {t}
                </span>
              ))}
            </div>
          </GlassCard>
        ))}

        {products.length === 0 && (
          <GlassCard className="md:col-span-2">
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products yet</p>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
