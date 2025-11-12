import { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";

const benefits = [
  "Competitive Salary & Equity",
  "Flexible Work Environment",
  "Health & Wellness Benefits",
  "Professional Development",
  "Work-Life Balance",
  "Cutting-Edge Technology",
];

export default function Careers() {
  const { getData } = useAdmin();
  const [careers, setCareers] = useState<any[]>([]);

  useEffect(() => {
    setCareers(getData("careers"));
  }, []);
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <RevealWrapper>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Build the future of enterprise technology with us. We're looking for talented individuals passionate about innovation.
            </p>
          </div>
        </RevealWrapper>

        {/* Why Work With Us */}
        <RevealWrapper>
          <div className="mb-16 max-w-4xl mx-auto">
            <GlassCard>
              <h2 className="text-3xl font-bold mb-6 text-center">Why Digital Biz Tech?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={benefit} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </RevealWrapper>

        {/* Open Positions */}
        <div className="max-w-4xl mx-auto">
          <RevealWrapper>
            <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
          </RevealWrapper>

          <div className="space-y-4">
            {careers.map((job, index) => (
              <RevealWrapper key={`${job.title}-${index}`} delay={index * 0.1}>
                <GlassCard hover={false}>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {job.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Briefcase size={14} />
                          <span>{job.department}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={14} />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock size={14} />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>

                    <Button className="glow-orange-hover md:flex-shrink-0">
                      Apply Now
                    </Button>
                  </div>
                </GlassCard>
              </RevealWrapper>
            ))}
          </div>
        </div>

        {/* CTA */}
        <RevealWrapper>
          <div className="mt-16 text-center">
            <GlassCard className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Don't See a Perfect Match?</h3>
              <p className="text-muted-foreground mb-6">
                We're always looking for talented individuals. Send us your resume and let's talk about opportunities.
              </p>
              <Button className="glow-orange-hover">Send Your Resume</Button>
            </GlassCard>
          </div>
        </RevealWrapper>
      </div>
    </div>
  );
}
