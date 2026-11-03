import { motion } from 'framer-motion';
import { Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import InquiryForm from '../components/InquiryForm';
import { companyInfo } from '../data/companyInfo';

const H2 = { fontFamily: 'Manrope, sans-serif', fontSize: '20px', fontWeight: 600, color: '#0B1626', lineHeight: 1.2 };

export default function Contact() {
  const { contact } = companyInfo;
  const hasContact = contact.email || contact.phone || contact.address;

  return (
    <main>
      <PageHero
        eyebrow="Get In Touch"
        heading="Contact Opsynera"
        subtitle="Let's start with clarity."
        description="We welcome inquiries from businesses, institutions, and eligible professional clients."
      />

      <section style={{ background: '#ffffff' }} className="section-pad">
        <div className="site-container">
          <div className="grid-contact">

            {/* Left: Info */}
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
              <span className="gold-bar" />
              <span className="eyebrow">Contact Information</span>
              <h2 style={{ ...H2, marginBottom: '12px' }}>{companyInfo.fullName}</h2>
              <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.8, marginBottom: '28px', fontWeight: 400 }}>
                Share a brief description of your needs and our team will review whether the request aligns with our services.
              </p>

              {hasContact ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {contact.email && (
                    <div>
                      <p style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B59A67', marginBottom: '4px' }}>Email</p>
                      <a href={`mailto:${contact.email}`} style={{ fontSize: '14px', color: '#0B1626', textDecoration: 'none' }}>{contact.email}</a>
                    </div>
                  )}
                  {contact.phone && (
                    <div>
                      <p style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B59A67', marginBottom: '4px' }}>Phone</p>
                      <p style={{ fontSize: '14px', color: '#0B1626' }}>{contact.phone}</p>
                    </div>
                  )}
                  {contact.address && (
                    <div>
                      <p style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B59A67', marginBottom: '4px' }}>Address</p>
                      <p style={{ fontSize: '14px', color: '#0B1626', lineHeight: 1.65 }}>{contact.address}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <Info size={14} color="#B59A67" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.75, fontWeight: 400 }}>
                    Contact details will be available shortly. Please use the inquiry form to get in touch.
                  </p>
                </div>
              )}

              <div style={{ borderTop: '1px solid #E2E8F0', marginTop: '32px', paddingTop: '24px' }}>
                <p style={{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#B59A67', marginBottom: '10px' }}>
                  Privacy Notice
                </p>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75, marginBottom: '8px' }}>
                  Please share only information necessary to describe your inquiry. Do not submit passwords, financial credentials, or confidential third-party records.
                </p>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75 }}>
                  Handled in accordance with our{' '}
                  <Link to="/privacy-policy" style={{ color: '#B59A67', textDecoration: 'underline' }}>Privacy Policy</Link>.
                </p>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} viewport={{ once: true }}>
              <span className="gold-bar" />
              <h2 style={{ ...H2, marginBottom: '5px' }}>Submit an Inquiry</h2>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '28px', fontWeight: 400 }}>
                Fields marked <span style={{ color: '#ef4444' }}>*</span> are required.
              </p>
              <InquiryForm />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
