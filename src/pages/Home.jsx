import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Search,
  Globe,
  Zap,
  MapPin,
  Building2,
  Lock,
  LineChart,
  Users,
  Scale,
  Handshake,
  TrendingUp,
  ShieldAlert,
  ChevronRight,
  MessageCircle
} from 'lucide-react';
import { services } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';
import OpsyneraGlobe from '../components/OpsyneraGlobe';
import { industries } from '../data/industries';

const trustIndicators = [
  {
    title: 'Trusted Advisory',
    subtitle: 'With Integrity',
    Icon: ShieldCheck,
  },
  {
    title: 'Data-Driven Insights',
    subtitle: 'for Informed Decisions',
    Icon: TrendingUp,
  },
  {
    title: 'Confidential & Professional',
    subtitle: 'at Every Step',
    Icon: Handshake,
  },
];

const keyServicesNav = [
  {
    id: 'strategic-risk-advisory',
    title: 'Strategic Risk Advisory',
    slug: 'strategic-risk-advisory',
    Icon: ShieldCheck,
  },
  {
    id: 'due-diligence',
    title: 'Due Diligence & Background Intelligence',
    slug: 'due-diligence',
    Icon: Search,
  },
  {
    id: 'osint-research',
    title: 'OSINT & Intelligence Research',
    slug: 'osint-research',
    Icon: Globe,
  },
  {
    id: 'cyber-digital-risk',
    title: 'Cyber & Digital Risk Advisory',
    slug: 'cyber-digital-risk',
    Icon: ShieldAlert,
  },
  {
    id: 'field-verification',
    title: 'Field Verification & Ground Intelligence',
    slug: 'field-verification',
    Icon: MapPin,
  },
  {
    id: 'corporate-intelligence',
    title: 'Corporate Intelligence & Investigative Advisory',
    slug: 'corporate-intelligence',
    Icon: Building2,
  },
];

const coreValues = [
  { name: 'Integrity', Icon: ShieldCheck },
  { name: 'Confidentiality', Icon: Lock },
  { name: 'Analytical Excellence', Icon: LineChart },
  { name: 'Client-Centricity', Icon: Users },
  { name: 'Ethical Responsibility', Icon: Scale },
];

const methodologySteps = [
  { number: '01', title: 'Understand the Requirement', desc: 'Identify core client objectives, strategic priorities, and organizational risk boundaries.' },
  { number: '02', title: 'Define the Scope', desc: 'Establish exact research parameters, authorized channels, deliverables, and timelines.' },
  { number: '03', title: 'Conduct Authorized Research', desc: 'Execute multi-source intelligence gathering and rigorous verification strictly within legal boundaries.' },
  { number: '04', title: 'Analyse Relevant Information', desc: 'Synthesize data through analytical frameworks, cross-reference findings, and extract actionable meaning.' },
  { number: '05', title: 'Deliver Clear Findings', desc: 'Present executive briefings and decision-grade reports designed for high-stakes governance.' },
];

export default function Home() {
  return (
    <main className="bg-white overflow-hidden">

      {/* ── 1. HERO SECTION ───────────────────────────────── */}
      <section className="relative pt-[100px] lg:pt-[124px] pb-12 lg:pb-16 bg-white overflow-hidden">
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[580px]">
            
            {/* Left Column: Headline & CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Category Pill / Tag */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-2.5 mb-4"
              >
                <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
                <span className="text-[11px] sm:text-[12px] font-extrabold tracking-[0.2em] text-[#071A3D] uppercase">
                  Strategic Intelligence Advisory
                </span>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-4xl sm:text-5xl lg:text-[54px] xl:text-[58px] font-extrabold text-[#071A3D] leading-[1.12] tracking-tight mb-5"
              >
                Security Consultancy for{' '}
                <span className="text-[#F4B323] inline-block">Better Decisions</span>
              </motion.h1>

              {/* Supporting Paragraph */}
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.16 }}
                className="text-[15px] sm:text-[16px] text-[#17233D]/80 leading-relaxed max-w-xl mb-8"
              >
                Opsynera helps organisations assess risks, identify gaps, and plan practical security measures with confidence — from security reviews and audits to TVRA, protection planning, training, and advisory support.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.24 }}
                className="flex flex-wrap items-center gap-3.5 mb-10"
              >
                <Link to="/contact" className="btn-gold px-6 py-3 text-sm">
                  Book a Consultation <ArrowRight size={15} />
                </Link>
                <Link to="/contact" className="btn-pill-outline px-6 py-3 text-sm flex items-center gap-2">
                  <MessageCircle size={16} className="text-[#071A3D]" />
                  WhatsApp Us
                </Link>
                <Link to="/services" className="text-xs font-bold text-[#071A3D] hover:text-[#F4B323] transition-colors ml-2 flex items-center gap-1">
                  Explore Services <ChevronRight size={14} />
                </Link>
              </motion.div>

              {/* Three Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.32 }}
                className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4 sm:gap-6"
              >
                {trustIndicators.map((item, idx) => (
                  <div key={item.title} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white border border-[#F4B323]/40 shadow-sm flex items-center justify-center flex-shrink-0">
                      <item.Icon size={19} className="text-[#F4B323]" strokeWidth={2} />
                    </div>
                    <div className="leading-tight">
                      <div className="text-[12.5px] font-bold text-[#071A3D]">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {item.subtitle}
                      </div>
                    </div>
                    {idx < trustIndicators.length - 1 && (
                      <div className="hidden md:block w-px h-8 bg-slate-200 ml-3" />
                    )}
                  </div>
                ))}
              </motion.div>

            </div>

            {/* Right Column: 3D Rotating Earth Globe (Package Component) */}
            <div className="lg:col-span-5 relative flex items-center justify-center mt-4 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="relative w-full max-w-[480px] lg:max-w-[520px] aspect-square flex items-center justify-center z-10"
              >
                <OpsyneraGlobe height="100%" />
              </motion.div>
            </div>

          </div>
        </div>
      </section>


      {/* ── 2. KEY SERVICES SHOWCASE PANEL ────────────────── */}
      <section className="relative site-container pb-14 lg:pb-16">
        <div className="bg-[#071A3D] rounded-2xl sm:rounded-3xl shadow-[0_20px_50px_rgba(7,26,61,0.22)] p-6 sm:p-8 lg:p-9 border-t-2 border-[#F4B323]/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Header Portion */}
            <div className="lg:col-span-3 lg:border-r lg:border-slate-700/60 lg:pr-6">
              <span className="w-6 h-[3px] bg-[#F4B323] rounded-full inline-block mb-2" />
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-2">
                Our Key Services
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed">
                Comprehensive intelligence advisory for a complex world.
              </p>
            </div>

            {/* Right Horizontal Services Arrangement */}
            <div className="lg:col-span-9 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-2">
              {keyServicesNav.map((service, idx) => {
                const Icon = service.Icon;
                return (
                  <Link
                    key={service.id}
                    to={`/services#${service.slug}`}
                    className={`group flex flex-col items-center text-center p-3 rounded-xl transition-all duration-200 hover:bg-white/5 relative ${
                      idx < keyServicesNav.length - 1 ? 'xl:border-r xl:border-slate-700/40' : ''
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-2.5 transition-transform duration-200 group-hover:scale-110">
                      <Icon size={22} className="text-[#F4B323]" strokeWidth={1.8} />
                    </div>
                    <span className="text-[12px] font-bold text-white group-hover:text-[#F4B323] leading-snug transition-colors">
                      {service.title}
                    </span>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </section>


      {/* ── 3. ABOUT OPSYNERA SECTION ─────────────────────── */}
      <section className="site-container py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: About Narrative */}
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
              <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#071A3D] uppercase">
                About Opsynera
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] leading-[1.18] tracking-tight mb-5">
              Bringing Clarity to{' '}
              <span className="text-[#F4B323]">Complex Situations.</span>
            </h2>

            <p className="text-[15px] sm:text-[16px] text-slate-600 leading-relaxed mb-6">
              We are an intelligence advisory initiative designed to help businesses understand risks, evaluate information, and make informed decisions.
            </p>

            <p className="text-[14px] text-slate-500 leading-relaxed mb-8">
              In an environment where information is constantly evolving, our structured research and analytical rigor provide executives and legal counsel with clear, defensible intelligence.
            </p>

            <Link to="/about" className="btn-pill-outline px-6 py-2.5 text-xs font-bold inline-flex items-center gap-2">
              Learn More <ArrowRight size={13} />
            </Link>
          </div>

          {/* Right Column: Our Core Values (5 values horizontally/grid) */}
          <div className="lg:col-span-6 lg:border-l lg:border-slate-200 lg:pl-10">
            <h3 className="text-2xl font-extrabold text-[#071A3D] mb-8">
              Our Core Values
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
              {coreValues.map((val) => {
                const Icon = val.Icon;
                return (
                  <div
                    key={val.name}
                    className="flex flex-col items-center text-center p-3 rounded-xl border border-slate-100 bg-[#F5F7FA] hover:bg-white hover:border-[#F4B323] transition-all duration-200 shadow-sm"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mb-3 shadow-xs">
                      <Icon size={20} className="text-[#F4B323]" strokeWidth={2} />
                    </div>
                    <span className="text-xs font-bold text-[#071A3D] leading-tight">
                      {val.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 p-4 bg-slate-50 border border-slate-200/80 rounded-xl flex items-start gap-3">
              <ShieldCheck size={18} className="text-[#F4B323] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-[#071A3D]">Confidentiality Guarantee:</strong> Every advisory engagement is conducted with strict professional discretion and in strict alignment with legal boundaries.
              </p>
            </div>
          </div>

        </div>
      </section>


      {/* ── 4. DETAILED SERVICES SHOWCASE ─────────────────── */}
      <section className="bg-[#F5F7FA] py-16 lg:py-24 border-y border-slate-200/70">
        <div className="site-container">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
                <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#071A3D] uppercase">
                  Areas of Expertise
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] tracking-tight">
                Specialized Intelligence Services
              </h2>
            </div>
            <p className="text-sm text-slate-500 max-w-sm md:text-right">
              Tailored scopes of engagement with clear analytical methodologies and actionable reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>

        </div>
      </section>


      {/* ── 5. ENGAGEMENT METHODOLOGY ─────────────────────── */}
      <section className="site-container py-16 lg:py-24">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
            <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#071A3D] uppercase">
              Our Methodology
            </span>
            <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] tracking-tight mb-4">
            A Structured Approach to Every Engagement
          </h2>
          <p className="text-slate-600 text-sm">
            We follow a transparent, five-phase protocol to guarantee analytical integrity and actionable results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {methodologySteps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              viewport={{ once: true }}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-[#F4B323] hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <span className="text-xs font-black tracking-widest text-[#F4B323] uppercase block mb-3">
                  Phase {step.number}
                </span>
                <h4 className="text-sm font-bold text-[#071A3D] mb-2 leading-snug group-hover:text-[#1676C5] transition-colors">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 group-hover:text-[#071A3D] transition-colors">
                <span>Step {idx + 1} of 5</span>
                <ChevronRight size={13} className="text-[#F4B323]" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/services" className="btn-pill-outline text-xs px-6 py-2.5">
            Explore Full Engagement Protocol →
          </Link>
        </div>
      </section>


      {/* ── 6. INDUSTRIES SERVED PREVIEW ──────────────────── */}
      <section className="bg-[#071A3D] text-white py-16 lg:py-20 relative overflow-hidden">
        {/* Subtle grid backdrop */}
        <div className="absolute inset-0 dot-matrix-dark opacity-30 pointer-events-none" />

        <div className="site-container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
                <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#F4B323] uppercase">
                  Sectors We Serve
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Tailored Advisory for Every Industry
              </h2>
            </div>
            <Link to="/industries" className="text-xs font-bold text-[#F4B323] hover:underline flex items-center gap-1.5">
              View All 5 Industry Sectors <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.slice(0, 3).map((ind) => (
              <div
                key={ind.id}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#F4B323]/50 transition-all duration-200"
              >
                <div className="text-2xl font-black text-[#F4B323] mb-3">
                  {ind.number}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {ind.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {ind.description}
                </p>
                <Link to="/industries" className="text-[11px] font-bold text-[#F4B323] hover:underline inline-flex items-center gap-1">
                  Read Industry Focus <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── 7. CTA SECTION ────────────────────────────────── */}
      <CTASection
        heading="Need Greater Clarity on a Business Concern?"
        description="Share your requirements with Opsynera and explore how structured intelligence advisory may support your critical decision-making."
        primaryBtn="Book a Consultation"
        primaryPath="/contact"
        secondaryBtn="Explore Our Services"
        secondaryPath="/services"
      />

    </main>
  );
}
