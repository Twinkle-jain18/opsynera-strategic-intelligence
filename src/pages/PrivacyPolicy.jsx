import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';
import { ShieldCheck, AlertCircle } from 'lucide-react';

const sections = [
  {
    title: '1. Overview',
    content: 'Opsynera – Strategic Intelligence Advisory ("Opsynera," "we," "us," or "our") is committed to protecting the privacy of individuals who interact with our website and services. This Privacy Policy explains how we collect, use, store, and protect information submitted through this website.',
    draft: "Jurisdiction, applicable legislation, and specific obligations to be confirmed by Opsynera's legal advisors before publication.",
  },
  {
    title: '2. Information We Collect',
    intro: 'Through the inquiry form on this website, we may collect:',
    list: [
      'Full name',
      'Company or organization name',
      'Official email address',
      'Contact telephone number',
      'Industry sector',
      'Service of interest',
      'Description of inquiry',
      'Preferred contact method',
    ],
    listNote: 'We do not knowingly collect sensitive personal data through this form. Visitors should not submit passwords, financial credentials, or confidential third-party information.',
  },
  {
    title: '3. How We Use Information',
    intro: 'Information submitted through this website is used solely for:',
    list: [
      'Responding to your inquiry',
      "Assessing whether your request aligns with Opsynera's services",
      'Communicating with you regarding your inquiry',
    ],
    draft: 'Legal basis for processing, retention periods, and data sharing arrangements to be confirmed before publication.',
  },
  {
    title: '4. Data Protection',
    content: 'We aim to implement appropriate technical and organizational measures to protect submitted information from unauthorized access, disclosure, or misuse. Specific security measures are to be confirmed before publication.',
  },
  {
    title: '5. Third Parties',
    content: "We do not sell, rent, or share personal information with third parties for marketing purposes. Disclosure to third parties may occur only where required by applicable law or with the data subject's consent.",
  },
  {
    title: '6. Your Rights',
    content: 'Depending on applicable law, you may have rights regarding your personal data, including rights to access, correction, or erasure. Specific rights available to you depend on your jurisdiction and applicable legislation.',
    draft: 'Specific data subject rights and contact mechanism to be confirmed before publication.',
  },
  {
    title: '7. Cookies',
    draft: 'Cookie usage, tracking technologies, and consent mechanisms to be determined before publication.',
  },
  {
    title: '8. Contact for Privacy Matters',
    draft: 'Privacy contact email or mechanism to be provided by Opsynera before publication.',
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="bg-white">
      <PageHero
        eyebrow="Compliance & Legal"
        heading="Privacy & Confidentiality Notice"
        subtitle="Operational Framework for Client Data Handling"
        description="Opsynera maintains strict standards of confidentiality, lawful data processing, and client data protection across all intelligence advisory engagements."
      />

      <section className="site-container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          
          {/* Draft banner */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="border-l-4 border-[#F4B323] bg-amber-50/70 p-5 rounded-r-2xl mb-12 flex items-start gap-3.5 shadow-xs"
          >
            <AlertCircle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-900 font-bold text-sm mb-1">
                Draft Notice – For Client Review Before Final Publication
              </p>
              <p className="text-amber-800 text-xs leading-relaxed">
                This document is a draft compliance framework for review by Opsynera and legal counsel. Content will be finalized in accordance with governing data protection regulations.
              </p>
            </div>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-xs"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-5 h-[2px] bg-[#F4B323] rounded-full inline-block" />
                  <h2 className="text-lg font-bold text-[#071A3D]">
                    {section.title}
                  </h2>
                </div>

                {section.content && (
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {section.content}
                  </p>
                )}

                {section.intro && (
                  <p className="text-slate-700 text-sm font-medium mb-3">
                    {section.intro}
                  </p>
                )}

                {section.list && (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4 bg-[#F5F7FA] p-4 rounded-xl border border-slate-200/60">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F4B323]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.listNote && (
                  <p className="text-xs text-slate-500 italic mb-3">
                    {section.listNote}
                  </p>
                )}

                {section.draft && (
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] font-semibold text-amber-700">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>{section.draft}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}
