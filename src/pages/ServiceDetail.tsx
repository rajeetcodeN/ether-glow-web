import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { ArrowLeft, CheckCircle } from "lucide-react";
import servicesData from "@/data/services.json";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <Link to="/services">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="mr-2" size={16} />
            Back to Services
          </Button>
        </Link>

        <RevealWrapper>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="text-7xl mb-6">
                {service.icon === "cloud" && "☁️"}
                {service.icon === "brain" && "🧠"}
                {service.icon === "database" && "💾"}
                {service.icon === "users" && "👥"}
              </div>
              <h1 className="text-5xl font-bold mb-6">{service.title}</h1>
              <p className="text-xl text-muted-foreground">{service.description}</p>
            </div>

            <GlassCard className="mb-8">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start space-x-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="text-2xl font-bold mb-4">How We Can Help</h2>
              <p className="text-muted-foreground mb-6">
                Our team of experts specializes in delivering {service.title.toLowerCase()} that align with your business objectives. 
                We combine industry best practices with innovative approaches to ensure successful implementation and long-term value.
              </p>
              <Link to="/contact">
                <Button className="glow-orange-hover">
                  Get Started
                </Button>
              </Link>
            </GlassCard>
          </div>
        </RevealWrapper>
      </div>
    </div>
  );
}
