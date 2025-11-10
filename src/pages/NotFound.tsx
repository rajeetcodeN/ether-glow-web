import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background pt-24">
      <div className="container mx-auto px-4">
        <GlassCard className="max-w-lg mx-auto text-center">
          <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
          <p className="text-xl mb-6">Oops! Page not found</p>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button className="glow-orange-hover">
              Return to Home
            </Button>
          </Link>
        </GlassCard>
      </div>
    </div>
  );
};

export default NotFound;
