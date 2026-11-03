import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Shield, Lock, LineChart, Users, Scale } from 'lucide-react';
import { services } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import CTASection from '../components/CTASection';

const values = [
  { title: 'Integrity', desc: 'Honest analysis, responsible conduct, and professional accountability in every engagement.', Icon: Shield },
  { title: 'Confidentiality', desc: 'Appropriate protection and careful handling of client information at all times.', Icon: Lock },
  { title: 'Analytical Excellence', desc: 'Structured research, critical thinking, and clear presentation of findings.', Icon: LineChart },
  { title: 'Client-Centricity', desc: "Understanding each client's requirements before defining the scope of work.", Icon: Users },
  { title: 'Ethical Responsibility', desc: 'Work conducted within authorized boundaries and applicable legal requirements.', Icon: Scale },
];

const steps = [
  'Understand the Requirement',
  'Define the Scope',
  'Conduct Authorized Research',
  'Analyse Relevant Information',
  'Deliver Clear Findings',
];

export default function Home() {
  return (
    <main>

      {/* ── HERO ─────────────────────────────── */}
      <section style={{
        position: 'relative',
        background: '#0B1626',
        minHeight: '88vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <div className="hero-grid" style={{ position: 'absolute', inset: 0 }} />
        {/* Right watermark */}
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%',
          backgroundImage: 'url(/logo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '70% center',
          backgroundSize: '380px',
          opacity: 0.035,
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0B1626 52%, transparent)' }} />

        <div className="site-container" style={{ position: 'relative', zIndex: 2, paddingTop: '100px', paddingBottom: '72px', width: '100%' }}>
          <div style={{ maxWidth: '580px' }}>
            <motion.span className="eyebrow" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              Strategic Intelligence Advisory
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: 'clamp(32px, 5.5vw, 60px)',
                fontWeight: 600,
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: '20px',
                letterSpacing: '-0.01em',
              }}
            >
              Bringing Clarity to{' '}
              <span style={{ color: '#B59A67' }}>Complex</span>{' '}
              Situations.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.18 }}
              style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.75, marginBottom: '36px', maxWidth: '500px', fontWeight: 400 }}
            >
              Opsynera helps businesses and institutions understand risks, evaluate relevant information, and make informed decisions through structured research and clear reporting.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex-col-to-row"
            >
              <Link to="/services" className="btn-primary">
                Explore Our Services <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}
        >
          <span style={{ fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#475569' }}>Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.7 }}>
            <ChevronDown size={15} color="#B59A67" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── INTRODUCTION ─────────────────────── */}
      <section style={{ background: '#ffffff' }} className="section-pad">
        <div className="site-container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            {/* Left */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }} viewport={{ once: true }}>
              <span className="gold-bar" />
              <span className="eyebrow">About Opsynera</span>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 600, color: '#0B1626', lineHeight: 1.2, marginBottom: '18px' }}>
                Intelligence That Supports Informed Decisions
              </h2>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, marginBottom: '14px' }}>
                Opsynera is an intelligence advisory initiative focused on helping businesses and institutions navigate uncertainty through structured research, risk assessment, and practical insights.
              </p>
              <p style={{ fontSize: '16px', color: '#475569', lineHeight: 1.8, marginBottom: '28px' }}>
                Our focus is not simply on gathering information, but on helping clients understand what that information may mean for their decisions.
              </p>
              <Link to="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 700, color: '#B59A67', textDecoration: 'none', letterSpacing: '0.04em' }}>
                Learn About Us <ArrowRight size={13} />
              </Link>
            </motion.div>

            {/* Right visual */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.55, delay: 0.1 }} viewport={{ once: true }}>
              <div style={{
                aspectRatio: '4/3',
                overflow: 'hidden',
                border: '1px solid rgba(181,154,103,0.2)',
              }}>
                <img
                  src="/logo.png"
                  alt="Opsynera"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                  }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────── */}
      <section style={{ background: '#F8F9FB' }} className="section-pad">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: true }} style={{ marginBottom: '40px' }}>
            <span className="gold-bar" />
            <span className="eyebrow">What We Do</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '12px' }}>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(20px, 3.5vw, 32px)', fontWeight: 600, color: '#0B1626', lineHeight: 1.2 }}>
                Our Areas of Expertise
              </h2>
              <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '240px', textAlign: 'right', lineHeight: 1.6 }}>
                Structured Intelligence. Practical Insights.
              </p>
            </div>
          </motion.div>

          <div className="grid-3">
            {services.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── APPROACH ─────────────────────────── */}
      <section style={{ background: '#ffffff' }} className="section-pad">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: true }} style={{ marginBottom: '40px' }}>
            <span className="gold-bar" />
            <span className="eyebrow">Our Methodology</span>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(20px, 3.5vw, 32px)', fontWeight: 600, color: '#0B1626', lineHeight: 1.2, maxWidth: '480px' }}>
              A Structured Approach to Every Engagement
            </h2>
          </motion.div>

          <div className="grid-5">
            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.09 }}
                viewport={{ once: true }}
                style={{
                  padding: '24px 20px',
                  background: '#0B1626',
                  borderTop: '3px solid #B59A67',
                }}
              >
                <div style={{ fontFamily: 'Manrope, sans-serif', fontSize: '11px', fontWeight: 800, color: '#B59A67', letterSpacing: '0.14em', marginBottom: '14px' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <p style={{ fontFamily: 'Manrope, sans-serif', fontSize: '13px', fontWeight: 600, color: '#ffffff', lineHeight: 1.45 }}>
                  {step}
                </p>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: '32px' }}>
            <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 700, color: '#B59A67', textDecoration: 'none' }}>
              View Full Engagement Process <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────── */}
      <section style={{ background: '#F8F9FB' }} className="section-pad">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: true }} style={{ marginBottom: '40px' }}>
            <span className="gold-bar" />
            <span className="eyebrow">Why Opsynera</span>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(20px, 3.5vw, 32px)', fontWeight: 600, color: '#0B1626', lineHeight: 1.2, maxWidth: '480px' }}>
              Built on Clarity, Integrity and Responsibility
            </h2>
          </motion.div>

          <div className="grid-5">
            {values.map(({ title, desc, Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                viewport={{ once: true }}
                className="card-hover"
                style={{ background: '#ffffff', border: '1px solid #E2E8F0', padding: '28px 24px' }}
              >
                <div style={{ width: '38px', height: '38px', background: '#0B1626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon size={17} color="#B59A67" />
                </div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, color: '#0B1626', marginBottom: '8px' }}>{title}</h3>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Need Greater Clarity on a Business Concern?"
        description="Share your requirements with Opsynera and explore how structured intelligence advisory may support your decision-making."
        primaryBtn="Start an Inquiry"
        primaryPath="/contact"
      />
    </main>
  );
}
