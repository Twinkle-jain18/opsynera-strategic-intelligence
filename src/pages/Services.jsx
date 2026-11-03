import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Search, Globe, Zap, MapPin, BarChart2, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import PageHero from '../components/PageHero';
import EngagementTimeline from '../components/EngagementTimeline';
import CTASection from '../components/CTASection';
import { services } from '../data/services';

const serviceIcons = {
  'strategic-risk-advisory': ShieldCheck,
  'due-diligence': Search,
  'osint-research': Globe,
  'cyber-digital-risk': Zap,
  'field-verification': MapPin,
  'corporate-intelligence': BarChart2,
};

const H2 = { fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(19px, 3vw, 28px)', fontWeight: 600, color: '#0B1626', lineHeight: 1.2 };

export default function Services() {
  return (
    <main>
      <PageHero
        eyebrow="What We Offer"
        heading="Our Services"
        subtitle="Structured Intelligence. Practical Insights. Informed Decisions."
        description="Each engagement is tailored to the client's needs, with scope, methodology, and deliverables agreed before work begins."
      />

      {/* ── Service Sections ── */}
      <section style={{ background: '#ffffff' }}>
        <div className="site-container">
          {services.map((service, i) => {
            const Icon = serviceIcons[service.id] || ShieldCheck;
            const isEven = i % 2 === 0;

            return (
              <motion.article
                key={service.id}
                id={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                style={{
                  display: 'grid',
                  gap: '40px',
                  alignItems: 'start',
                  padding: '64px 0',
                  borderBottom: i < services.length - 1 ? '1px solid #E2E8F0' : 'none',
                }}
                className="grid-2"
              >
                {/* Content col */}
                <div style={{ order: isEven ? 0 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                    <div style={{ width: '36px', height: '36px', background: '#0B1626', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} color="#B59A67" />
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#B59A67', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                      Service {service.number}
                    </span>
                  </div>

                  <h2 style={{ ...H2, marginBottom: '14px' }}>{service.title}</h2>
                  <p style={{ fontSize: '15px', color: '#475569', lineHeight: 1.8, marginBottom: '22px' }}>{service.shortDesc}</p>

                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 22px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {service.offerings.map(item => (
                      <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                        <CheckCircle size={14} color="#B59A67" style={{ flexShrink: 0, marginTop: '3px' }} />
                        <span style={{ fontSize: '14px', color: '#475569', lineHeight: 1.65 }}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {service.note && (
                    <div style={{ display: 'flex', gap: '10px', background: '#fffbeb', borderLeft: '2px solid #f59e0b', padding: '12px 14px', marginBottom: '22px' }}>
                      <AlertCircle size={14} color="#d97706" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <p style={{ fontSize: '13px', color: '#92400e', lineHeight: 1.65 }}>{service.note}</p>
                    </div>
                  )}

                  <Link to={`/contact?service=${encodeURIComponent(service.title)}`} className="btn-outline">
                    Enquire About This Service <ArrowRight size={13} />
                  </Link>
                </div>

                {/* Visual col */}
                <div style={{ order: isEven ? 1 : 0 }}>
                  <div style={{
                    background: '#F8F9FB',
                    border: '1px solid #E2E8F0',
                    padding: '40px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    minHeight: '240px',
                    position: 'relative',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      position: 'absolute', bottom: '-16px', right: '-6px',
                      fontSize: '120px', fontFamily: 'Manrope, sans-serif', fontWeight: 900,
                      color: '#E8ECF0', lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                    }}>
                      {service.number}
                    </div>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{ width: '42px', height: '42px', background: '#0B1626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <Icon size={19} color="#B59A67" />
                      </div>
                      <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '17px', fontWeight: 600, color: '#0B1626', lineHeight: 1.3, marginBottom: '8px' }}>
                        {service.title}
                      </h3>
                      <p style={{ fontSize: '11px', color: '#B59A67', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                        {service.offerings.length} Core Offerings
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* ── Engagement Process ── */}
      <section style={{ background: '#F8F9FB' }} className="section-pad">
        <div className="site-container">
          <motion.div initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} viewport={{ once: true }} style={{ marginBottom: '40px' }}>
            <span className="gold-bar" />
            <span className="eyebrow">How We Work</span>
            <h2 style={H2}>Our Engagement Process</h2>
          </motion.div>
          <EngagementTimeline />
        </div>
      </section>

      <CTASection heading="Discuss Your Requirements With Opsynera" primaryBtn="Submit an Inquiry" primaryPath="/contact" />
    </main>
  );
}
