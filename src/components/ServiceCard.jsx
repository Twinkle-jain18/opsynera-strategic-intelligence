import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Search, Globe, Zap, MapPin, BarChart2, ShieldAlert } from 'lucide-react';

const iconMap = {
  'strategic-risk-advisory': ShieldCheck,
  'due-diligence': Search,
  'osint-research': Globe,
  'cyber-digital-risk': ShieldAlert,
  'field-verification': MapPin,
  'corporate-intelligence': BarChart2,
};

export default function ServiceCard({ service, index }) {
  const Icon = iconMap[service.id] || ShieldCheck;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      viewport={{ once: true }}
      className="card-hover bg-white border border-slate-200/90 rounded-2xl p-7 flex flex-col justify-between shadow-xs hover:border-[#F4B323] transition-all duration-200 group"
    >
      <div>
        {/* Header row: Icon & Number */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-11 h-11 rounded-xl bg-[#071A3D] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0B2450] transition-colors shadow-sm">
            <Icon size={20} className="text-[#F4B323]" strokeWidth={2} />
          </div>
          <span className="text-xs font-black tracking-widest text-[#F4B323] uppercase">
            Service {service.number}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-[#071A3D] leading-snug mb-3 group-hover:text-[#1676C5] transition-colors">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed mb-6">
          {service.shortDesc}
        </p>
      </div>

      {/* Footer link */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <Link
          to={`/services#${service.slug}`}
          className="text-xs font-bold text-[#071A3D] group-hover:text-[#F4B323] transition-colors flex items-center gap-1.5 uppercase tracking-wider"
          aria-label={`Explore ${service.title}`}
        >
          Explore Service <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
