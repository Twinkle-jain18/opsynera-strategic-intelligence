import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function CTASection({
  heading = 'Need Greater Clarity on a Business Concern?',
  description = 'Share your requirements with Opsynera and explore how structured intelligence advisory may support your critical decision-making.',
  primaryBtn = 'Book a Consultation',
  primaryPath = '/contact',
  secondaryBtn = 'Explore Our Services',
  secondaryPath = '/services',
}) {
  return (
    <section className="bg-[#071A3D] text-white py-16 lg:py-20 relative overflow-hidden border-t-2 border-[#C49A6C]">
      {/* Background subtle telemetry dots */}
      <div className="absolute inset-0 dot-matrix-dark opacity-20 pointer-events-none" />

      <div className="site-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
        >
          {/* Text block */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[3px] bg-[#C49A6C] rounded-full inline-block" />
              <span className="text-[10.5px] font-extrabold tracking-[0.2em] text-[#C49A6C] uppercase">
                Confidential Engagement
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-4 tracking-tight">
              {heading}
            </h2>

            {description && (
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {description}
              </p>
            )}

            <div className="flex items-center gap-2 mt-4 text-xs text-slate-400">
              <ShieldCheck size={15} className="text-[#C49A6C]" />
              <span>All inquiries are held in strict legal and commercial confidentiality.</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3.5 flex-shrink-0">
            <Link to={primaryPath} className="btn-gold px-7 py-3 text-sm">
              {primaryBtn} <ArrowRight size={15} />
            </Link>
            {secondaryBtn && (
              <Link to={secondaryPath} className="btn-pill-outline px-6 py-3 text-sm border-white/20 bg-transparent text-white hover:bg-white hover:text-[#071A3D]">
                {secondaryBtn}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
