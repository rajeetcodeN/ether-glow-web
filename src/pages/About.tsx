import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { Target, Eye, Award, Sparkles } from "lucide-react";

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
              <span className="text-sm font-medium">Our Story</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold mb-8 leading-tight"
            >
              About{" "}
              <span className="gradient-text-multi text-glow">Digital Biz Tech</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
            >
              Empowering enterprises with innovative technology solutions since 2009
            </motion.p>
          </div>
        </RevealWrapper>

        {/* Our Story */}
        <RevealWrapper>
          <div className="max-w-5xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <GlassCard className="tilt-hover">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-4xl font-bold gradient-text">Our Story</h2>
                </div>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                  <p>
                    Digital Biz Tech was founded with a simple yet powerful vision: to help businesses harness the power of 
                    technology to achieve extraordinary results. What started as a small consulting firm has grown into a 
                    trusted partner for Fortune 500 companies and innovative startups alike.
                  </p>
                  <p>
                    Today, we specialize in <span className="text-foreground font-semibold">Salesforce</span>,{" "}
                    <span className="text-foreground font-semibold">AI automation</span>,{" "}
                    <span className="text-foreground font-semibold">SAP</span>, and custom software development, delivering 
                    solutions that drive real business impact. Our team of over 100 experts brings deep technical expertise 
                    and a passion for solving complex challenges.
                  </p>
                  <p>
                    We believe in the transformative power of technology, but more importantly, we believe in the people 
                    behind it. Our success is measured by the success of our clients and the growth of our team.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </RevealWrapper>

        {/* Values */}
        <div className="mb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/10 to-transparent rounded-3xl" />
          <RevealWrapper>
            <div className="text-center mb-12 relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground text-lg">Guiding principles that drive everything we do</p>
            </div>
          </RevealWrapper>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto relative">
            {values.map((value, index) => (
              <RevealWrapper key={value.title} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                >
                  <GlassCard className="text-center h-full group">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300 depth-shadow"
                    >
                      <value.icon className="w-10 h-10 text-primary" />
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </GlassCard>
                </motion.div>
              </RevealWrapper>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <RevealWrapper>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Journey</h2>
              <p className="text-muted-foreground text-lg">15 years of innovation and growth</p>
            </div>
          </RevealWrapper>

          <div className="space-y-8 relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent hidden md:block" />
            
            {timeline.map((item, index) => (
              <RevealWrapper key={item.year} delay={index * 0.12}>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="flex gap-8 relative"
                >
                  <div className="flex flex-col items-center flex-shrink-0">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 glow-orange depth-shadow relative z-10"
                    >
                      <span className="text-white font-bold text-sm">{item.year}</span>
                    </motion.div>
                  </div>
                  <motion.div
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 pb-8"
                  >
                    <GlassCard hover={false} className="tilt-hover h-full">
                      <p className="text-lg leading-relaxed">{item.event}</p>
                    </GlassCard>
                  </motion.div>
                </motion.div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
