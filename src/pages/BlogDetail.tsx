import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useAdmin } from "@/contexts/AdminContext";

export default function BlogDetail() {
  const { slug } = useParams();
  const { getData } = useAdmin();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    const blogs = getData("blogs");
    const foundBlog = blogs.find((b: any) => b.slug === slug);
    setBlog(foundBlog);
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <Link to="/blog">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" size={16} />
            Back to Blog
          </Button>
        </Link>

        <RevealWrapper>
          <article className="max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="text-sm text-primary mb-4">{blog.category}</div>
              <h1 className="text-5xl font-bold mb-6">{blog.title}</h1>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>{blog.readTime} read</span>
                </div>
              </div>
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-muted-foreground mb-4">
                Want to learn more about how we can help your business?
              </p>
              <Link to="/contact">
                <Button className="glow-orange-hover">Get in Touch</Button>
              </Link>
            </div>
          </article>
        </RevealWrapper>
      </div>
    </div>
  );
}
