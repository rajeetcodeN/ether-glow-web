import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { Target, Eye, Award, ExternalLink } from "lucide-react";
import { useAdmin } from "@/contexts/AdminContext";
import { Button } from "@/components/ui/button";

const timeline = [
  { year: "2009", event: "Digital Biz Tech founded with a vision to transform enterprise technology" },
  { year: "2012", event: "Expanded to AI and automation solutions, serving 100+ clients" },
  { year: "2016", event: "Became Salesforce Gold Partner and launched our ATS product" },
  { year: "2020", event: "Launched Timesheet Management App, serving 50,000+ users" },
  { year: "2024", event: "Expanded globally with offices in 5 countries, 100+ team members" },
];

const values = [
  {
    icon: Target,
    title: "Innovation First",
    description: "We embrace cutting-edge technology to deliver forward-thinking solutions.",
  },
  {
    icon: Eye,
    title: "Client Success",
    description: "Your success is our mission. We're committed to delivering measurable results.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We maintain the highest standards in everything we do, from code to customer service.",
  },
];

export default function About() {
  const { getData } = useAdmin();
  const team = getData("team") || [];

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <RevealWrapper>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Digital Biz Tech</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Empowering enterprises with innovative technology solutions since 2009
            </p>
          </div>
        </RevealWrapper>

        {/* Our Story */}
        <RevealWrapper>
          <div className="max-w-4xl mx-auto mb-16">
            <GlassCard>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Digital Biz Tech was founded with a simple yet powerful vision: to help businesses harness the power of 
                  technology to achieve extraordinary results. What started as a small consulting firm has grown into a 
                  trusted partner for Fortune 500 companies and innovative startups alike.
                </p>
                <p>
                  Today, we specialize in Salesforce, AI automation, SAP, and custom software development, delivering 
                  solutions that drive real business impact. Our team of over 100 experts brings deep technical expertise 
                  and a passion for solving complex challenges.
                </p>
                <p>
                  We believe in the transformative power of technology, but more importantly, we believe in the people 
                  behind it. Our success is measured by the success of our clients and the growth of our team.
                </p>
              </div>
            </GlassCard>
          </div>
        </RevealWrapper>

        {/* Values */}
        <div className="mb-16">
          <RevealWrapper>
            <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          </RevealWrapper>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <RevealWrapper key={value.title} delay={index * 0.1}>
                <GlassCard className="text-center h-full">
                  <value.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </GlassCard>
              </RevealWrapper>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <RevealWrapper>
            <h2 className="text-3xl font-bold mb-8 text-center">Our Journey</h2>
          </RevealWrapper>

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <RevealWrapper key={item.year} delay={index * 0.1}>
                <div className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 glow-orange">
                      <span className="text-primary font-bold text-sm">{item.year}</span>
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-px h-full bg-gradient-to-b from-primary/50 to-transparent mt-2" />
                    )}
                  </div>
                  <GlassCard hover={false} className="flex-1 mb-0">
                    <p>{item.event}</p>
                  </GlassCard>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>

        {/* Team Section */}
        {team.length > 0 && (
          <div className="mt-20">
            <RevealWrapper>
              <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
            </RevealWrapper>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {team.map((member: any, index: number) => (
                <RevealWrapper key={member.id} delay={index * 0.1}>
                  <GlassCard className="text-center h-full">
                    {member.avatar ? (
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-secondary/50">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-3xl font-bold text-primary">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}

                    <h3 className="text-lg font-bold mb-2">{member.name}</h3>
                    <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wide">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {member.description}
                    </p>

                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto"
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-primary/50 hover:bg-primary/10"
                        >
                          View LinkedIn
                          <ExternalLink size={14} className="ml-2" />
                        </Button>
                      </a>
                    )}
                  </GlassCard>
                </RevealWrapper>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
