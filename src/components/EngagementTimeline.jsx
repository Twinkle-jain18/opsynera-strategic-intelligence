import { motion } from 'framer-motion';
import { ChevronRight, ArrowRight } from 'lucide-react';

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
    /* Flex row on desktop — phase cards + arrows between them.
       Falls back to stacked grid on mobile.                     */
    <div className="flex flex-col md:flex-row items-stretch gap-0">
      {steps.map((step, i) => (
        <div key={step.number} className="flex flex-row md:flex-row items-center flex-1 min-w-0">

          {/* ── Phase card ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            viewport={{ once: true }}
            className="flex-1 min-w-0 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs
                       hover:border-[#C49A6C] hover:shadow-md transition-all duration-200
                       flex flex-col justify-between group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#071A3D] text-[#C49A6C] font-black text-xs
                              flex items-center justify-center mb-4
                              group-hover:bg-[#C49A6C] group-hover:text-[#071A3D]
                              transition-colors shadow-xs">
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
              <ChevronRight size={13} className="text-[#C49A6C]" />
            </div>
          </motion.div>

          {/* ── Arrow between cards (not after the last one) ── */}
          {i < steps.length - 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.08 + 0.2 }}
              viewport={{ once: true }}
              /* On mobile: horizontal arrow rotated down; on desktop: horizontal */
              className="flex-shrink-0 flex items-center justify-center
                         mx-1 my-3 md:my-0 md:mx-2
                         rotate-90 md:rotate-0"
            >
              <div className="w-7 h-7 rounded-full bg-[#071A3D] flex items-center justify-center shadow-sm">
                <ArrowRight size={14} className="text-[#C49A6C]" />
              </div>
            </motion.div>
          )}

        </div>
      ))}
    </div>
  );
}
