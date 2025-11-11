import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { ArrowRight } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

export default function CaseStudies() {
  const { getData } = useAdmin();
  const [caseStudies, setCaseStudies] = useState<any[]>([]);

  useEffect(() => {
    setCaseStudies(getData("caseStudies"));
  }, []);
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <RevealWrapper>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-world success stories showcasing how we help businesses transform through technology
            </p>
          </div>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => (
            <RevealWrapper key={study.slug} delay={index * 0.1}>
              <Link to={`/case-studies/${study.slug}`}>
                <GlassCard className="h-full">
                  <div className="text-xs text-primary mb-2">{study.category}</div>
                  <h2 className="text-xl font-bold mb-2">{study.title}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{study.client}</p>
                  
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Challenge:</p>
                    <p className="text-sm line-clamp-2">{study.challenge}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold text-primary">Impact:</p>
                    <p className="text-sm">{study.impact}</p>
                  </div>

                  <div className="flex items-center text-primary font-medium text-sm group">
                    Read Full Story
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={14} />
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
