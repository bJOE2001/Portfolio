"use client";

import { motion } from "framer-motion";
import {
  AppWindow,
  Database,
  Plug,
  Workflow,
  Wrench,
  Layout,
} from "lucide-react";
import { services } from "@/data/portfolio";

const serviceIcons: Record<string, typeof AppWindow> = {
  "custom-web-apps": AppWindow,
  "business-management-systems": Database,
  "api-development-integrations": Plug,
  "workflow-automation": Workflow,
  "existing-application-improvements": Wrench,
  "frontend-development": Layout,
};

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 border-b border-border">
      {/* Section Header */}
      <div className="space-y-3 mb-12 sm:mb-16">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted">
          02 / SERVICES
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          What I Can Build for You.
        </h2>
        <p className="text-sm sm:text-base text-muted max-w-2xl leading-relaxed">
          Custom software solutions designed around real business needs.
        </p>
      </div>

      {/* 6-Card Editorial Service Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, index) => {
          const Icon = serviceIcons[service.id] || AppWindow;

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="group rounded-xl border border-border bg-surface p-6 flex flex-col justify-between gap-4 hover:border-foreground/35 transition-colors duration-300"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-lg border border-border bg-surface-hover flex items-center justify-center text-muted group-hover:text-foreground transition-colors">
                    <Icon size={16} aria-hidden="true" />
                  </div>
                  <span className="text-[11px] font-mono text-subtle">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
