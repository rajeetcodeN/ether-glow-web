import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { ArrowRight, Zap, Users, TrendingUp, Award } from "lucide-react";
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
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Trusted Partner for{" "}
              <span className="gradient-text">Salesforce, AI,</span> and{" "}
              <span className="gradient-text">Intelligent Automation</span>
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl text-muted-foreground mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Empowering enterprises with cutting-edge technology solutions that drive innovation and growth.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/contact">
                <Button size="lg" className="glow-orange-hover group">
                  Let's Build Together
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10">
                  Explore Services
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-t border-primary/20">
        <div className="container mx-auto px-4">
          <RevealWrapper>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </RevealWrapper>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <RevealWrapper>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Expertise</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Comprehensive solutions tailored to your business needs
              </p>
            </div>
          </RevealWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, index) => (
              <RevealWrapper key={service.slug} delay={index * 0.1}>
                <Link to={`/services/${service.slug}`}>
                  <GlassCard className="h-full">
                    <div className="text-5xl mb-4">
                      {service.icon === "cloud" && "☁️"}
                      {service.icon === "brain" && "🧠"}
                      {service.icon === "database" && "💾"}
                      {service.icon === "users" && "👥"}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground text-sm">{service.description}</p>
                  </GlassCard>
                </Link>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <RevealWrapper>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Success Stories</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Real results for real businesses
              </p>
            </div>
          </RevealWrapper>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudiesData.slice(0, 3).map((study, index) => (
              <RevealWrapper key={study.slug} delay={index * 0.1}>
                <Link to={`/case-studies/${study.slug}`}>
                  <GlassCard>
                    <div className="text-sm text-primary mb-2">{study.category}</div>
                    <h3 className="text-xl font-bold mb-2">{study.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{study.client}</p>
                    <div className="text-2xl font-bold gradient-text">{study.impact.split(',')[0]}</div>
                  </GlassCard>
                </Link>
              </RevealWrapper>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/case-studies">
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                View All Case Studies
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Teaser */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <RevealWrapper>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Insights</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Stay updated with industry trends and best practices
              </p>
            </div>
          </RevealWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogsData.slice(0, 4).map((blog, index) => (
              <RevealWrapper key={blog.slug} delay={index * 0.1}>
                <Link to={`/blog/${blog.slug}`}>
                  <GlassCard>
                    <div className="text-xs text-primary mb-2">{blog.category}</div>
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">{blog.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="text-xs text-muted-foreground">{blog.readTime} read</div>
                  </GlassCard>
                </Link>
              </RevealWrapper>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/blog">
              <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                Read More Articles
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 border-t border-primary/20">
        <div className="container mx-auto px-4">
          <RevealWrapper>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
            </div>
          </RevealWrapper>

          <div className="flex flex-wrap justify-center items-center gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0.5 }}
                whileHover={{ opacity: 1, scale: 1.1 }}
                className="text-xl font-semibold text-muted-foreground"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
