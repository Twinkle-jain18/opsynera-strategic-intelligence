import { Link } from 'react-router-dom';
import { companyInfo } from '../data/companyInfo';

const COL_STYLE = { display: 'flex', flexDirection: 'column', gap: '12px' };
const LINK_STYLE = { fontFamily: 'Inter, sans-serif', fontSize: '13.5px', color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' };

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ background: '#0B1626' }} role="contentinfo">
      <div style={{ height: '1px', background: 'rgba(181,154,103,0.35)' }} />

      <div className="site-container" style={{ paddingTop: '60px', paddingBottom: '52px' }}>
        <div className="grid-footer">

          {/* Brand */}
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', marginBottom: '18px' }}>
              <img src="/logo.png" alt="Opsynera" style={{ height: '34px', width: '34px', objectFit: 'contain', mixBlendMode: 'screen' }} onError={(e) => { e.target.style.display = 'none'; }} />
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '13.5px', letterSpacing: '0.15em', color: '#ffffff' }}>OPSYNERA</div>
                <div style={{ fontSize: '7.5px', letterSpacing: '0.13em', textTransform: 'uppercase', color: '#B59A67', marginTop: '3px' }}>Strategic Intelligence Advisory</div>
              </div>
            </Link>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.75 }}>
              Helping organizations navigate uncertainty through structured research, risk assessment, and clear advisory.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '18px' }}>
              Navigation
            </h3>
            <div style={COL_STYLE}>
              {[['Home', '/'], ['About Us', '/about'], ['Services', '/services'], ['Industries Served', '/industries'], ['Contact Us', '/contact']].map(([label, path]) => (
                <Link key={path} to={path} style={LINK_STYLE}
                  onMouseOver={(e) => e.target.style.color = '#B59A67'}
                  onMouseOut={(e) => e.target.style.color = '#64748b'}
                >{label}</Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '18px' }}>
              Services
            </h3>
            <div style={COL_STYLE}>
              {['Strategic Risk Advisory', 'Due Diligence', 'OSINT Research', 'Cyber & Digital Risk', 'Field Verification', 'Corporate Intelligence'].map((item) => (
                <Link key={item} to="/services" style={LINK_STYLE}
                  onMouseOver={(e) => e.target.style.color = '#B59A67'}
                  onMouseOut={(e) => e.target.style.color = '#64748b'}
                >{item}</Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontSize: '10.5px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#ffffff', marginBottom: '18px' }}>
              Contact
            </h3>
            <div style={COL_STYLE}>
              {companyInfo.contact.email && (
                <div>
                  <p style={{ fontSize: '9.5px', color: '#B59A67', letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: '3px' }}>Email</p>
                  <a href={`mailto:${companyInfo.contact.email}`} style={LINK_STYLE}>{companyInfo.contact.email}</a>
                </div>
              )}
              {companyInfo.contact.phone && (
                <div>
                  <p style={{ fontSize: '9.5px', color: '#B59A67', letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: '3px' }}>Phone</p>
                  <span style={LINK_STYLE}>{companyInfo.contact.phone}</span>
                </div>
              )}
              {companyInfo.contact.address && (
                <div>
                  <p style={{ fontSize: '9.5px', color: '#B59A67', letterSpacing: '0.13em', textTransform: 'uppercase', marginBottom: '3px' }}>Office</p>
                  <span style={LINK_STYLE}>{companyInfo.contact.address}</span>
                </div>
              )}
              {!companyInfo.contact.email && !companyInfo.contact.phone && (
                <p style={{ fontSize: '13px', color: '#475569', fontStyle: 'italic' }}>Contact details available shortly.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="site-container" style={{ paddingTop: '18px', paddingBottom: '18px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <p style={{ fontSize: '11.5px', color: '#334155' }}>
            &copy; {year} Opsynera – Strategic Intelligence Advisory. All Rights Reserved.
          </p>
          <Link
            to="/privacy-policy"
            style={{ fontSize: '11.5px', color: '#334155', textDecoration: 'none' }}
            onMouseOver={(e) => e.target.style.color = '#B59A67'}
            onMouseOut={(e) => e.target.style.color = '#334155'}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
