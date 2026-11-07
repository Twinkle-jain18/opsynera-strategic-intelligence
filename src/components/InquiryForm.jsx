import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Info, ArrowRight, Lock } from 'lucide-react';
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
  fullName: '',
  company: '',
  email: '',
  phone: '',
  industry: '',
  service: '',
  description: '',
  contactMethod: '',
  privacyAck: false,
};

function validate(data) {
  const e = {};
  if (!data.fullName.trim()) e.fullName = 'Full name is required.';
  if (!data.company.trim()) e.company = 'Organization name is required.';
  if (!data.email.trim()) e.email = 'Email address is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Please enter a valid email address.';
  if (!data.phone.trim()) e.phone = 'Contact number is required.';
  else if (!/^[+\d][\d\s().+-]{6,}$/.test(data.phone.trim())) e.phone = 'Please enter a valid contact number.';
  if (!data.industry) e.industry = 'Please select an industry sector.';
  if (!data.service) e.service = 'Please select an advisory service.';
  if (!data.description.trim()) e.description = 'Please provide a brief description of your inquiry.';
  else if (data.description.trim().length < 20) e.description = 'Please provide at least 20 characters.';
  if (!data.contactMethod) e.contactMethod = 'Please select a preferred contact method.';
  if (!data.privacyAck) e.privacyAck = 'Please acknowledge the confidentiality and privacy notice.';
  return e;
}

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
      const match = serviceOptions.find((s) =>
        s.toLowerCase().replace(/[^a-z]/g, '').includes(param.toLowerCase().replace(/[^a-z]/g, ''))
      );
      if (match) setForm((prev) => ({ ...prev, service: match }));
    }
  }, [searchParams, preselectedService]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(form)[name] }));
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
    if (res.success) {
      setForm(initialForm);
      setTouched({});
    }
  };

  const inputClass = (name) =>
    `w-full px-4 py-3 text-sm text-[#071A3D] bg-white rounded-xl border transition-all duration-200 outline-none focus:ring-2 ${
      touched[name] && errors[name]
        ? 'border-red-400 focus:ring-red-200 bg-red-50/30'
        : 'border-slate-200 focus:border-[#071A3D] focus:ring-[#F4B323]/30'
    }`;

  const Field = ({ label, name, required, children }) => (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-xs font-bold uppercase tracking-wider text-[#071A3D] mb-1.5 flex items-center gap-1">
        <span>{label}</span>
        {required && <span className="text-red-500 font-bold">*</span>}
      </label>
      {children}
      {touched[name] && errors[name] && (
        <p role="alert" className="flex items-center gap-1.5 text-xs text-red-500 mt-1.5">
          <AlertCircle size={13} />
          <span>{errors[name]}</span>
        </p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Full Name" name="fullName" required>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={form.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('fullName')}
            placeholder="John Doe"
            autoComplete="name"
          />
        </Field>
        <Field label="Company / Organization" name="company" required>
          <input
            id="company"
            name="company"
            type="text"
            value={form.company}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('company')}
            placeholder="Acme Corporation Ltd."
            autoComplete="organization"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Official Email" name="email" required>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('email')}
            placeholder="official@company.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Contact Number" name="phone" required>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={inputClass('phone')}
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
          />
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Industry Sector" name="industry" required>
          <select
            id="industry"
            name="industry"
            value={form.industry}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass('industry')} cursor-pointer`}
          >
            <option value="">Select industry sector</option>
            {industryOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field label="Service Required" name="service" required>
          <select
            id="service"
            name="service"
            value={form.service}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`${inputClass('service')} cursor-pointer`}
          >
            <option value="">Select advisory service</option>
            {serviceOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Brief Description of Requirement" name="description" required>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${inputClass('description')} min-h-[120px] resize-y`}
          placeholder="Please describe the context, timeline, and key areas of inquiry..."
        />
      </Field>

      <Field label="Preferred Contact Method" name="contactMethod" required>
        <select
          id="contactMethod"
          name="contactMethod"
          value={form.contactMethod}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${inputClass('contactMethod')} cursor-pointer`}
        >
          <option value="">Select preferred method</option>
          {contactMethods.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </Field>

      {/* Confidentiality and privacy checkbox */}
      <div className="bg-[#F5F7FA] border border-slate-200/90 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <input
            id="privacyAck"
            name="privacyAck"
            type="checkbox"
            checked={form.privacyAck}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-4 h-4 rounded mt-1 accent-[#F4B323] cursor-pointer"
          />
          <label htmlFor="privacyAck" className="text-xs text-slate-600 leading-relaxed cursor-pointer select-none">
            I confirm that this inquiry is made on behalf of an eligible entity and consent to Opsynera handling this information in strict accordance with the{' '}
            <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#071A3D] font-bold underline hover:text-[#F4B323]">
              Privacy & Confidentiality Notice
            </Link>.
          </label>
        </div>
        {touched.privacyAck && errors.privacyAck && (
          <p role="alert" className="flex items-center gap-1 text-xs text-red-500 mt-2 ml-7">
            <AlertCircle size={12} />
            <span>{errors.privacyAck}</span>
          </p>
        )}
      </div>

      {/* Result notification banner */}
      {result && (
        <div
          role="status"
          className={`flex items-start gap-3 p-4 rounded-xl border ${
            result.demo
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : result.success
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          {result.demo ? (
            <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
          ) : result.success ? (
            <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <div className="text-xs leading-relaxed">
            {result.demo && (
              <span className="font-bold uppercase tracking-wider block mb-0.5">Demo Submission</span>
            )}
            {result.message}
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={submitting}
        className="btn-gold w-full py-3.5 text-sm font-bold justify-center shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-60"
      >
        {submitting ? (
          <>
            <svg className="animate-spin h-4 w-4 text-[#071A3D]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Transmitting Inquiry…</span>
          </>
        ) : (
          <>
            <span>Submit Confidential Inquiry</span>
            <ArrowRight size={15} />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center pt-2">
        <Lock size={12} className="text-slate-400" />
        <span>256-bit encrypted inquiry channel. Information held under NDA.</span>
      </div>
    </form>
  );
}
