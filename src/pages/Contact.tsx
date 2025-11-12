import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    toast.success("Message sent successfully! We'll get back to you soon.");
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", company: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <RevealWrapper>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to transform your business? Let's start a conversation.
            </p>
          </div>
        </RevealWrapper>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <RevealWrapper>
            <div className="space-y-6">
              <GlassCard hover={false}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email Us</h3>
                    <p className="text-muted-foreground text-sm">contact@digitalbiz.tech</p>
                    <p className="text-muted-foreground text-sm">sales@digitalbiz.tech</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hover={false}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Call Us</h3>
                    <p className="text-muted-foreground text-sm">+1 (555) 123-4567</p>
                    <p className="text-muted-foreground text-sm">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard hover={false}>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Visit Us</h3>
                    <p className="text-muted-foreground text-sm">123 Tech Plaza</p>
                    <p className="text-muted-foreground text-sm">San Francisco, CA 94105</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </RevealWrapper>

          {/* Contact Form */}
          <RevealWrapper delay={0.2}>
            <GlassCard hover={false}>
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 mx-auto mb-4 text-primary animate-scale-in" />
                  <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="glass border-primary/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="glass border-primary/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium mb-2">
                      Company
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="glass border-primary/30"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="glass border-primary/30"
                    />
                  </div>

                  <Button type="submit" className="w-full glow-orange-hover">
                    Send Message
                  </Button>
                </form>
              )}
            </GlassCard>
          </RevealWrapper>
        </div>
      </div>
    </div>
  );
}
