import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Save, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { toast } from "sonner";

interface Service {
  title: string;
  slug: string;
  description: string;
  icon: string;
  features: string[];
}

export default function ServicesManager() {
  const { getData, saveData } = useAdmin();
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Service | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    setServices(getData("services"));
  }, []);

  const handleSave = async () => {
    if (!editing) return;

    let updated;
    if (isNew) {
      updated = [...services, editing];
    } else {
      updated = services.map((s) => (s.slug === editing.slug ? editing : s));
    }

    await saveData("services", updated);
    setServices(updated);
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure?")) return;
    const updated = services.filter((s) => s.slug !== slug);
    await saveData("services", updated);
    setServices(updated);
    toast.success("Service deleted");
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(services);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    setServices(items);
    await saveData("services", items);
    toast.success("Order updated");
  };

  const addFeature = () => {
    if (!featureInput.trim() || !editing) return;
    setEditing({ ...editing, features: [...editing.features, featureInput] });
    setFeatureInput("");
  };

  const removeFeature = (index: number) => {
    if (!editing) return;
    setEditing({ ...editing, features: editing.features.filter((_, i) => i !== index) });
  };

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{isNew ? "New Service" : "Edit Service"}</h1>
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
                <label className="text-sm font-medium mb-2 block">Icon *</label>
                <Input
                  value={editing.icon}
                  onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                  className="glass border-primary/30"
                  placeholder="e.g., cloud, brain, database, users"
                />
              </div>
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
                  placeholder="Add feature and press Enter"
                />
                <Button type="button" onClick={addFeature} variant="outline">
                  Add
                </Button>
              </div>
              <div className="space-y-2">
                {editing.features.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between glass p-3 rounded">
                    <span className="text-sm">{feature}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => removeFeature(index)}
                      className="text-destructive"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
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
        <h1 className="text-4xl font-bold">Services</h1>
        <Button
          onClick={() => {
            setEditing({ title: "", slug: "", description: "", icon: "cloud", features: [] });
            setIsNew(true);
          }}
          className="glow-orange-hover"
        >
          <Plus size={16} className="mr-2" />
          New Service
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="services">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {services.map((service, index) => (
                <Draggable key={service.slug} draggableId={service.slug} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps}>
                      <GlassCard hover={false}>
                        <div className="flex items-start space-x-4">
                          <div {...provided.dragHandleProps} className="mt-1 cursor-grab">
                            <GripVertical className="text-muted-foreground" size={20} />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{service.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {service.features.map((f) => (
                                <span key={f} className="text-xs px-2 py-1 bg-secondary rounded">
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => { setEditing(service); setIsNew(false); }}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-destructive hover:bg-destructive/20"
                              onClick={() => handleDelete(service.slug)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {services.length === 0 && (
        <GlassCard>
          <div className="text-center py-12">
            <p className="text-muted-foreground">No services yet</p>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
