import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const categories = ["All", "AI", "Salesforce", "SAP", "Data Engineering"];

export default function Blog() {
  const { getData } = useAdmin();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    setBlogs(getData("blogs"));
  }, []);

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter((blog) => blog.category === selectedCategory);

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <RevealWrapper>
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Blog & Insights</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Expert perspectives on technology, innovation, and digital transformation
            </p>
          </div>
        </RevealWrapper>

        {/* Category Filter */}
        <RevealWrapper>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "glow-orange"
                    : "border-primary/50 hover:bg-primary/10"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </RevealWrapper>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredBlogs.map((blog, index) => (
            <RevealWrapper key={blog.slug} delay={index * 0.1}>
              <Link to={`/blog/${blog.slug}`}>
                <GlassCard className="h-full">
                  <div className="text-xs text-primary mb-3">{blog.category}</div>
                  <h2 className="text-xl font-bold mb-3 line-clamp-2">{blog.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{new Date(blog.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </GlassCard>
              </Link>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
