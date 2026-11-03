import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, LineChart, Users, Scale } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';

const values = [
  { title: 'Integrity', desc: 'Honest analysis, responsible conduct, and professional accountability.', Icon: Shield },
  { title: 'Confidentiality', desc: 'Appropriate protection and handling of client information.', Icon: Lock },
  { title: 'Analytical Excellence', desc: 'Structured research, critical thinking, and clear presentation of findings.', Icon: LineChart },
  { title: 'Client-Centricity', desc: "Understanding each client's requirements before defining the scope of engagement.", Icon: Users },
  { title: 'Ethical Responsibility', desc: 'Work within authorized boundaries and applicable laws.', Icon: Scale },
];

const H2 = { fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(20px, 3.2vw, 30px)', fontWeight: 600, color: '#0B1626', lineHeight: 1.2 };
const BODY = { fontSize: '16px', color: '#475569', lineHeight: 1.8, fontWeight: 400 };

export default function About() {
  return (
    <main>
      <PageHero eyebrow="Who We Are" heading="About Opsynera" subtitle="Bringing Clarity to Complex Situations." />

      {/* ── Introduction ── */}
      <section style={{ background: '#ffffff' }} className="section-pad">
        <div className="site-container">
          <div className="grid-2" style={{ alignItems: 'start' }}>

            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <span className="gold-bar" />
              <span className="eyebrow">Our Purpose</span>
              <h2 style={{ ...H2, marginBottom: '20px' }}>An Intelligence Advisory Initiative</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  'Opsynera – Strategic Intelligence Advisory is an initiative designed to help businesses and institutions understand risks, evaluate information, and make informed decisions.',
                  'In an environment where information is constantly evolving, identifying relevant details and understanding their implications can be challenging.',
                  'Opsynera addresses this challenge through structured research, analytical assessment, and clear reporting.',
                ].map((text, i) => <p key={i} style={BODY}>{text}</p>)}
                <p style={{ ...BODY, color: '#0B1626', fontWeight: 600 }}>
                  Our focus is not simply on gathering information, but on helping clients understand what that information may mean for their decisions.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
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

      {/* ── Core Values ── */}
      <section style={{ background: '#F8F9FB' }} className="section-pad">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }} style={{ marginBottom: '36px' }}>
            <span className="gold-bar" />
            <span className="eyebrow">Foundation</span>
            <h2 style={H2}>Our Core Values</h2>
          </motion.div>

          {/* Row 1: 3 cards */}
          <div className="grid-3" style={{ marginBottom: '20px' }}>
            {values.slice(0, 3).map(({ title, desc, Icon }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}
                className="card-hover" style={{ background: '#ffffff', border: '1px solid #E2E8F0', padding: '32px 28px' }}>
                <div style={{ width: '40px', height: '40px', background: '#0B1626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon size={17} color="#B59A67" />
                </div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '15px', fontWeight: 600, color: '#0B1626', marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Row 2: 2 cards centered */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', maxWidth: '740px', margin: '0 auto' }}>
            {values.slice(3).map(({ title, desc, Icon }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} viewport={{ once: true }}
                className="card-hover" style={{ background: '#ffffff', border: '1px solid #E2E8F0', padding: '32px 28px' }}>
                <div style={{ width: '40px', height: '40px', background: '#0B1626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <Icon size={17} color="#B59A67" />
                </div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '15px', fontWeight: 600, color: '#0B1626', marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Commitment ── */}
      <section style={{ background: '#ffffff' }} className="section-pad">
        <div className="site-container">
          <div className="grid-asymm" style={{ alignItems: 'start' }}>
            <motion.div initial={{ opacity: 0, x: -14 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.45 }} viewport={{ once: true }}>
              <span className="gold-bar" />
              <span className="eyebrow">Our Standards</span>
              <h2 style={H2}>Our Commitment</h2>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.45, delay: 0.1 }} viewport={{ once: true }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={BODY}>Opsynera recognizes that intelligence advisory work requires discretion, objectivity, and responsibility.</p>
                <p style={BODY}>We aim to provide clear, structured findings while respecting confidentiality, privacy, and applicable legal requirements.</p>
                <div style={{ borderLeft: '2px solid #B59A67', paddingLeft: '20px', margin: '6px 0' }}>
                  <p style={{ ...BODY, color: '#0B1626', fontWeight: 600 }}>
                    We operate as an advisory service, not as a law-enforcement agency. We do not undertake unauthorized surveillance, hacking, or access to restricted information.
                  </p>
                </div>
                <p style={BODY}>Our objective is to help clients develop a clearer understanding of relevant issues so they can make informed decisions.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <CTASection heading="Explore How We Can Support Your Organization" primaryBtn="Our Services" primaryPath="/services" secondaryBtn="Contact Us" secondaryPath="/contact" />
    </main>
  );
}
