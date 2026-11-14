import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Mail, Settings, LogOut, Eye,
  Shield, Globe, AlertTriangle, Lock,
  ChevronRight, BarChart2, X, ExternalLink,
  Plus, Edit2, Trash2, Phone, MessageCircle, Save,
  Building2, Layers, Briefcase, Landmark, Monitor,
} from 'lucide-react';
import { useSiteData } from '../context/SiteDataContext';
import { useToast } from '../context/ToastContext';
import { services as defaultServices } from '../data/services';
import { industries as defaultIndustries } from '../data/industries';

// ── Demo Contact Inquiries with phone numbers ────────────────────
const INITIAL_CONTACTS = [
  { id: 1, name: 'Rajiv Sharma',   company: 'Infosys Ltd',           service: 'Due Diligence',           phone: '+91 98201 34567', email: 'rajiv@infosys.com',         date: '2025-11-14', status: 'New',      contactPref: 'Email' },
  { id: 2, name: 'Priya Mehta',    company: 'SBI Capital Markets',    service: 'Strategic Risk Advisory',  phone: '+91 97302 56789', email: 'priya@sbicap.com',          date: '2025-11-13', status: 'Reviewed', contactPref: 'Phone' },
  { id: 3, name: 'Ahmed Al-Farsi', company: 'Gulf Infrastructure',    service: 'Field Verification',       phone: '+971 50 123 4567',email: 'ahmed@gulfinfra.ae',        date: '2025-11-12', status: 'New',      contactPref: 'WhatsApp' },
  { id: 4, name: 'Chen Wei',       company: 'Horizons Capital',       service: 'OSINT Research',           phone: '+65 9123 4567',   email: 'cwei@horizons.sg',          date: '2025-11-11', status: 'Closed',   contactPref: 'Email' },
  { id: 5, name: "Sarah O'Brien",  company: 'Meridian Consulting',    service: 'Corporate Intelligence',   phone: '+44 7911 234567', email: 'sarah@meridianconsult.co.uk',date: '2025-11-10', status: 'Reviewed', contactPref: 'Phone' },
];

const STATUS_STYLES = {
  New:      'bg-blue-100 text-blue-700',
  Reviewed: 'bg-amber-100 text-amber-700',
  Closed:   'bg-green-100 text-green-700',
};

const ICON_OPTIONS = ['Building2', 'Landmark', 'Monitor', 'Layers', 'Briefcase', 'Globe', 'Shield'];
const ICON_MAP = { Building2, Landmark, Monitor, Layers, Briefcase, Globe, Shield };

const NAV_ITEMS = [
  { key: 'services',   label: 'Services',   Icon: FileText },
  { key: 'industries', label: 'Industries', Icon: Building2 },
  { key: 'contacts',   label: 'Contacts',   Icon: Mail },
  { key: 'settings',   label: 'Settings',   Icon: Settings },
];

// ── Reusable Modal Shell ─────────────────────────────────────────
function Modal({ title, onClose, children, wide = false }) {
  return (
    <div
      className="fixed inset-0 z-[10001] flex items-center justify-center p-4"
      style={{ background: 'rgba(7,26,61,0.65)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        className={`bg-white rounded-2xl shadow-2xl w-full ${wide ? 'max-w-2xl' : 'max-w-md'} overflow-hidden max-h-[90vh] flex flex-col`}
      >
        <div className="bg-[#071A3D] px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h3 className="text-white font-bold text-sm">{title}</h3>
          <button onClick={onClose} className="text-white/60 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X size={16} />
          </button>
        </div>
        <div className="overflow-y-auto">{children}</div>
      </motion.div>
    </div>
  );
}

// ── Delete Confirm Modal ─────────────────────────────────────────
function DeleteConfirm({ name, onConfirm, onClose }) {
  return (
    <Modal title="Confirm Delete" onClose={onClose}>
      <div className="p-6 space-y-5">
        <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
          <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700">
            Delete <span className="font-bold">"{name}"</span>? This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-colors">Delete</button>
        </div>
      </div>
    </Modal>
  );
}

// ═══════════════════════════════════════════════════════════════
//  SERVICES CRUD
// ═══════════════════════════════════════════════════════════════
function ServicesManager() {
  const { services, setServices, resetServices } = useSiteData();
  const { addToast } = useToast();
  const [editing, setEditing]     = useState(null);
  const [deleting, setDeleting]   = useState(null);
  const [isNew, setIsNew]         = useState(false);

  const blankService = {
    id: '', number: String(services.length + 1).padStart(2, '0'),
    title: '', shortDesc: '', offerings: [''], note: null,
  };

  const openEdit = (item) => { setEditing({ ...item, offerings: [...item.offerings] }); setIsNew(false); };
  const openNew  = () => { setEditing({ ...blankService }); setIsNew(true); };

  const handleSave = () => {
    if (!editing.title.trim()) return;
    if (isNew) {
      setServices((prev) => [...prev, { ...editing, id: editing.title.toLowerCase().replace(/\s+/g, '-'), number: String(prev.length + 1).padStart(2, '0') }]);
      addToast(`Service "${editing.title}" added successfully.`, 'success');
    } else {
      setServices((prev) => prev.map((s) => s.id === editing.id ? { ...editing } : s));
      addToast(`Service "${editing.title}" updated successfully.`, 'success');
    }
    setEditing(null);
  };

  const handleDelete = (id, title) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    addToast(`Service "${title}" has been deleted.`, 'warning');
    setDeleting(null);
  };

  const updateOffering = (idx, val) => {
    const arr = [...editing.offerings];
    arr[idx] = val;
    setEditing({ ...editing, offerings: arr });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 font-medium">{services.length} services</p>
        <button onClick={openNew} className="flex items-center gap-1.5 bg-[#071A3D] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#0B2450] transition-colors">
          <Plus size={13} /> Add Service
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {services.map((svc) => (
            <div key={svc.id} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors group">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <span className="text-xs font-black text-[#C49A6C] bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-lg flex-shrink-0 mt-0.5">{svc.number}</span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-[#071A3D] truncate">{svc.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{svc.shortDesc}</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">{svc.offerings.length} offering{svc.offerings.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(svc)} className="p-1.5 rounded-lg text-slate-400 hover:text-[#071A3D] hover:bg-slate-100 transition-colors"><Edit2 size={13} /></button>
                <button onClick={() => setDeleting(svc)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit / Add Modal */}
      <AnimatePresence>
        {editing && (
          <Modal title={isNew ? 'Add New Service' : 'Edit Service'} onClose={() => setEditing(null)} wide>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#071A3D] uppercase tracking-wide mb-1">Title *</label>
                  <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Service title" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-[#071A3D] focus:outline-none focus:ring-2 focus:ring-[#071A3D]/20 focus:border-[#071A3D]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#071A3D] uppercase tracking-wide mb-1">Number</label>
                  <input value={editing.number} onChange={(e) => setEditing({ ...editing, number: e.target.value })} placeholder="01" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-[#071A3D] focus:outline-none focus:ring-2 focus:ring-[#071A3D]/20 focus:border-[#071A3D]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#071A3D] uppercase tracking-wide mb-1">Short Description</label>
                <textarea value={editing.shortDesc} onChange={(e) => setEditing({ ...editing, shortDesc: e.target.value })} rows={3} placeholder="Brief description…" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-[#071A3D] focus:outline-none focus:ring-2 focus:ring-[#071A3D]/20 focus:border-[#071A3D] resize-none" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-[#071A3D] uppercase tracking-wide">Offerings</label>
                  <button onClick={() => setEditing({ ...editing, offerings: [...editing.offerings, ''] })} className="text-[10px] font-bold text-[#C49A6C] hover:underline flex items-center gap-0.5"><Plus size={10} /> Add</button>
                </div>
                <div className="space-y-2">
                  {editing.offerings.map((o, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input value={o} onChange={(e) => updateOffering(idx, e.target.value)} placeholder={`Offering ${idx + 1}`} className="flex-1 px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm text-[#071A3D] focus:outline-none focus:ring-2 focus:ring-[#071A3D]/20 focus:border-[#071A3D]" />
                      <button onClick={() => setEditing({ ...editing, offerings: editing.offerings.filter((_, i) => i !== idx) })} className="p-1.5 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"><Trash2 size={12} /></button>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#071A3D] uppercase tracking-wide mb-1">Note (optional)</label>
                <input value={editing.note || ''} onChange={(e) => setEditing({ ...editing, note: e.target.value || null })} placeholder="Disclaimer or note…" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-[#071A3D] focus:outline-none focus:ring-2 focus:ring-[#071A3D]/20 focus:border-[#071A3D]" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditing(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={!editing.title.trim()} className="flex-1 py-2.5 rounded-xl bg-[#071A3D] text-white text-sm font-bold hover:bg-[#0B2450] disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                  <Save size={13} /> {isNew ? 'Add Service' : 'Save Changes'}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleting && <DeleteConfirm name={deleting.title} onConfirm={() => handleDelete(deleting.id, deleting.title)} onClose={() => setDeleting(null)} />}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  INDUSTRIES CRUD
// ═══════════════════════════════════════════════════════════════
function IndustriesManager() {
  const { industries, setIndustries, resetIndustries } = useSiteData();
  const { addToast } = useToast();
  const [editing, setEditing]   = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [isNew, setIsNew]       = useState(false);

  const blankIndustry = { id: '', number: String(industries.length + 1).padStart(2, '0'), title: '', description: '', icon: 'Building2' };

  const openEdit = (item) => { setEditing({ ...item }); setIsNew(false); };
  const openNew  = () => { setEditing({ ...blankIndustry }); setIsNew(true); };

  const handleSave = () => {
    if (!editing.title.trim()) return;
    if (isNew) {
      setIndustries((prev) => [...prev, { ...editing, id: editing.title.toLowerCase().replace(/\s+/g, '-'), number: String(prev.length + 1).padStart(2, '0') }]);
      addToast(`Industry "${editing.title}" added successfully.`, 'success');
    } else {
      setIndustries((prev) => prev.map((i) => i.id === editing.id ? { ...editing } : i));
      addToast(`Industry "${editing.title}" updated successfully.`, 'success');
    }
    setEditing(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 font-medium">{industries.length} industries</p>
        <button onClick={openNew} className="flex items-center gap-1.5 bg-[#071A3D] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#0B2450] transition-colors">
          <Plus size={13} /> Add Industry
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {industries.map((ind) => {
            const IconComp = ICON_MAP[ind.icon] || Building2;
            return (
              <div key={ind.id} className="px-6 py-4 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#071A3D]/8 border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <IconComp size={16} className="text-[#071A3D]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black text-[#C49A6C]">{ind.number}</span>
                      <p className="text-sm font-bold text-[#071A3D] truncate">{ind.title}</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{ind.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(ind)} className="p-1.5 rounded-lg text-slate-400 hover:text-[#071A3D] hover:bg-slate-100 transition-colors"><Edit2 size={13} /></button>
                  <button onClick={() => setDeleting(ind)} className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {editing && (
          <Modal title={isNew ? 'Add Industry' : 'Edit Industry'} onClose={() => setEditing(null)} wide>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#071A3D] uppercase tracking-wide mb-1">Title *</label>
                  <input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Industry title" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-[#071A3D] focus:outline-none focus:ring-2 focus:ring-[#071A3D]/20 focus:border-[#071A3D]" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#071A3D] uppercase tracking-wide mb-1">Icon</label>
                  <select value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-[#071A3D] focus:outline-none focus:ring-2 focus:ring-[#071A3D]/20 focus:border-[#071A3D]">
                    {ICON_OPTIONS.map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#071A3D] uppercase tracking-wide mb-1">Description</label>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={4} placeholder="Industry description…" className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-[#071A3D] focus:outline-none focus:ring-2 focus:ring-[#071A3D]/20 focus:border-[#071A3D] resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setEditing(null)} className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancel</button>
                <button onClick={handleSave} disabled={!editing.title.trim()} className="flex-1 py-2.5 rounded-xl bg-[#071A3D] text-white text-sm font-bold hover:bg-[#0B2450] disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                  <Save size={13} /> {isNew ? 'Add Industry' : 'Save Changes'}
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleting && <DeleteConfirm name={deleting.title} onConfirm={() => {
          addToast(`Industry "${deleting.title}" has been deleted.`, 'warning');
          setIndustries((p) => p.filter((i) => i.id !== deleting.id));
          setDeleting(null);
        }} onClose={() => setDeleting(null)} />}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  CONTACTS MANAGER (WhatsApp + Call)
// ═══════════════════════════════════════════════════════════════
function ContactsManager() {
  const { addToast } = useToast();
  const [contacts, setContacts]   = useState(INITIAL_CONTACTS);
  const [viewing, setViewing]     = useState(null);
  const [deleting, setDeleting]   = useState(null);

  const updateStatus = (id, status, name) => {
    setContacts((prev) => prev.map((c) => c.id === id ? { ...c, status } : c));
    addToast(`${name}'s inquiry marked as "${status}".`, 'info');
  };

  const waLink  = (phone, name) =>
    `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${name}, this is Opsynera Strategic Intelligence Advisory. We received your inquiry and would like to follow up. How can we assist you?`)}`;

  const callLink = (phone) => `tel:${phone.replace(/\s/g, '')}`;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-xs text-slate-500 font-medium">{contacts.length} contacts · {contacts.filter((c) => c.status === 'New').length} new</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              {['Contact', 'Service', 'Phone', 'Pref.', 'Date', 'Status', 'Actions'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-[10px] font-black tracking-widest text-slate-500 uppercase whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {contacts.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#071A3D] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-[10px] font-black">{c.name[0]}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#071A3D] whitespace-nowrap">{c.name}</p>
                      <p className="text-[10px] text-slate-400 truncate max-w-[120px]">{c.company}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-xs text-slate-600 max-w-[130px]">
                  <span className="line-clamp-2">{c.service}</span>
                </td>
                <td className="px-4 py-3.5 text-xs font-mono text-slate-600 whitespace-nowrap">{c.phone}</td>
                <td className="px-4 py-3.5">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap ${
                    c.contactPref === 'WhatsApp' ? 'bg-green-100 text-green-700' :
                    c.contactPref === 'Phone'    ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>{c.contactPref}</span>
                </td>
                <td className="px-4 py-3.5 text-[10px] text-slate-400 font-mono whitespace-nowrap">{c.date}</td>
                <td className="px-4 py-3.5">
                  <select
                    value={c.status}
                    onChange={(e) => updateStatus(c.id, e.target.value)}
                    className={`text-[10px] font-bold px-2 py-1 rounded-full border-0 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#071A3D]/20 ${STATUS_STYLES[c.status]}`}
                  >
                    <option value="New">New</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Closed">Closed</option>
                  </select>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-1">
                    {/* WhatsApp */}
                    <a
                      href={waLink(c.phone, c.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Message on WhatsApp"
                      className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                    >
                      <MessageCircle size={13} />
                    </a>
                    {/* Call */}
                    <a
                      href={callLink(c.phone)}
                      title="Call"
                      className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                    >
                      <Phone size={13} />
                    </a>
                    {/* View */}
                    <button
                      onClick={() => setViewing(c)}
                      title="View details"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#071A3D] hover:bg-slate-100 transition-colors"
                    >
                      <Eye size={13} />
                    </button>
                    {/* Delete */}
                    <button
                      onClick={() => setDeleting(c)}
                      title="Delete"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {viewing && (
          <Modal title="Contact Detail" onClose={() => setViewing(null)}>
            <div className="p-6 space-y-3">
              {[
                ['Name',     viewing.name],
                ['Company',  viewing.company],
                ['Email',    viewing.email],
                ['Phone',    viewing.phone],
                ['Service',  viewing.service],
                ['Pref.',    viewing.contactPref],
                ['Date',     viewing.date],
                ['Status',   viewing.status],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{label}</span>
                  <span className="text-xs font-semibold text-[#071A3D] text-right">{value}</span>
                </div>
              ))}
              <div className="flex gap-2 pt-3">
                <a href={waLink(viewing.phone, viewing.name)} target="_blank" rel="noopener" className="flex-1 py-2.5 rounded-xl bg-green-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-green-700 transition-colors">
                  <MessageCircle size={13} /> WhatsApp
                </a>
                <a href={callLink(viewing.phone)} className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-blue-700 transition-colors">
                  <Phone size={13} /> Call
                </a>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleting && (
          <DeleteConfirm
            name={deleting.name}
            onConfirm={() => { setContacts((p) => p.filter((c) => c.id !== deleting.id)); setDeleting(null); }}
            onClose={() => setDeleting(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN ADMIN PANEL
// ═══════════════════════════════════════════════════════════════
export default function AdminPanel({ onLogout }) {
  const [activeTab, setActiveTab]     = useState('services');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="fixed inset-0 z-[9998] flex bg-[#F5F7FA] overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 220 : 68 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="flex-shrink-0 bg-[#071A3D] flex flex-col overflow-hidden h-full"
      >
        {/* Logo */}
        <div className="px-3.5 py-5 flex items-center gap-3 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-[#C49A6C]/20 border border-[#C49A6C]/30 flex items-center justify-center flex-shrink-0">
            <Shield size={18} className="text-[#C49A6C]" />
          </div>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
              <p className="text-[9px] font-black tracking-[0.2em] text-[#C49A6C] uppercase leading-none">Opsynera</p>
              <p className="text-white font-bold text-xs tracking-wide mt-0.5">Admin Panel</p>
            </motion.div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2">
          {NAV_ITEMS.map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150 ${
                activeTab === key ? 'bg-white/12 text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}
            >
              <Icon size={17} className="flex-shrink-0" />
              {sidebarOpen && <span className="text-sm font-semibold truncate">{label}</span>}
              {sidebarOpen && activeTab === key && <ChevronRight size={13} className="ml-auto opacity-50" />}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-2 py-4 border-t border-white/10 space-y-1">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all">
            <BarChart2 size={17} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-xs font-medium">Collapse</span>}
          </button>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all">
            <LogOut size={17} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-semibold">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-[#071A3D] font-extrabold text-base tracking-tight capitalize">
              {NAV_ITEMS.find((n) => n.key === activeTab)?.label || 'Admin'}
            </h1>
            <p className="text-xs text-slate-400 font-medium">Opsynera Strategic Intelligence • Admin Access</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener" className="flex items-center gap-1.5 text-xs font-semibold text-[#071A3D] border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors">
              <ExternalLink size={12} /> View Site
            </a>
            <div className="w-8 h-8 rounded-full bg-[#071A3D] flex items-center justify-center">
              <span className="text-white text-xs font-black">A</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === 'services'   && <ServicesManager />}
              {activeTab === 'industries' && <IndustriesManager />}
              {activeTab === 'contacts'   && <ContactsManager />}

              {activeTab === 'settings' && (
                <div className="space-y-5 max-w-2xl">
                  {[
                    { title: 'Site Configuration', Icon: Globe, items: [
                      ['Site Name', 'Opsynera – Strategic Intelligence Advisory'],
                      ['Mode', 'Demo (no backend connected)'],
                      ['Version', '1.0.0'],
                    ]},
                    { title: 'Security', Icon: Lock, items: [
                      ['Admin Username',     'admin'],
                      ['Password Policy',    'Upper + Lower + Number + Special'],
                      ['Session Type',       'In-memory (clears on page reload)'],
                      ['Max Login Attempts', '3 (30s lockout)'],
                      ['Recovery Email',     'opsynerastatintadvisory@gmail.com'],
                    ]},
                  ].map(({ title, Icon, items }) => (
                    <div key={title} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
                        <Icon size={15} className="text-[#C49A6C]" />
                        <h2 className="text-sm font-extrabold text-[#071A3D]">{title}</h2>
                      </div>
                      <div className="divide-y divide-slate-100">
                        {items.map(([label, value]) => (
                          <div key={label} className="px-6 py-3.5 flex items-center justify-between gap-4">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex-shrink-0">{label}</span>
                            <span className="text-xs font-semibold text-[#071A3D] text-right">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-5">
                    <p className="text-xs font-bold text-red-800 mb-1 flex items-center gap-1.5"><AlertTriangle size={13} /> Danger Zone</p>
                    <p className="text-xs text-red-600 mb-3">Signing out ends your admin session immediately.</p>
                    <button onClick={onLogout} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
                      <LogOut size={13} /> Sign Out Now
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
