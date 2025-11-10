import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { Lock } from "lucide-react";

export default function Admin() {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <RevealWrapper>
          <GlassCard className="max-w-2xl mx-auto text-center">
            <Lock className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl font-bold mb-4">Admin Panel</h1>
            <p className="text-muted-foreground mb-6">
              This section is reserved for future CMS integration. Stay tuned for content management capabilities.
            </p>
            <p className="text-sm text-muted-foreground">
              Coming soon: Blog management, case study updates, career postings, and more.
            </p>
          </GlassCard>
        </RevealWrapper>
      </div>
    </div>
  );
}
