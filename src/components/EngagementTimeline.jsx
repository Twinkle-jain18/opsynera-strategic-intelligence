import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Initial Inquiry',
    description: "We understand the client's strategic objectives, key concerns, and organizational risk parameters.",
  },
  {
    number: '02',
    title: 'Scope Definition',
    description: 'We establish exact research parameters, authorized channels, deliverables, timelines, and terms.',
  },
  {
    number: '03',
    title: 'Authorization & Confidentiality',
    description: 'We formalize permissions, non-disclosure agreements, and strict compliance boundaries.',
  },
  {
    number: '04',
    title: 'Research & Analysis',
    description: 'We conduct multi-source intelligence gathering, verification, and critical synthesis.',
  },
  {
    number: '05',
    title: 'Reporting & Advisory',
    description: 'We deliver defensible executive findings, scenario analyses, and actionable recommendations.',
  },
];

export default function EngagementTimeline() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {steps.map((step, i) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: i * 0.08 }}
          viewport={{ once: true }}
          className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs hover:border-[#F4B323] hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-[#071A3D] text-[#F4B323] font-black text-xs flex items-center justify-center mb-4 group-hover:bg-[#F4B323] group-hover:text-[#071A3D] transition-colors shadow-xs">
              {step.number}
            </div>

            <h4 className="text-sm font-bold text-[#071A3D] mb-2 leading-snug group-hover:text-[#1676C5] transition-colors">
              {step.title}
            </h4>

            <p className="text-xs text-slate-500 leading-relaxed">
              {step.description}
            </p>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-[#071A3D]">
            <span>Phase {step.number}</span>
            <ChevronRight size={13} className="text-[#F4B323]" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
