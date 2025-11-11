import { useState, useEffect } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MarkdownEditor } from "@/components/admin/MarkdownEditor";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import { toast } from "sonner";

interface Blog {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  content: string;
}

export default function BlogsManager() {
  const { getData, saveData } = useAdmin();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    setBlogs(getData("blogs"));
  }, []);

  const calculateReadTime = (content: string) => {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min`;
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSave = async () => {
    if (!editing) return;

    const blog = {
      ...editing,
      slug: editing.slug || generateSlug(editing.title),
      date: editing.date || new Date().toISOString().split("T")[0],
      readTime: calculateReadTime(editing.content),
    };

    let updatedBlogs;
    if (isNew) {
      updatedBlogs = [...blogs, blog];
    } else {
      updatedBlogs = blogs.map((b) => (b.slug === blog.slug ? blog : b));
    }

    await saveData("blogs", updatedBlogs);
    setBlogs(updatedBlogs);
    setEditing(null);
    setIsNew(false);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    
    const updatedBlogs = blogs.filter((b) => b.slug !== slug);
    await saveData("blogs", updatedBlogs);
    setBlogs(updatedBlogs);
    toast.success("Blog deleted");
  };

  const handleNew = () => {
    setEditing({
      title: "",
      slug: "",
      category: "AI",
      excerpt: "",
      date: new Date().toISOString().split("T")[0],
      readTime: "5 min",
      author: "Digital Biz Tech Team",
      image: "",
      content: "",
    });
    setIsNew(true);
  };

  if (editing) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">{isNew ? "New Blog Post" : "Edit Blog Post"}</h1>
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
                  placeholder="Blog post title"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Category *</label>
                <Input
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="glass border-primary/30"
                  placeholder="e.g., AI, Salesforce, SAP"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Excerpt *</label>
              <Input
                value={editing.excerpt}
                onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                className="glass border-primary/30"
                placeholder="Brief description"
              />
            </div>

            <ImageUpload
              value={editing.image}
              onChange={(url) => setEditing({ ...editing, image: url })}
              label="Featured Image"
            />

            <MarkdownEditor
              value={editing.content}
              onChange={(content) => setEditing({ ...editing, content })}
              label="Content *"
            />

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Author</label>
                <Input
                  value={editing.author}
                  onChange={(e) => setEditing({ ...editing, author: e.target.value })}
                  className="glass border-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Input
                  type="date"
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                  className="glass border-primary/30"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Read Time</label>
                <Input
                  value={editing.readTime}
                  readOnly
                  className="glass border-primary/30 bg-secondary/20"
                />
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
        <h1 className="text-4xl font-bold">Blogs</h1>
        <Button onClick={handleNew} className="glow-orange-hover">
          <Plus size={16} className="mr-2" />
          New Blog Post
        </Button>
      </div>

      <div className="grid gap-4">
        {blogs.map((blog) => (
          <GlassCard key={blog.slug} hover={false}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">{blog.category}</span>
                  <span className="text-xs text-muted-foreground">{blog.date}</span>
                  <span className="text-xs text-muted-foreground">{blog.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => { setEditing(blog); setIsNew(false); }}
                >
                  <Edit size={14} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-destructive hover:bg-destructive/20"
                  onClick={() => handleDelete(blog.slug)}
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}

        {blogs.length === 0 && (
          <GlassCard>
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No blog posts yet</p>
              <Button onClick={handleNew} variant="outline" className="border-primary/50">
                <Plus size={16} className="mr-2" />
                Create First Blog Post
              </Button>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
