import { Link, useLocation, Outlet } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Package,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { path: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin/blogs", label: "Blogs", icon: FileText },
  { path: "/admin/case-studies", label: "Case Studies", icon: Briefcase },
  { path: "/admin/services", label: "Services", icon: Settings },
  { path: "/admin/products", label: "Products", icon: Package },
  { path: "/admin/careers", label: "Careers", icon: Users },
];

export function AdminLayout() {
  const { logout } = useAdmin();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass rounded-lg"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 h-screen w-64 glass border-r border-border z-40 overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-10 h-10 bg-gradient-orange rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">DB</span>
                </div>
                <div>
                  <h2 className="font-bold">Admin Panel</h2>
                  <p className="text-xs text-muted-foreground">Digital Biz Tech</p>
                </div>
              </div>

              <nav className="space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "text-muted-foreground hover:bg-secondary/50"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-8 pt-8 border-t border-border">
                <Button
                  variant="ghost"
                  onClick={logout}
                  className="w-full justify-start text-muted-foreground hover:text-destructive"
                >
                  <LogOut size={20} className="mr-3" />
                  Logout
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
}
