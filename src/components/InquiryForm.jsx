import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';
import { submitInquiry } from '../services/inquirySubmission';

const industryOptions = [
  'Corporate & Business Organizations',
  'Banking & Financial Services',
  'Information Technology & Digital Businesses',
  'Infrastructure & Real Estate',
  'Small & Medium-Sized Enterprises (SMEs)',
  'Other',
];

const serviceOptions = [
  'Strategic Risk Advisory',
  'Due Diligence & Background Intelligence',
  'OSINT & Intelligence Research',
  'Cyber & Digital Risk Advisory',
  'Field Verification & Ground Intelligence',
  'Corporate Intelligence & Investigative Advisory',
  'General Inquiry',
];

const contactMethods = ['Email', 'Phone Call'];

const initialForm = {
  fullName: '', company: '', email: '', phone: '',
  industry: '', service: '', description: '', contactMethod: '', privacyAck: false,
};

function validate(data) {
  const e = {};
  if (!data.fullName.trim()) e.fullName = 'Full name is required.';
  if (!data.company.trim()) e.company = 'Organization name is required.';
  if (!data.email.trim()) e.email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Please enter a valid email.';
  if (!data.phone.trim()) e.phone = 'Contact number is required.';
  else if (!/^[+\d][\d\s().+-]{6,}$/.test(data.phone.trim())) e.phone = 'Please enter a valid contact number.';
  if (!data.industry) e.industry = 'Please select an industry.';
  if (!data.service) e.service = 'Please select a service.';
  if (!data.description.trim()) e.description = 'Please provide a brief description.';
  else if (data.description.trim().length < 20) e.description = 'Please provide at least 20 characters.';
  if (!data.contactMethod) e.contactMethod = 'Please select a preferred contact method.';
  if (!data.privacyAck) e.privacyAck = 'Please acknowledge the privacy notice.';
  return e;
}

const LABEL = {
  fontFamily: 'Inter, sans-serif',
  display: 'block',
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: '#0B1626',
  marginBottom: '8px',
};

const INPUT_BASE = {
  width: '100%',
  padding: '12px 16px',
  fontSize: '14px',
  color: '#0B1626',
  background: '#ffffff',
  border: '1.5px solid #E2E8F0',
  outline: 'none',
  fontFamily: 'Inter, sans-serif',
  transition: 'border-color 0.2s',
  lineHeight: 1.5,
};

const INPUT_ERR = { ...INPUT_BASE, borderColor: '#ef4444', background: '#fef2f2' };

export default function InquiryForm({ preselectedService }) {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const param = searchParams.get('service') || preselectedService;
    if (param) {
      const match = serviceOptions.find(s =>
        s.toLowerCase().replace(/[^a-z]/g, '').includes(param.toLowerCase().replace(/[^a-z]/g, ''))
      );
      if (match) setForm(prev => ({ ...prev, service: match }));
    }
  }, [searchParams, preselectedService]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (touched[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validate(form)[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(initialForm).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitting(true);
    setResult(null);
    const res = await submitInquiry(form);
    setSubmitting(false);
    setResult(res);
    if (res.success) { setForm(initialForm); setTouched({}); }
  };

  const inputStyle = (name) => touched[name] && errors[name] ? INPUT_ERR : INPUT_BASE;

  const Field = ({ label, name, required, children }) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label htmlFor={name} style={LABEL}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: '2px' }}>*</span>}
      </label>
      {children}
      {touched[name] && errors[name] && (
        <p role="alert" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#ef4444', marginTop: '5px' }}>
          <AlertCircle size={11} />{errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        <div style={{ display: 'grid', gap: '20px' }} className="sm:grid-cols-2">
          <Field label="Full Name" name="fullName" required>
            <input id="fullName" name="fullName" type="text" value={form.fullName} onChange={handleChange} onBlur={handleBlur} style={inputStyle('fullName')} placeholder="Your full name" autoComplete="name"
              onFocus={(e) => e.target.style.borderColor = '#B59A67'}
              onBlurCapture={(e) => { if (!errors['fullName']) e.target.style.borderColor = '#E2E8F0'; }}
            />
          </Field>
          <Field label="Company / Organization" name="company" required>
            <input id="company" name="company" type="text" value={form.company} onChange={handleChange} onBlur={handleBlur} style={inputStyle('company')} placeholder="Organization name" autoComplete="organization"
              onFocus={(e) => e.target.style.borderColor = '#B59A67'}
            />
          </Field>
        </div>

        <div style={{ display: 'grid', gap: '20px' }} className="sm:grid-cols-2">
          <Field label="Official Email" name="email" required>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} onBlur={handleBlur} style={inputStyle('email')} placeholder="official@company.com" autoComplete="email"
              onFocus={(e) => e.target.style.borderColor = '#B59A67'}
            />
          </Field>
          <Field label="Contact Number" name="phone" required>
            <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} onBlur={handleBlur} style={inputStyle('phone')} placeholder="+91 98765 43210" autoComplete="tel"
              onFocus={(e) => e.target.style.borderColor = '#B59A67'}
            />
          </Field>
        </div>

        <div style={{ display: 'grid', gap: '20px' }} className="sm:grid-cols-2">
          <Field label="Industry" name="industry" required>
            <select id="industry" name="industry" value={form.industry} onChange={handleChange} onBlur={handleBlur} style={{ ...inputStyle('industry'), cursor: 'pointer' }}>
              <option value="">Select your industry</option>
              {industryOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
          <Field label="Service Required" name="service" required>
            <select id="service" name="service" value={form.service} onChange={handleChange} onBlur={handleBlur} style={{ ...inputStyle('service'), cursor: 'pointer' }}>
              <option value="">Select a service</option>
              {serviceOptions.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Brief Description of Requirement" name="description" required>
          <textarea id="description" name="description" value={form.description} onChange={handleChange} onBlur={handleBlur}
            style={{ ...inputStyle('description'), resize: 'vertical', minHeight: '120px' }}
            placeholder="Please describe your inquiry or requirement..."
            onFocus={(e) => e.target.style.borderColor = '#B59A67'}
          />
        </Field>

        <Field label="Preferred Contact Method" name="contactMethod" required>
          <select id="contactMethod" name="contactMethod" value={form.contactMethod} onChange={handleChange} onBlur={handleBlur} style={{ ...inputStyle('contactMethod'), cursor: 'pointer' }}>
            <option value="">Select preferred method</option>
            {contactMethods.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </Field>

        {/* Privacy consent */}
        <div style={{ background: '#F8F9FB', border: '1px solid #E2E8F0', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <input id="privacyAck" name="privacyAck" type="checkbox" checked={form.privacyAck} onChange={handleChange} onBlur={handleBlur}
              style={{ width: '16px', height: '16px', marginTop: '2px', flexShrink: 0, accentColor: '#B59A67', cursor: 'pointer' }}
            />
            <label htmlFor="privacyAck" style={{ fontSize: '13px', color: '#475569', lineHeight: 1.7, cursor: 'pointer' }}>
              I have read and understood Opsynera's{' '}
              <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#B59A67', textDecoration: 'underline' }}>
                Privacy Policy
              </Link>{' '}
              and consent to the handling of my submitted information for the purpose of responding to this inquiry.
            </label>
          </div>
          {touched.privacyAck && errors.privacyAck && (
            <p role="alert" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#ef4444', marginTop: '8px', marginLeft: '28px' }}>
              <AlertCircle size={11} />{errors.privacyAck}
            </p>
          )}
        </div>

        {/* Result banner */}
        {result && (
          <div role="status" style={{
            display: 'flex', gap: '12px', padding: '16px 18px',
            background: result.demo ? '#fffbeb' : result.success ? '#f0fdf4' : '#fef2f2',
            borderLeft: `3px solid ${result.demo ? '#f59e0b' : result.success ? '#22c55e' : '#ef4444'}`,
          }}>
            {result.demo
              ? <Info size={16} color="#d97706" style={{ flexShrink: 0, marginTop: '1px' }} />
              : result.success
              ? <CheckCircle size={16} color="#22c55e" style={{ flexShrink: 0, marginTop: '1px' }} />
              : <AlertCircle size={16} color="#ef4444" style={{ flexShrink: 0, marginTop: '1px' }} />
            }
            <div>
              {result.demo && <p style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#92400e', marginBottom: '4px' }}>Demo Mode</p>}
              <p style={{ fontSize: '13px', lineHeight: 1.65, color: result.demo ? '#78350f' : result.success ? '#15803d' : '#b91c1c' }}>
                {result.message}
              </p>
            </div>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            padding: '16px 32px',
            background: submitting ? '#334155' : '#0B1626',
            color: '#ffffff',
            fontFamily: 'Manrope, sans-serif',
            fontSize: '15px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            border: 'none',
            cursor: submitting ? 'not-allowed' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => { if (!submitting) e.currentTarget.style.background = '#172333'; }}
          onMouseOut={(e) => { if (!submitting) e.currentTarget.style.background = '#0B1626'; }}
        >
          {submitting ? (
            <>
              <svg style={{ animation: 'spin 1s linear infinite', width: '16px', height: '16px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
              </svg>
              Processing…
            </>
          ) : 'Submit Inquiry'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
          By submitting, you agree to our{' '}
          <Link to="/privacy-policy" style={{ color: '#B59A67', textDecoration: 'underline' }}>Privacy Policy</Link>.
          Fields marked <span style={{ color: '#ef4444' }}>*</span> are required.
        </p>
      </div>
    </form>
  );
}
