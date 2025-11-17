import { useAdmin } from "@/contexts/AdminContext";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Briefcase, Package, Users, Settings, Plus, Scale, UsersRound, Building2 } from "lucide-react";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";

const stats = [
  { label: "Blogs", icon: FileText, path: "/admin/blogs", color: "text-blue-500" },
  { label: "Case Studies", icon: Briefcase, path: "/admin/case-studies", color: "text-green-500" },
  { label: "Services", icon: Settings, path: "/admin/services", color: "text-purple-500" },
  { label: "Products", icon: Package, path: "/admin/products", color: "text-orange-500" },
  { label: "Careers", icon: Users, path: "/admin/careers", color: "text-pink-500" },
  { label: "Team Members", icon: UsersRound, path: "/admin/team", color: "text-indigo-500" },
  { label: "Clients", icon: Building2, path: "/admin/clients", color: "text-teal-500" },
  { label: "Legal Docs", icon: Scale, path: "/admin/legal-docs", color: "text-cyan-500" },
];

export default function AdminDashboard() {
  const { getData } = useAdmin();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Manage your website content</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const dataKey = stat.label.toLowerCase().replace(/\s+/g, "");
          const actualKey = dataKey === "teammembers" ? "team" : dataKey === "legaldocs" ? "legaldocs" : dataKey;
          const count = getData(actualKey).length;
          return (
            <RevealWrapper key={stat.label} delay={index * 0.1}>
              <GlassCard className="text-center">
                <stat.icon className={`mx-auto mb-4 ${stat.color}`} size={32} />
                <div className="text-3xl font-bold gradient-text mb-2">{count}</div>
                <div className="text-sm text-muted-foreground mb-4">{stat.label}</div>
                <Link to={stat.path}>
                  <Button size="sm" variant="outline" className="w-full border-primary/50">
                    Manage
                  </Button>
                </Link>
              </GlassCard>
            </RevealWrapper>
          );
        })}
      </div>

      <RevealWrapper delay={0.5}>
        <GlassCard>
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/admin/blogs/new">
              <Button variant="outline" className="w-full border-primary/50">
                <Plus size={16} className="mr-2" />
                New Blog Post
              </Button>
            </Link>
            <Link to="/admin/case-studies/new">
              <Button variant="outline" className="w-full border-primary/50">
                <Plus size={16} className="mr-2" />
                New Case Study
              </Button>
            </Link>
            <Link to="/admin/products/new">
              <Button variant="outline" className="w-full border-primary/50">
                <Plus size={16} className="mr-2" />
                New Product
              </Button>
            </Link>
          </div>
        </GlassCard>
      </RevealWrapper>

      <RevealWrapper delay={0.6}>
        <GlassCard>
          <h2 className="text-2xl font-bold mb-4">Activity Log</h2>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-muted-foreground">Dashboard loaded</span>
            </div>
            <p className="text-xs text-muted-foreground ml-5">
              Recent changes will appear here
            </p>
          </div>
        </GlassCard>
      </RevealWrapper>
    </div>
  );
}
