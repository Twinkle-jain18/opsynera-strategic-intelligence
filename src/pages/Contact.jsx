import { motion } from 'framer-motion';
import { ShieldCheck, Info, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import InquiryForm from '../components/InquiryForm';
import { companyInfo } from '../data/companyInfo';

export default function Contact() {
  const { contact } = companyInfo;
  const hasContact = contact.email || contact.phone || contact.address;

  return (
    <main className="bg-white">
      <PageHero
        eyebrow="Get In Touch"
        heading="Contact Opsynera"
        subtitle="Confidential Strategic Intelligence & Advisory Inquiries"
        description="We welcome inquiries from corporate leaders, general counsel, investment committees, and institutions requiring objective risk intelligence."
      />

      <section className="site-container py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Engagement Information & Privacy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-7 h-[3px] bg-[#F4B323] rounded-full inline-block" />
                <span className="text-[11px] font-extrabold tracking-[0.2em] text-[#071A3D] uppercase">
                  Engagement Protocol
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A3D] leading-tight mb-4">
                Initiate a Confidential Inquiry
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Share an overview of your organization's requirements. Our advisory desk will review the submission to determine alignment, authorized parameters, and research feasibility.
              </p>

              {/* Security & Confidentiality assurance cards */}
              <div className="space-y-3.5 mb-8">
                <div className="flex items-start gap-3 p-3.5 bg-[#F5F7FA] rounded-xl border border-slate-200/80">
                  <Lock size={16} className="text-[#F4B323] flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700 leading-snug">
                    <strong className="text-[#071A3D] block mb-0.5">Strict Confidentiality</strong>
                    All communications are treated with rigorous professional discretion and non-disclosure standards.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 bg-[#F5F7FA] rounded-xl border border-slate-200/80">
                  <ShieldCheck size={16} className="text-[#F4B323] flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-700 leading-snug">
                    <strong className="text-[#071A3D] block mb-0.5">Lawful Research Mandates</strong>
                    All advisory scopes are conducted strictly within authorized legal boundaries and ethical frameworks.
                  </div>
                </div>
              </div>

              {hasContact ? (
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  {contact.email && (
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F4B323] block mb-1">
                        Direct Email
                      </span>
                      <a href={`mailto:${contact.email}`} className="text-sm font-bold text-[#071A3D] hover:underline">
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact.phone && (
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F4B323] block mb-1">
                        Advisory Desk
                      </span>
                      <span className="text-sm font-bold text-[#071A3D]">{contact.phone}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-start gap-2.5 p-4 bg-slate-50 border border-slate-200 rounded-xl mb-6">
                  <Info size={15} className="text-[#071A3D] flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Direct advisory contact details will be furnished upon confirmation of engagement scope. Please use the inquiry form.
                  </p>
                </div>
              )}
            </div>

            {/* Privacy notice footer */}
            <div className="pt-6 border-t border-slate-200 mt-6 text-xs text-slate-500 leading-relaxed">
              <p className="mb-2">
                <strong>Information Notice:</strong> Please share only information necessary to describe your inquiry. Do not submit credentials, financial passwords, or unauthorized third-party records.
              </p>
              <p>
                Handled in accordance with our{' '}
                <Link to="/privacy-policy" className="text-[#071A3D] font-bold hover:text-[#F4B323] underline">
                  Privacy & Confidentiality Notice
                </Link>.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Corporate Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-md"
          >
            <div className="mb-6">
              <span className="w-6 h-[3px] bg-[#F4B323] rounded-full inline-block mb-2" />
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#071A3D] mb-1">
                Advisory Inquiry Form
              </h3>
              <p className="text-xs text-slate-500">
                Please provide sufficient context for our research desk to evaluate your request.
              </p>
            </div>

            <InquiryForm />
          </motion.div>

        </div>
      </section>
    </main>
  );
}
