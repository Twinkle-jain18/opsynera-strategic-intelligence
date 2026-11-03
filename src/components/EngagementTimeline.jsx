import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Initial Inquiry',
    description: "We understand the client's requirements and objectives.",
  },
  {
    number: '02',
    title: 'Scope Definition',
    description: 'We establish the scope, deliverables, timeline, and applicable fees.',
  },
  {
    number: '03',
    title: 'Authorization & Confidentiality',
    description: 'We confirm necessary permissions and confidentiality arrangements.',
  },
  {
    number: '04',
    title: 'Research & Analysis',
    description: 'We conduct the agreed work within the authorized scope.',
  },
  {
    number: '05',
    title: 'Reporting & Advisory',
    description: 'We present structured findings and explain relevant observations.',
  },
];

export default function EngagementTimeline() {
  return (
    <div className="engagement-grid">
      {steps.map((step, i) => (
        <motion.div
          key={step.number}
          className="engagement-card"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-40px' }}
        >
          {/* Numbered node */}
          <div className="engagement-number" style={{ flexShrink: 0 }}>
            {step.number}
          </div>

          {/* Text content */}
          <div>
            <h4 style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '14px',
              fontWeight: 600,
              color: '#0B1626',
              marginBottom: '6px',
              lineHeight: 1.35,
            }}>
              {step.title}
            </h4>
            <p style={{
              fontSize: '13px',
              color: '#64748b',
              lineHeight: 1.65,
            }}>
              {step.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
