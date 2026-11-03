import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, Globe, Zap, MapPin, BarChart2, CheckCircle2, AlertCircle, ArrowRight, ShieldAlert } from 'lucide-react';
import PageHero from '../components/PageHero';
import EngagementTimeline from '../components/EngagementTimeline';
import CTASection from '../components/CTASection';
import { services } from '../data/services';

const serviceIcons = {
  'strategic-risk-advisory': ShieldCheck,
  'due-diligence': Search,
  'osint-research': Globe,
  'cyber-digital-risk': ShieldAlert,
  'field-verification': MapPin,
  'corporate-intelligence': BarChart2,
};

export default function Services() {
  return (
    <main className="bg-white">
      <PageHero
        eyebrow="What We Offer"
        heading="Our Advisory Services"
        subtitle="Structured Intelligence. Practical Insights. Informed Decisions."
        description="Each advisory engagement is tailored to the client's strategic requirements, with clear research boundaries, authorized access protocols, and defensible reporting."
      />

      {/* ── Services Directory ────────────────────────── */}
      <section className="site-container py-16 lg:py-20">
        <div className="space-y-16 lg:space-y-24">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.id] || ShieldCheck;
            const isEven = i % 2 === 0;

            return (
              <motion.article
                key={service.id}
                id={service.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="scroll-mt-28"
              >
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}>
                  
                  {/* Text Details Column (7 cols) */}
                  <div className={`lg:col-span-7 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                    
                    {/* Header badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#071A3D] flex items-center justify-center flex-shrink-0">
                        <Icon size={16} className="text-[#F4B323]" />
                      </div>
                      <span className="text-xs font-black tracking-widest text-[#F4B323] uppercase">
                        Service {service.number}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D] mb-4 tracking-tight">
                      {service.title}
                    </h2>

                    <p className="text-[15px] text-slate-600 leading-relaxed mb-6">
                      {service.shortDesc}
                    </p>

                    {/* Offerings list */}
                    <div className="bg-[#F5F7FA] border border-slate-200/80 rounded-2xl p-6 mb-6">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#071A3D] mb-3">
                        Key Advisory Capabilities:
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.offerings.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <CheckCircle2 size={15} className="text-[#F4B323] flex-shrink-0 mt-0.5" />
                            <span className="text-xs sm:text-[13px] text-slate-700 leading-snug">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Legal note if applicable */}
                    {service.note && (
                      <div className="flex items-start gap-3 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-xl p-3.5 mb-6">
                        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-900 leading-relaxed">
                          {service.note}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-4">
                      <Link
                        to={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="btn-gold text-xs px-5 py-2.5"
                      >
                        Enquire About This Service <ArrowRight size={13} />
                      </Link>
                      <Link
                        to="/contact"
                        className="btn-pill-outline text-xs px-5 py-2.5"
                      >
                        Request Scope Brief
                      </Link>
                    </div>

                  </div>

                  {/* Visual Card / Side Showcase (5 cols) */}
                  <div className={`lg:col-span-5 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                    <div className="bg-[#071A3D] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg border-t-2 border-[#F4B323]">
                      <div className="absolute inset-0 dot-matrix-dark opacity-25 pointer-events-none" />

                      <div className="relative z-10 flex flex-col justify-between min-h-[260px]">
                        <div>
                          <div className="text-4xl font-black text-[#F4B323]/30 mb-4 select-none">
                            {service.number}
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            {service.title}
                          </h3>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            Structured analytical advisory aligned with corporate risk governance, due diligence requirements, and executive decision-making.
                          </p>
                        </div>

                        <div className="pt-6 border-t border-slate-700/80 mt-6 flex items-center justify-between text-xs text-slate-400">
                          <span>Confidential Advisory</span>
                          <span className="text-[#F4B323] font-bold">Defensible Insight</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {i < services.length - 1 && (
                  <div className="w-full h-px bg-slate-200 mt-16 lg:mt-24" />
                )}
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── Engagement Timeline Component ─────────────── */}
      <section className="bg-[#F5F7FA] py-16 lg:py-24 border-t border-slate-200/80">
        <div className="site-container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
              <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#071A3D] uppercase">
                Process Protocol
              </span>
              <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] tracking-tight mb-4">
              Our Engagement Process
            </h2>
            <p className="text-slate-600 text-sm">
              How Opsynera partners with organizations from initial briefing to delivery of findings.
            </p>
          </div>

          <EngagementTimeline />
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <CTASection
        heading="Ready to Commission a Targeted Briefing?"
        description="Share your specific concerns with our team for an initial, confidential assessment of scope, feasibility, and timelines."
        primaryBtn="Initiate an Inquiry"
        primaryPath="/contact"
        secondaryBtn="View Industries"
        secondaryPath="/industries"
      />
    </main>
  );
}
