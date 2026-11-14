import { Link } from 'react-router-dom';
import OpsyneraLogo from './OpsyneraLogo';
import { companyInfo } from '../data/companyInfo';
import { ShieldCheck, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#071A3D] text-white border-t border-slate-800" role="contentinfo">
      
      {/* Main Footer Container */}
      <div className="site-container pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Identity (Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-block mb-4" aria-label="Opsynera Home">
                <OpsyneraLogo dark={true} size={36} />
              </Link>
              <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed max-w-sm mb-6">
                Opsynera helps organisations assess risks, evaluate information, and make informed strategic decisions through structured intelligence advisory and research.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-2 h-2 rounded-full bg-[#C49A6C]" />
              <span>Advisory & Intelligence Practice</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#C49A6C] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <Link to="/" className="hover:text-[#C49A6C] transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C49A6C] transition-colors">About Opsynera</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#C49A6C] transition-colors">Key Services</Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-[#C49A6C] transition-colors">Industries Served</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C49A6C] transition-colors">Contact & Inquiries</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialized Services (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#C49A6C] mb-4">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300 font-medium">
              <li>
                <Link to="/services#strategic-risk-advisory" className="hover:text-[#C49A6C] transition-colors">Strategic Risk Advisory</Link>
              </li>
              <li>
                <Link to="/services#due-diligence" className="hover:text-[#C49A6C] transition-colors">Due Diligence & Background</Link>
              </li>
              <li>
                <Link to="/services#osint-research" className="hover:text-[#C49A6C] transition-colors">OSINT & Intelligence Research</Link>
              </li>
              <li>
                <Link to="/services#cyber-digital-risk" className="hover:text-[#C49A6C] transition-colors">Cyber & Digital Risk Advisory</Link>
              </li>
              <li>
                <Link to="/services#field-verification" className="hover:text-[#C49A6C] transition-colors">Field Verification & Ground</Link>
              </li>
              <li>
                <Link to="/services#corporate-intelligence" className="hover:text-[#C49A6C] transition-colors">Corporate Intelligence Advisory</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Confidentiality & Inquiries (Span 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-[#C49A6C] mb-4">
              Engagement & Discretion
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              All client engagements are governed by strict confidentiality protocols and authorized compliance parameters.
            </p>
            <Link
              to="/contact"
              className="btn-gold text-xs px-4 py-2 w-full justify-center flex items-center gap-1.5 font-bold"
            >
              Initiate Inquiry <ArrowRight size={13} />
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-slate-800/80 bg-[#05132D]">
        <div className="site-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            &copy; {year} Opsynera – Strategic Intelligence Advisory. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6 text-xs">
            <Link to="/privacy-policy" className="hover:text-[#C49A6C] transition-colors">
              Privacy & Confidentiality Notice
            </Link>
            <Link to="/contact" className="hover:text-[#C49A6C] transition-colors">
              Contact Desk
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}
