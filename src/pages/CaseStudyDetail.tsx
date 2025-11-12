import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { ArrowLeft } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const { getData } = useAdmin();
  const [study, setStudy] = useState<any>(null);

  useEffect(() => {
    const caseStudies = getData("caseStudies");
    const foundStudy = caseStudies.find((s: any) => s.slug === slug);
    setStudy(foundStudy);
  }, [slug]);

  if (!study) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Case Study Not Found</h1>
          <Link to="/case-studies">
            <Button>Back to Case Studies</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <Link to="/case-studies">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" size={16} />
            Back to Case Studies
          </Button>
        </Link>

        <RevealWrapper>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-sm text-primary mb-4">{study.category}</div>
              <h1 className="text-5xl font-bold mb-4">{study.title}</h1>
              <p className="text-xl text-muted-foreground">{study.client}</p>
            </div>

            {/* Timeline */}
            <div className="space-y-8">
              <GlassCard>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">The Challenge</h2>
                    <p className="text-muted-foreground">{study.challenge}</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">Our Solution</h2>
                    <p className="text-muted-foreground">{study.solution}</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">The Impact</h2>
                    <p className="text-lg gradient-text font-semibold">{study.impact}</p>
                  </div>
                </div>
              </GlassCard>
            </div>

            <div className="mt-12 text-center">
              <Link to="/contact">
                <Button size="lg" className="glow-orange-hover">
                  Start Your Success Story
                </Button>
              </Link>
            </div>
          </div>
        </RevealWrapper>
      </div>
    </div>
  );
}
