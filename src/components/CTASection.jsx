import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection({ heading, description, primaryBtn, primaryPath, secondaryBtn, secondaryPath }) {
  return (
    <section style={{ background: '#0B1626', padding: '88px 0' }}>
      <div className="site-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}
          className="lg:flex-row lg:items-end lg:justify-between"
        >
          {/* Text */}
          <div style={{ maxWidth: '540px' }}>
            <span className="gold-bar" />
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.15, marginBottom: description ? '16px' : 0 }}>
              {heading}
            </h2>
            {description && (
              <p style={{ fontSize: '16px', color: '#94a3b8', lineHeight: 1.75 }}>
                {description}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexShrink: 0 }} className="sm:flex-row">
            <Link to={primaryPath || '/contact'} className="btn-primary">
              {primaryBtn || 'Contact Us'} <ArrowRight size={15} />
            </Link>
            {secondaryBtn && (
              <Link to={secondaryPath || '/services'} className="btn-secondary">
                {secondaryBtn}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
