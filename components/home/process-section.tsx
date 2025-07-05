"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const processSteps = [
  {
    number: 1,
    title: "Create Account",
    description: "Register with your official credentials",
  },
  {
    number: 2,
    title: "Submit Application",
    description: "Complete the required information and forms",
  },
  {
    number: 3,
    title: "Provide Documentation",
    description: "Upload supporting documents as specified",
  },
  {
    number: 4,
    title: "Receive Decision",
    description: "Obtain your official water permit certificate",
  }
];

export function ProcessSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-accent/20 text-accent-foreground text-sm font-medium mb-4">
            APPLICATION PROCESS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-primary">
            How to Apply
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Follow these steps to complete your water concession permit application through our official portal
          </p>
        </motion.div>

        <div className="relative">
          {/* Connector line - removing this to eliminate unwanted line */}
          {/* <div className="hidden lg:block absolute top-24 left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-1 bg-gradient-to-r from-secondary/50 via-secondary to-secondary/50 rounded-full" /> */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="process-step relative"
              >
                <motion.div 
                  className="process-number bg-secondary text-secondary-foreground"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {step.number}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3 text-primary">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
                
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-6 z-10">
                    <ArrowRight className="h-5 w-5 text-secondary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block py-3 px-6 rounded-lg border border-border bg-muted/20">
            <p className="text-sm text-muted-foreground">
              Standard processing timeframe: <span className="font-semibold text-primary">10-15 business days</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 