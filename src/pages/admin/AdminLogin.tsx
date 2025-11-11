import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCard } from "@/components/ui/glass-card";
import { Lock } from "lucide-react";
import { toast } from "sonner";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const { login } = useAdmin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success("Welcome to admin panel!");
      navigate("/admin");
    } else {
      toast.error("Invalid password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <GlassCard className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-orange rounded-lg flex items-center justify-center mx-auto mb-4 glow-orange">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-muted-foreground">Enter password to access dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="glass border-primary/30"
              autoFocus
            />
          </div>

          <Button type="submit" className="w-full glow-orange-hover">
            Login
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Demo password: <code className="px-2 py-1 bg-secondary rounded">admin123</code>
          </p>
        </form>
      </GlassCard>
    </div>
  );
}
