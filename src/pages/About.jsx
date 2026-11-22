import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, LineChart, Users, Scale } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

// ── Exact content per client screenshots ──────────────────────────
const coreValues = [
  {
    title: 'Integrity',
    desc: 'We emphasize honest analysis, responsible conduct, and professional accountability.',
    Icon: ShieldCheck,
  },
  {
    title: 'Confidentiality',
    desc: 'We prioritize the appropriate protection and handling of client information.',
    Icon: Lock,
  },
  {
    title: 'Analytical Excellence',
    desc: 'We focus on structured research, critical thinking, and clear presentation of findings.',
    Icon: LineChart,
  },
  {
    title: 'Client-Centricity',
    desc: "We seek to understand each client's requirements before defining the scope of an engagement.",
    Icon: Users,
  },
  {
    title: 'Ethical Responsibility',
    desc: 'We conduct work within authorized boundaries and in accordance with applicable laws and privacy requirements.',
    Icon: Scale,
  },
];

export default function About() {
  return (
    <main className="bg-transparent">
      <PageHero
        eyebrow="Who We Are"
        heading="About Opsynera"
        subtitle="Bringing Clarity to Complex Situations."
      />

      {/* ── Section 1: About Opsynera ─────────────────────────── */}
      <section className="site-container py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left — text content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-7 h-[3px] bg-[#C49A6C] rounded-full inline-block" />
              <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#071A3D] uppercase">
                Section 1 — About Opsynera
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] leading-tight mb-6">
              An Intelligence Advisory Initiative Built for{' '}
              <span className="text-[#C49A6C]">Strategic Decision-Making</span>
            </h2>

            <div className="space-y-4 text-[15px] sm:text-[16px] text-slate-600 leading-relaxed">
              <p>
                Opsynera – Strategic Intelligence Advisory is an intelligence advisory initiative designed to
                help businesses and institutions understand risks, evaluate information, and make informed decisions.
              </p>
              <p>
                In an environment where information is constantly evolving, identifying relevant details and
                understanding their implications can be challenging.
              </p>
              <p>
                Opsynera aims to address this challenge through structured research, analytical assessment,
                and clear reporting.
              </p>
              <p>
                Our focus is not simply on gathering information, but on helping clients understand what that
                information may mean for their decisions.
              </p>
            </div>

            {/* Pull-quote */}
            <div className="mt-8 p-5 bg-[#F5F7FA] border-l-4 border-[#C49A6C] rounded-r-xl">
              <p className="text-sm font-semibold text-[#071A3D] leading-relaxed italic">
                "Our focus is not simply on gathering information, but on helping clients understand what
                that information may mean for their decisions."
              </p>
            </div>
          </motion.div>

          {/* Right — Company Logo, large square */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: '1 / 1' }}
            >
              <img
                src="/logo.png"
                alt="Opsynera"
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── Section 2: Our Core Values ────────────────────────── */}
      <section className="bg-[#F5F7FA]/75 backdrop-blur-[2px] py-10 lg:py-16 border-y border-slate-200/80">
        <div className="site-container">

          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] tracking-tight mb-3">
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
                  className="card-hover bg-white border border-slate-200/90 rounded-2xl p-7 shadow-xs hover:border-[#C49A6C]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#071A3D] flex items-center justify-center mb-5 shadow-xs">
                    <Icon size={22} className="text-[#C49A6C]" strokeWidth={2} />
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
          </div>

        </div>
      </section>

      {/* ── Section 3: Our Commitment ─────────────────────────── */}
      <section className="bg-[#F5F7FA]/75 backdrop-blur-[2px] py-10 lg:py-16 border-b border-slate-200/80">
        <div className="site-container">

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A3D] tracking-tight mb-3">
              Our <span className="text-[#C49A6C]">Commitment</span>
            </h2>
            <p className="text-slate-600 text-sm">
              Opsynera recognizes that intelligence advisory work requires discretion, objectivity, and responsibility.
            </p>
          </div>

          {/* Commitment statements — 2-col icon list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8 max-w-4xl mx-auto">
            {[
              'We aim to provide clear, structured findings while respecting confidentiality, privacy, and applicable legal requirements.',
              'We operate as an advisory service, not as a law-enforcement agency. We do not undertake unauthorized surveillance, hacking, or access to restricted information.',
              'Our objective is to help clients develop a clearer understanding of relevant issues so they can make informed decisions.',
              'All research and advisory work is conducted within authorized boundaries and in accordance with applicable laws.',
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-[#071A3D] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="#C49A6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed">{point}</p>
              </motion.div>
            ))}
          </div>

          {/* Three pillar cards — navy */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              {
                title: 'Discretion',
                desc: 'Every engagement is handled with the highest level of professional confidentiality.',
              },
              {
                title: 'Objectivity',
                desc: 'Our findings are free from bias, speculation, or unverified conjecture.',
              },
              {
                title: 'Responsibility',
                desc: 'We operate strictly within authorized boundaries and applicable legal frameworks.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-[#071A3D] rounded-2xl p-6 border-t-2 border-[#C49A6C]"
              >
                <span className="text-[10px] font-black tracking-widest text-[#C49A6C] uppercase block mb-3">
                  Pillar {String(i + 1).padStart(2, '0')}
                </span>
                <h4 className="text-base font-extrabold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <CTASection
        heading="Discuss Your Strategic Concerns With Us"
        description="Reach out to Opsynera to explore how structured intelligence advisory can support your decision-making."
        primaryBtn="Initiate an Inquiry"
        primaryPath="/contact"
        secondaryBtn="View Service Portfolio"
        secondaryPath="/services"
      />
    </main>
  );
}
