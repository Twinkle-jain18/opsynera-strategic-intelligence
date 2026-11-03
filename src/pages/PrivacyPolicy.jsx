import { motion } from 'framer-motion';
import PageHero from '../components/PageHero';

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
    <main>
      <PageHero
        eyebrow="Legal"
        heading="Privacy Policy"
        subtitle="For Client Review Before Publication"
      />

      <section className="bg-white py-24 lg:py-32">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="max-w-[720px]">

            {/* Draft banner */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="border-l-2 border-amber-400 bg-amber-50 pl-5 pr-5 py-4 mb-14"
            >
              <p className="text-amber-800 font-semibold text-sm mb-1">Draft – Requires Review Before Publication</p>
              <p className="text-amber-700 text-xs leading-relaxed">
                This document is a draft framework for review and approval by Opsynera and its legal advisors. It does not constitute a legally approved or published policy. Content must be verified against applicable data protection laws before this page is publicly accessible.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-12">
              {sections.map((section, i) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-lg font-bold text-[#0B1626] mb-1" style={{ fontFamily: 'Manrope, sans-serif' }}>
                    {section.title}
                  </h2>
                  <div className="w-8 h-px bg-[#B59A67] mb-5" />

                  {section.content && (
                    <p className="text-[#475569] text-sm leading-[1.8] mb-3">{section.content}</p>
                  )}
                  {section.intro && (
                    <p className="text-[#475569] text-sm leading-[1.8] mb-3">{section.intro}</p>
                  )}
                  {section.list && (
                    <ul className="space-y-1.5 mb-4 ml-4">
                      {section.list.map((item) => (
                        <li key={item} className="text-[#475569] text-sm flex items-start gap-2">
                          <span className="text-[#B59A67] mt-1.5 flex-shrink-0">–</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {section.listNote && (
                    <p className="text-[#475569] text-sm leading-[1.8] mb-3">{section.listNote}</p>
                  )}
                  {section.draft && (
                    <p className="text-amber-700 text-xs leading-relaxed bg-amber-50 border border-amber-200 px-4 py-3 mt-3">
                      [DRAFT NOTE: {section.draft}]
                    </p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-14 pt-8 border-t border-[#E8ECF0]">
              <p className="text-[#94a3b8] text-xs">
                Last reviewed: [Date to be confirmed before publication] — This is a draft document and does not constitute Opsynera's published privacy policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
