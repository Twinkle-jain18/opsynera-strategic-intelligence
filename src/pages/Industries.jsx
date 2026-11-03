import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Landmark, Monitor, Layers, Briefcase, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import CTASection from '../components/CTASection';
import { industries } from '../data/industries';

const iconMap = { Building2, Landmark, Monitor, Layers, Briefcase };

const BODY = { fontSize: '15px', color: '#475569', lineHeight: 1.8, fontWeight: 400 };
const H2 = { fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(19px, 3vw, 28px)', fontWeight: 600, color: '#0B1626', lineHeight: 1.2 };

export default function Industries() {
  return (
    <main>
      <PageHero
        eyebrow="Sectors We Serve"
        heading="Industries We Aim to Serve"
        subtitle="Intelligence Advisory for Diverse Business Needs"
      />

      {/* ── Intro ── */}
      <section style={{ background: '#ffffff' }} className="section-pad">
        <div className="site-container">
          <div className="grid-asymm" style={{ alignItems: 'start' }}>
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} viewport={{ once: true }}>
              <span className="gold-bar" />
              <span className="eyebrow">Our Reach</span>
              <h2 style={H2}>Tailored Advisory for Every Sector</h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.1 }} viewport={{ once: true }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={BODY}>Different industries face different forms of uncertainty.</p>
                <p style={BODY}>Opsynera aims to support businesses and institutions through tailored intelligence research, risk analysis, and advisory services aligned with their specific requirements.</p>
                <p style={BODY}>Our approach focuses on understanding the context of each engagement and identifying relevant information that can support informed decisions.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Industry Cards — animated one by one ── */}
      <section style={{ background: '#F8F9FB' }} className="section-pad">
        <div className="site-container">
          <div className="grid-2-sm">
            {industries.map((industry, i) => {
              const Icon = iconMap[industry.icon] || Building2;
              /* Alternate: even = slide from left, odd = slide from right */
              const xDir = i % 2 === 0 ? -20 : 20;

              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, x: xDir, y: 12 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.55, delay: (i % 2) * 0.1 }}
                  viewport={{ once: true, margin: '-48px' }}
                  className="card-hover"
                  style={{
                    background: '#ffffff',
                    border: '1px solid #E2E8F0',
                    padding: '36px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {/* Top row: icon + number */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px' }}>
                    <div style={{
                      width: '44px', height: '44px',
                      background: '#0B1626',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={19} color="#B59A67" />
                    </div>
                    <span style={{
                      fontSize: '32px',
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 800,
                      color: '#F1F5F9',
                      lineHeight: 1,
                      userSelect: 'none',
                    }}>
                      {industry.number}
                    </span>
                  </div>

                  {/* Gold accent line */}
                  <div style={{ width: '28px', height: '2px', background: '#B59A67', marginBottom: '14px' }} />

                  {/* Title */}
                  <h3 style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#0B1626',
                    lineHeight: 1.35,
                    marginBottom: '12px',
                  }}>
                    {industry.title}
                  </h3>

                  {/* Description */}
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8, flex: 1, marginBottom: '22px' }}>
                    {industry.description}
                  </p>

                  {/* CTA */}
                  <Link
                    to="/contact"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11.5px',
                      fontWeight: 700,
                      color: '#B59A67',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                    }}
                  >
                    Discuss Your Requirements <ArrowRight size={11} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        heading="Every Organization Faces Unique Challenges"
        description="Connect with Opsynera to discuss your organization's specific information and risk advisory requirements."
        primaryBtn="Contact Opsynera"
        primaryPath="/contact"
      />
    </main>
  );
}
