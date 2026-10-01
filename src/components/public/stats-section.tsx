"use client";

import * as React from "react";
import { Award, Users, FlaskConical, Stethoscope, Clock } from "lucide-react";
import { motion } from "motion/react";
import { gsap } from "gsap";

export interface DiagnosticStat {
  rawNum: number;
  prefix?: string;
  suffix?: string;
  displayFallback: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DEFAULT_STATS: DiagnosticStat[] = [
  {
    rawNum: 20,
    suffix: "+",
    displayFallback: "20+",
    label: "Years of Excellence",
    description: "Serving patients with clinical integrity since 2005",
    icon: Award,
  },
  {
    rawNum: 500,
    suffix: "K+",
    displayFallback: "500K+",
    label: "Patients Served",
    description: "Trusted by families and referring physicians nationwide",
    icon: Users,
  },
  {
    rawNum: 140,
    suffix: "+",
    displayFallback: "140+",
    label: "Specialized Tests",
    description: "Covering routine hematology to molecular genomics",
    icon: FlaskConical,
  },
  {
    rawNum: 25,
    suffix: "+",
    displayFallback: "25+",
    label: "Specialist Doctors",
    description: "Full-time certified pathologists & radiologists",
    icon: Stethoscope,
  },
  {
    rawNum: 4,
    prefix: "<",
    suffix: " Hrs",
    displayFallback: "<4 Hrs",
    label: "Routine Turnaround",
    description: "Real-time automated validation & delivery",
    icon: Clock,
  },
];

interface StatsSectionProps {
  stats?: DiagnosticStat[];
}

function StatCounterItem({
  stat,
  idx,
}: {
  stat: DiagnosticStat;
  idx: number;
}) {
  const [count, setCount] = React.useState(0);
  const itemRef = React.useRef<HTMLDivElement>(null);
  const animatedRef = React.useRef(false);
  const Icon = stat.icon;

  React.useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    // IntersectionObserver triggers GSAP tween once in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animatedRef.current) {
            animatedRef.current = true;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: stat.rawNum,
              duration: 2,
              ease: "power2.out",
              delay: idx * 0.1,
              onUpdate: () => {
                setCount(Math.round(obj.val));
              },
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.rawNum, idx]);

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`pt-6 lg:pt-0 ${
        idx > 0 ? "lg:pl-8" : ""
      } flex flex-col justify-between group transition-all`}
    >
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          whileHover={{ scale: 1.15, rotate: 6 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-10 h-10 rounded-full bg-[#DDEDE3] border border-[#E8E8E3] flex items-center justify-center text-[#315C4A] group-hover:bg-[#315C4A] group-hover:text-white transition-colors duration-300 shadow-sm"
        >
          <Icon className="w-5 h-5" />
        </motion.div>
        <span className="text-3xl sm:text-4xl font-serif text-[#171717] tabular-nums font-medium">
          {stat.prefix || ""}
          {count > 0 ? count : stat.displayFallback}
          {stat.suffix || ""}
        </span>
      </div>
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-wider font-mono text-[#315C4A]">
          {stat.label}
        </h3>
        <p className="text-xs text-[#70706B] mt-1 leading-relaxed">
          {stat.description}
        </p>
      </div>
    </motion.div>
  );
}

export function StatsSection({ stats = DEFAULT_STATS }: StatsSectionProps) {
  return (
    <section className="py-12 bg-[#FFFFFF] border-b border-[#E8E8E3] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E8E3]">
          {stats.map((stat, idx) => (
            <StatCounterItem key={idx} stat={stat} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
