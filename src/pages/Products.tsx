import { GlassCard } from "@/components/ui/glass-card";
import { RevealWrapper } from "@/components/ui/reveal-wrapper";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import productsData from "@/data/products.json";

export default function Products() {
  return (
    <div className="min-h-screen pt-24">
      <div className="container mx-auto px-4 py-12">
        <RevealWrapper>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Products</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Innovative software solutions designed to streamline your operations and boost productivity
            </p>
          </div>
        </RevealWrapper>

        <div className="space-y-16 max-w-6xl mx-auto">
          {productsData.map((product, index) => (
            <RevealWrapper key={product.slug} delay={index * 0.2}>
              <GlassCard className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Product Info */}
                  <div>
                    <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
                    <p className="text-muted-foreground mb-6">{product.description}</p>

                    <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                    <div className="space-y-3 mb-6">
                      {product.features.map((feature) => (
                        <div key={feature} className="flex items-start space-x-3">
                          <CheckCircle className="text-primary flex-shrink-0 mt-1" size={18} />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mb-6">
                      <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Built With:</h3>
                      <div className="flex flex-wrap gap-2">
                        {product.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs rounded-full glass"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Button className="glow-orange-hover">Request Demo</Button>
                  </div>

                  {/* Product Visual */}
                  <div className="flex items-center justify-center">
                    <div className="w-full h-64 rounded-lg glass flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-4">
                          {product.slug === "timesheet" ? "⏱️" : "📋"}
                        </div>
                        <p className="text-muted-foreground text-sm">Product Demo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </RevealWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
