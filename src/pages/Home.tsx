import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { FloatingOrbs } from "@/components/ui/floating-orbs";
import { GridPattern } from "@/components/ui/grid-pattern";
import { ArrowRight, Zap, Users, TrendingUp, Award, Sparkles } from "lucide-react";
import servicesData from "@/data/services.json";
import caseStudiesData from "@/data/caseStudies.json";
import blogsData from "@/data/blogs.json";

const stats = [
  { label: "Years Experience", value: "15+", icon: Award },
  { label: "Projects Delivered", value: "500+", icon: TrendingUp },
  { label: "Expert Team", value: "100+", icon: Users },
  { label: "Client Satisfaction", value: "98%", icon: Zap },
];

const partners = [
  "Salesforce", "SAP", "AWS", "Microsoft", "Google Cloud", "Oracle"
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Grid Pattern Background */}
        <GridPattern />
        
        {/* Floating Orbs */}
        <FloatingOrbs />

        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,hsl(var(--background))_100%)] pointer-events-none" />

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="container mx-auto px-4 relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 glass-enhanced px-4 py-2 rounded-full mb-8 animate-breathe"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Pioneering the Future of Enterprise Tech</span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-8 leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <span className="block mb-2">Transform Your</span>
              <span className="gradient-text-multi text-glow animate-pulse-glow inline-block">
                Digital Future
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Empowering enterprises with{" "}
              <span className="text-foreground font-semibold">Salesforce</span>,{" "}
              <span className="text-foreground font-semibold">AI automation</span>, and{" "}
              <span className="text-foreground font-semibold">intelligent solutions</span> that drive exponential growth
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button size="lg" className="glow-orange-hover group px-8 py-6 text-lg depth-shadow">
                    Let's Build Together
                    <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={20} />
                  </Button>
                </motion.div>
              </Link>
              <Link to="/services">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg glass-enhanced">
                    Explore Services
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-primary" />
                <span>15+ Years Excellence</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>500+ Projects Delivered</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span>98% Client Satisfaction</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 border-t border-primary/10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
        <div className="container mx-auto px-4 relative">
          <RevealWrapper>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center group"
                >
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 group-hover:bg-primary/20 transition-colors duration-300 depth-shadow"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-8 h-8 text-primary" />
                  </motion.div>
                  <div className="text-5xl font-bold gradient-text mb-3 text-glow">{stat.value}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 relative">
        <FloatingOrbs />
        <div className="container mx-auto px-4 relative">
          <RevealWrapper>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <span className="text-primary font-semibold text-sm tracking-wider uppercase">What We Do</span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Our Expertise</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive solutions tailored to your business needs
              </p>
            </div>
          </RevealWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {servicesData.map((service, index) => (
              <RevealWrapper key={service.slug} delay={index * 0.1}>
                <Link to={`/services/${service.slug}`}>
                  <motion.div
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <GlassCard className="h-full tilt-hover">
                      <motion.div 
                        className="text-6xl mb-6"
                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        {service.icon === "cloud" && "☁️"}
                        {service.icon === "brain" && "🧠"}
                        {service.icon === "database" && "💾"}
                        {service.icon === "users" && "👥"}
                      </motion.div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {service.description}
                      </p>
                      <motion.div
                        className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        Learn more
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </motion.div>
                    </GlassCard>
                  </motion.div>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-24 relative bg-gradient-to-b from-background via-secondary/10 to-background">
        <div className="container mx-auto px-4 relative">
          <RevealWrapper>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <span className="text-primary font-semibold text-sm tracking-wider uppercase">Proven Results</span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Success Stories</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real results for real businesses—transforming challenges into triumphs
              </p>
            </div>
          </RevealWrapper>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {caseStudiesData.slice(0, 3).map((study, index) => (
              <RevealWrapper key={study.slug} delay={index * 0.15}>
                <Link to={`/case-studies/${study.slug}`}>
                  <motion.div
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.4 }}
                  >
                    <GlassCard className="h-full">
                      <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-4 uppercase tracking-wide">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        {study.category}
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {study.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                        {study.client}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <div className="text-4xl font-bold gradient-text text-glow">
                          {study.impact.split(',')[0]}
                        </div>
                        <div className="text-sm text-muted-foreground">impact</div>
                      </div>
                      <motion.div
                        className="mt-6 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -10 }}
                        whileHover={{ x: 0 }}
                      >
                        Read case study
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </motion.div>
                    </GlassCard>
                  </motion.div>
                </Link>
              </RevealWrapper>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/case-studies">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="border-primary/50 hover:bg-primary/10 glass-enhanced px-6 py-6 group">
                  View All Case Studies
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-24 relative">
        <FloatingOrbs />
        <div className="container mx-auto px-4 relative">
          <RevealWrapper>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <span className="text-primary font-semibold text-sm tracking-wider uppercase">Insights & Knowledge</span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6">Latest Insights</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stay ahead with industry trends, expert insights, and best practices
              </p>
            </div>
          </RevealWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {blogsData.slice(0, 4).map((blog, index) => (
              <RevealWrapper key={blog.slug} delay={index * 0.1}>
                <Link to={`/blog/${blog.slug}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.4 }}
                  >
                    <GlassCard className="h-full">
                      <div className="flex items-center gap-2 text-xs text-primary font-semibold mb-3 uppercase tracking-wide">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {blog.category}
                      </div>
                      <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 leading-relaxed">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                        <div className="text-xs text-muted-foreground">{blog.readTime}</div>
                        <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </div>
                    </GlassCard>
                  </motion.div>
                </Link>
              </RevealWrapper>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/blog">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button variant="outline" className="border-primary/50 hover:bg-primary/10 glass-enhanced px-6 py-6 group">
                  Read More Articles
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 border-t border-primary/10 relative bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 relative">
          <RevealWrapper>
            <div className="text-center mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block mb-4"
              >
                <span className="text-primary font-semibold text-sm tracking-wider uppercase">Our Partners</span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Trusted by Industry Leaders</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Collaborating with the world's most innovative technology platforms
              </p>
            </div>
          </RevealWrapper>

          <div className="flex flex-wrap justify-center items-center gap-16 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0.4, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  opacity: 1, 
                  scale: 1.15,
                  y: -5,
                }}
                className="text-2xl font-bold text-muted-foreground/70 hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                {partner}
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-24 text-center"
          >
            <GlassCard hover={false} className="max-w-4xl mx-auto p-12">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Business?
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join hundreds of companies that have already accelerated their digital transformation with us
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="glow-orange-hover group px-8 py-6 text-lg depth-shadow">
                      Start Your Journey
                      <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" size={20} />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/case-studies">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 glass-enhanced px-8 py-6 text-lg">
                      View Success Stories
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
