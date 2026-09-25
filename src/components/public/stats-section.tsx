import * as React from "react";
import { Award, Users, FlaskConical, Stethoscope, Clock } from "lucide-react";

export interface DiagnosticStat {
  value: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const DEFAULT_STATS: DiagnosticStat[] = [
  {
    value: "20+",
    label: "Years of Excellence",
    description: "Serving patients with clinical integrity since 2005",
    icon: Award,
  },
  {
    value: "500K+",
    label: "Patients Served",
    description: "Trusted by families and referring physicians nationwide",
    icon: Users,
  },
  {
    value: "140+",
    label: "Specialized Tests",
    description: "Covering routine hematology to molecular genomics",
    icon: FlaskConical,
  },
  {
    value: "25+",
    label: "Specialist Doctors",
    description: "Full-time certified pathologists & radiologists",
    icon: Stethoscope,
  },
  {
    value: "<4 Hrs",
    label: "Routine Turnaround",
    description: "Real-time automated validation & delivery",
    icon: Clock,
  },
];

interface StatsSectionProps {
  stats?: DiagnosticStat[];
}

export function StatsSection({ stats = DEFAULT_STATS }: StatsSectionProps) {
  return (
    <section className="py-12 bg-[#FFFFFF] border-b border-[#E8E8E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E8E3]">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className={`pt-6 lg:pt-0 ${
                  idx > 0 ? "lg:pl-8" : ""
                } flex flex-col justify-between group`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#DDEDE3] border border-[#E8E8E3] flex items-center justify-center text-[#315C4A] group-hover:bg-[#315C4A] group-hover:text-white transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-serif text-[#171717]">
                    {stat.value}
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
