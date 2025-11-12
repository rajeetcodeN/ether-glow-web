import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { ArrowRight, Sparkles } from "lucide-react";
import servicesData from "@/data/services.json";

export default function Services() {
  return (
    <div className="min-h-screen pt-24 relative">
      <FloatingOrbs />
      
      <div className="container mx-auto px-4 py-12 relative">
        <RevealWrapper>
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass-enhanced px-4 py-2 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">What We Offer</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
            >
              <span className="gradient-text-multi text-glow">Our Services</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Comprehensive technology solutions designed to transform your business and drive sustainable growth
            </motion.p>
          </div>
        </RevealWrapper>

        <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
          {servicesData.map((service, index) => (
            <RevealWrapper key={service.slug} delay={index * 0.15}>
              <Link to={`/services/${service.slug}`}>
                <motion.div
                  whileHover={{ y: -12, scale: 1.01 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  <GlassCard className="h-full tilt-hover group">
                    <motion.div 
                      className="text-7xl mb-8"
                      whileHover={{ scale: 1.15, rotate: [0, -8, 8, 0] }}
                      transition={{ duration: 0.6 }}
                    >
                      {service.icon === "cloud" && "☁️"}
                      {service.icon === "brain" && "🧠"}
                      {service.icon === "database" && "💾"}
                      {service.icon === "users" && "👥"}
                    </motion.div>
                    <h2 className="text-3xl font-bold mb-5 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="space-y-3 mb-8">
                      {service.features.map((feature, idx) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          className="flex items-start gap-3 text-sm group/item"
                        >
                          <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0 group-hover/item:scale-150 transition-transform" />
                          <span className="leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="flex items-center text-primary font-semibold text-lg group-hover:gap-3 gap-2 transition-all duration-300"
                      whileHover={{ x: 5 }}
                    >
                      Learn More
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </motion.div>
                  </GlassCard>
                </motion.div>
              </Link>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
