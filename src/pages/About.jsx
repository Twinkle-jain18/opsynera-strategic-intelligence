import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, LineChart, Users, Scale, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

const coreValues = [
  {
    title: 'Integrity',
    desc: 'Honest analysis, responsible conduct, and uncompromising professional accountability in every client engagement.',
    Icon: ShieldCheck,
  },
  {
    title: 'Confidentiality',
    desc: 'Appropriate protection, strict operational discretion, and rigorous security in handling sensitive client intelligence.',
    Icon: Lock,
  },
  {
    title: 'Analytical Excellence',
    desc: 'Structured multi-source research, objective critical reasoning, and crystal-clear presentation of strategic findings.',
    Icon: LineChart,
  },
  {
    title: 'Client-Centricity',
    desc: "Deeply understanding each client's unique risk landscape and strategic posture before defining the scope of advisory.",
    Icon: Users,
  },
  {
    title: 'Ethical Responsibility',
    desc: 'All advisory and research work is conducted strictly within authorized boundaries and governing legal frameworks.',
    Icon: Scale,
  },
];

const commitments = [
  {
    title: 'Independence & Objectivity',
    desc: 'Our analysis is unclouded by commercial bias or speculative conjecture. We report verifiable ground truth.',
  },
  {
    title: 'Actionable Intelligence',
    desc: 'We synthesize complex data into structured, decision-grade insights directly applicable to executive governance.',
  },
  {
    title: 'Defensible Methodology',
    desc: 'Every finding is backed by authorized research parameters and rigorous cross-verification protocols.',
  },
];

export default function About() {
  return (
    <main className="bg-white">
      <PageHero
        eyebrow="Who We Are"
        heading="About Opsynera"
        subtitle="Bringing Clarity to Complex Situations."
        description="Opsynera is an intelligence advisory initiative dedicated to helping businesses and institutions navigate uncertainty through structured research, analytical assessment, and clear reporting."
      />

      {/* ── 1. Purpose & Origin ───────────────────────── */}
      <section className="site-container py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
              <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#071A3D] uppercase">
                Our Purpose
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] leading-tight mb-6">
              An Intelligence Advisory Initiative Built for{' '}
              <span className="text-[#F4B323]">Strategic Decision-Making</span>
            </h2>

            <div className="space-y-4 text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              <p>
                Opsynera – Strategic Intelligence Advisory is an initiative designed to help businesses and institutions understand risks, evaluate information, and make informed decisions.
              </p>
              <p>
                In an environment where information is constantly evolving and often contradictory, identifying relevant details and understanding their operational implications can be challenging.
              </p>
              <p>
                Opsynera addresses this challenge through structured research, analytical assessment, and clear reporting. We do not provide speculative narratives; we deliver defensible clarity.
              </p>
            </div>

            <div className="mt-8 p-5 bg-[#F5F7FA] border-l-4 border-[#F4B323] rounded-r-xl">
              <p className="text-sm font-semibold text-[#071A3D] leading-relaxed">
                "Our focus is not simply on gathering information, but on helping clients understand what that information truly means for their high-stakes decisions."
              </p>
            </div>
          </motion.div>

          {/* Right Column Visual / Emblem Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="bg-[#071A3D] rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl border-t-2 border-[#F4B323]">
              <div className="absolute inset-0 dot-matrix-dark opacity-20 pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#0B2450] border border-[#F4B323]/50 flex items-center justify-center mb-6 shadow-md">
                  <ShieldCheck size={32} className="text-[#F4B323]" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  Advisory Governance
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Operating across strategic risk, partner due diligence, digital risk analysis, and corporate intelligence.
                </p>

                <div className="space-y-3 border-t border-slate-700/80 pt-6">
                  {commitments.map((c) => (
                    <div key={c.title} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="text-[#F4B323] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">{c.title}</div>
                        <div className="text-[11px] text-slate-400 leading-snug">{c.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 2. Core Values in Depth ───────────────────── */}
      <section className="bg-[#F5F7FA] py-16 lg:py-24 border-y border-slate-200/80">
        <div className="site-container">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
              <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#071A3D] uppercase">
                Ethical Foundation
              </span>
              <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] tracking-tight mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-600 text-sm">
              Five core principles that govern our analytical methodology and advisory standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, i) => {
              const Icon = val.Icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="card-hover bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:border-[#F4B323]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#071A3D] flex items-center justify-center mb-5 shadow-xs">
                    <Icon size={22} className="text-[#F4B323]" strokeWidth={2} />
                  </div>
                  <h3 className="text-base font-bold text-[#071A3D] mb-2.5">
                    {val.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              );
            })}

            {/* Sixth card: Summary commitment */}
            <div className="bg-[#071A3D] text-white rounded-2xl p-7 flex flex-col justify-between border-t-2 border-[#F4B323]">
              <div>
                <span className="text-xs font-black tracking-widest text-[#F4B323] uppercase block mb-3">
                  Our Promise
                </span>
                <h3 className="text-base font-bold text-white mb-2">
                  Defensible Clarity
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We guarantee that every advisory product delivered by Opsynera has undergone rigorous fact verification, lawful evaluation, and structural review.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-700 mt-4">
                <Link to="/contact" className="btn-gold text-xs px-4 py-2 w-full justify-center">
                  Consult With Our Team →
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. Call to Action ─────────────────────────── */}
      <CTASection
        heading="Discuss Your Strategic Concerns With Us"
        description="Schedule a confidential consultation to explore how Opsynera's structured intelligence advisory can protect and empower your organization."
        primaryBtn="Initiate an Inquiry"
        primaryPath="/contact"
        secondaryBtn="View Service Portfolio"
        secondaryPath="/services"
      />
    </main>
  );
}
