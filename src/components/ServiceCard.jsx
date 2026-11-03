import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Search, Globe, Zap, MapPin, BarChart2 } from 'lucide-react';

const iconMap = {
  'strategic-risk-advisory': ShieldCheck,
  'due-diligence': Search,
  'osint-research': Globe,
  'cyber-digital-risk': Zap,
  'field-verification': MapPin,
  'corporate-intelligence': BarChart2,
};

export default function ServiceCard({ service, index }) {
  const Icon = iconMap[service.id] || ShieldCheck;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      viewport={{ once: true }}
      className="card-hover"
      style={{
        background: '#ffffff',
        border: '1px solid #E2E8F0',
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div style={{
          width: '44px', height: '44px',
          background: '#0B1626',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <Icon size={19} color="#B59A67" />
        </div>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', color: '#B59A67', textTransform: 'uppercase' }}>
          {service.number}
        </span>
      </div>

      <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '17px', fontWeight: 700, color: '#0B1626', lineHeight: 1.3, marginBottom: '12px' }}>
        {service.title}
      </h3>
      <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.75, flex: 1, marginBottom: '24px' }}>
        {service.shortDesc}
      </p>

      <Link
        to="/services"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          fontSize: '12px', fontWeight: 700, color: '#B59A67',
          letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
        }}
        aria-label={`Explore ${service.title}`}
      >
        Explore <ArrowRight size={12} />
      </Link>
    </motion.div>
  );
}
