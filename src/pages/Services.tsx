import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { ArrowRight } from "lucide-react";
import servicesData from "@/data/services.json";

export default function Services() {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <RevealWrapper>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive technology solutions designed to transform your business and drive sustainable growth
            </p>
          </div>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {servicesData.map((service, index) => (
            <RevealWrapper key={service.slug} delay={index * 0.1}>
              <Link to={`/services/${service.slug}`}>
                <GlassCard className="h-full">
                  <div className="text-6xl mb-6">
                    {service.icon === "cloud" && "☁️"}
                    {service.icon === "brain" && "🧠"}
                    {service.icon === "database" && "💾"}
                    {service.icon === "users" && "👥"}
                  </div>
                  <h2 className="text-2xl font-bold mb-4">{service.title}</h2>
                  <p className="text-muted-foreground mb-6">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center text-primary font-medium group">
                    Learn More
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
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
