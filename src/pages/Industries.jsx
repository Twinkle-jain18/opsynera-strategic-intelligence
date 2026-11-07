import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Landmark, Monitor, Layers, Briefcase, ArrowRight, ShieldCheck } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import { industries } from '../data/industries';

const iconMap = {
  Building2, Landmark, Monitor, Layers, Briefcase,
};

export default function Industries() {
  return (
    <main className="bg-white">
      <PageHero
        eyebrow="Sectors We Serve"
        heading="Industries We Aim to Serve"
        subtitle="Tailored Intelligence Advisory for Diverse Strategic Landscapes"
        description="Every industry operates under distinct risk dimensions and operational dynamics. Opsynera delivers contextualized intelligence aligned with sector-specific governance."
      />

      {/* ── Intro Section ─────────────────────────────── */}
      <section className="site-container py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
              <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#071A3D] uppercase">
                Contextual Precision
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] tracking-tight leading-tight mb-4">
              Navigating Uncertainty Across Complex Sectors
            </h2>
            <p className="text-[15px] text-slate-600 leading-relaxed mb-6">
              Different industries face vastly different forms of risk — from regulatory exposure in financial markets to vendor fraud in infrastructure projects.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#071A3D]">
              <ShieldCheck size={16} className="text-[#F4B323]" />
              <span>Multi-domain analytical frameworks</span>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#F5F7FA] rounded-2xl p-6 sm:p-8 border border-slate-200/80">
            <p className="text-sm text-slate-700 leading-relaxed mb-4">
              Opsynera supports businesses, corporate leadership, and investment committees through tailored intelligence research, risk analysis, and confidential advisory services.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Our approach focuses on understanding the exact context of each sector, evaluating information critically, and identifying signals that drive informed decisions.
            </p>
          </div>

        </div>
      </section>

      {/* ── Industry Cards Grid ───────────────────────── */}
      <section className="bg-[#F5F7FA] py-16 lg:py-24 border-t border-slate-200/80">
        <div className="site-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, i) => {
              const Icon = iconMap[industry.icon] || Building2;

              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="card-hover bg-white border border-slate-200/90 rounded-2xl p-7 flex flex-col justify-between shadow-xs hover:border-[#F4B323] transition-all duration-200 group"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[#071A3D] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0B2450] transition-colors shadow-xs">
                        <Icon size={22} className="text-[#F4B323]" strokeWidth={2} />
                      </div>
                      <span className="text-2xl font-black text-slate-200 select-none group-hover:text-[#F4B323]/50 transition-colors">
                        {industry.number}
                      </span>
                    </div>

                    <div className="w-6 h-[2.5px] bg-[#F4B323] rounded-full mb-3" />

                    <h3 className="text-lg font-bold text-[#071A3D] mb-3 leading-snug group-hover:text-[#1676C5] transition-colors">
                      {industry.title}
                    </h3>

                    <p className="text-xs sm:text-[13.5px] text-slate-600 leading-relaxed mb-6">
                      {industry.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      to={`/contact?industry=${encodeURIComponent(industry.title)}`}
                      className="text-xs font-bold text-[#071A3D] group-hover:text-[#F4B323] transition-colors flex items-center gap-1.5 uppercase tracking-wider"
                    >
                      Sector Inquiry <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}

            {/* Custom Advisory Card */}
            <div className="bg-[#071A3D] rounded-2xl p-7 text-white flex flex-col justify-between border-t-2 border-[#F4B323] shadow-md">
              <div>
                <span className="text-xs font-black tracking-widest text-[#F4B323] uppercase block mb-3">
                  Cross-Sector Briefing
                </span>
                <h3 className="text-lg font-bold text-white mb-3">
                  Tailored Intelligence Mandates
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Require cross-border risk mapping, multi-jurisdictional due diligence, or bespoke OSINT briefings? We formulate specialized analytical scopes for non-standard engagements.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-700/80">
                <Link to="/contact" className="btn-gold text-xs px-4 py-2.5 w-full justify-center">
                  Discuss a Specialized Mandate →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <CTASection
        heading="Connect With Our Strategic Intelligence Desk"
        description="Discuss sector-specific risks, partner due diligence, and advisory requirements under complete non-disclosure."
        primaryBtn="Initiate an Inquiry"
        primaryPath="/contact"
        secondaryBtn="Explore Our Services"
        secondaryPath="/services"
      />
    </main>
  );
}
