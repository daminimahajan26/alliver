import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, ArrowRight, Download, Calendar, Mail, Phone, Globe, Building2, User } from 'lucide-react';
import { ConsultationFormData } from '../types';
import {
  CONSULTATION_SERVICE_OPTIONS,
  isValidEmail,
  mapConsultationPresets,
} from '../utils/appLogic';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetService?: string;
  presetSummary?: string;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  presetService,
  presetSummary,
}) => {
  const serviceOptions = CONSULTATION_SERVICE_OPTIONS;

  const budgetOptions = [
    '₹3,00,000 – ₹10,00,000 / mo',
    '₹10,00,000 – ₹25,00,000 / mo',
    '₹25,00,000 – ₹50,00,000 / mo',
    '₹50,00,000 – ₹1,00,00,000+ / mo',
  ];

  const timelineOptions = ['Immediately (< 14 days)', 'Within 30 Days', 'Next Quarter', 'Flexible / Exploring'];

  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    workEmail: '',
    brandName: '',
    websiteOrSocial: '',
    phone: '',
    selectedServices: [],
    monthlyBudget: '₹10,00,000 – ₹25,00,000 / mo',
    timeline: 'Within 30 Days',
    targetObjective: '',
    notes: '',
  });

  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [bookingDate, setBookingDate] = useState<string>(getTomorrowDate);
  const [bookingTime, setBookingTime] = useState<string>('14:00 (GST / Dubai)');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [refCode, setRefCode] = useState<string>('');
  const wasSubmittedRef = useRef<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      const { selectedServices, notes } = mapConsultationPresets(
        presetService,
        presetSummary
      );
      const shouldResetContact = wasSubmittedRef.current;
      wasSubmittedRef.current = false;
      setFormData((prev) => ({
        ...(shouldResetContact
          ? {
              fullName: '',
              workEmail: '',
              brandName: '',
              websiteOrSocial: '',
              phone: '',
              monthlyBudget: '₹10,00,000 – ₹25,00,000 / mo',
              timeline: 'Within 30 Days',
              targetObjective: '',
            }
          : prev),
        selectedServices,
        notes,
      }));
      setSubmitted(false);
      setErrorMsg('');
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, presetService, presetSummary]);

  if (!isOpen) return null;

  const handleToggleService = (service: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(service)
        ? prev.selectedServices.filter((s) => s !== service)
        : [...prev.selectedServices, service],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.fullName.trim()) {
      setErrorMsg('Please provide your full name.');
      return;
    }
    if (!formData.workEmail.trim() || !isValidEmail(formData.workEmail)) {
      setErrorMsg('Please provide a valid business email.');
      return;
    }
    if (!formData.brandName.trim()) {
      setErrorMsg('Please specify your brand or organization name.');
      return;
    }
    if (formData.selectedServices.length === 0) {
      setErrorMsg('Please select at least one core service of interest.');
      return;
    }

    // Generate reference code
    const generatedCode = `ALLIVER-${Math.floor(1000 + Math.random() * 9000)}-DXB`;
    setRefCode(generatedCode);
    wasSubmittedRef.current = true;
    setSubmitted(true);
  };

  const handleDownloadBrief = () => {
    const briefContent = `
=========================================
ALLIVER CREATIVE MARKETING & GROWTH
CONFIDENTIAL DISCOVERY BRIEF
=========================================
Reference Code: ${refCode}
Timestamp: ${new Date().toISOString()}

PRIMARY CONTACT:
- Name: ${formData.fullName}
- Email: ${formData.workEmail}
- Brand / Organization: ${formData.brandName}
- Website / Social: ${formData.websiteOrSocial || 'Not provided'}
- Phone / WhatsApp: ${formData.phone || 'Not provided'}

SCOPE & REQUIREMENTS:
- Selected Capabilities: ${formData.selectedServices.join(', ')}
- Allocated Monthly Ad Budget: ${formData.monthlyBudget}
- Preferred Timeline: ${formData.timeline}
- Proposed Discovery Session: ${bookingDate} at ${bookingTime}

PROJECT NOTES & OBJECTIVES:
${formData.notes || 'None specified'}

=========================================
Alliver Creative Marketing Studio
alliver.marketing@gmail.com | +91 88558 31596
=========================================
    `.trim();

    const blob = new Blob([briefContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Alliver-Discovery-Brief-${refCode}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#F5EFE6] rounded-2xl border border-[#A88752]/40 shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col"
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#F5EFE6]/95 backdrop-blur-md border-b border-[#A88752]/30">
          <div className="flex items-center gap-2">
            <span className="font-editorial text-xl font-bold tracking-tight text-[#173F35]">
              ALLIVER
            </span>
            <span className="text-[#A88752]">·</span>
            <span className="text-xs uppercase tracking-widest text-[#1C1614]/70 font-semibold">
              Strategic Discovery Session
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#1C1614] hover:text-[#173F35] hover:bg-black/5 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="font-editorial text-2xl sm:text-3xl text-[#1C1614] mb-1">
                  Schedule A Private Strategy Session
                </h3>
                <p className="text-xs sm:text-sm text-[#1C1614]/75 font-light">
                  Our managing partners review market opportunity, unit economics, and campaign architecture in an executive 30-minute discovery call.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3 text-xs text-red-700 bg-red-100/80 border border-red-300 rounded-lg">
                  {errorMsg}
                </div>
              )}

              {/* Step 1: Select Services */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#173F35] block mb-2.5">
                  1. Capabilities of Interest (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {serviceOptions.map((svc) => {
                    const isChecked = formData.selectedServices.includes(svc);
                    return (
                      <button
                        type="button"
                        key={svc}
                        onClick={() => handleToggleService(svc)}
                        className={`p-3 text-left rounded-lg text-xs font-medium transition-all flex items-center justify-between border ${
                          isChecked
                            ? 'bg-[#1C1614] text-[#F5EFE6] border-[#1C1614]'
                            : 'bg-white text-[#1C1614] border-[#A88752]/30 hover:border-[#173F35]'
                        }`}
                      >
                        <span className="line-clamp-1">{svc}</span>
                        {isChecked && <CheckCircle2 className="w-4 h-4 text-[#C69A9D] shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Brand & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1614] block mb-1.5">
                    Your Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#A88752] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Marcella Fontaine"
                      className="w-full pl-9 pr-3 py-2.5 bg-white rounded-lg border border-[#A88752]/40 text-xs text-[#1C1614] focus:outline-none focus:border-[#173F35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1614] block mb-1.5">
                    Business Email *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#A88752] absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-white rounded-lg border border-[#A88752]/40 text-xs text-[#1C1614] focus:outline-none focus:border-[#173F35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1614] block mb-1.5">
                    Brand / Enterprise Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#A88752] absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={formData.brandName}
                      onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                      placeholder="e.g. Maison de Parfum"
                      className="w-full pl-9 pr-3 py-2.5 bg-white rounded-lg border border-[#A88752]/40 text-xs text-[#1C1614] focus:outline-none focus:border-[#173F35]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1614] block mb-1.5">
                    Phone / WhatsApp (With Country Code)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#A88752] absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+971 50 123 4567"
                      className="w-full pl-9 pr-3 py-2.5 bg-white rounded-lg border border-[#A88752]/40 text-xs text-[#1C1614] focus:outline-none focus:border-[#173F35]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Budget & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1614] block mb-1.5">
                    Monthly Ad & Growth Capital
                  </label>
                  <select
                    value={formData.monthlyBudget}
                    onChange={(e) => setFormData({ ...formData, monthlyBudget: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white rounded-lg border border-[#A88752]/40 text-xs text-[#1C1614] focus:outline-none focus:border-[#173F35]"
                  >
                    {budgetOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#1C1614] block mb-1.5">
                    Target Deployment Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-3 py-2.5 bg-white rounded-lg border border-[#A88752]/40 text-xs text-[#1C1614] focus:outline-none focus:border-[#173F35]"
                  >
                    {timelineOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Step 4: Preferred Date & Time */}
              <div className="p-4 rounded-xl bg-white/60 border border-[#A88752]/30">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#173F35] mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>Select Preferred Discovery Date & Window</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-[#1C1614]/70 block mb-1">Session Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded border border-[#A88752]/40 text-xs text-[#1C1614]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-[#1C1614]/70 block mb-1">Time Slot (GST / GMT+4)</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full px-3 py-2 bg-white rounded border border-[#A88752]/40 text-xs text-[#1C1614]"
                    >
                      <option value="11:00 (GST / Dubai)">11:00 AM Gulf Standard Time</option>
                      <option value="14:00 (GST / Dubai)">02:00 PM Gulf Standard Time</option>
                      <option value="16:30 (GST / Dubai)">04:30 PM Gulf Standard Time</option>
                      <option value="18:00 (GST / Dubai)">06:00 PM Gulf Standard Time</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#1C1614] block mb-1.5">
                  Brief Strategic Objectives / Current Roadblocks
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share details on your revenue targets, target markets, or upcoming product drop..."
                  className="w-full px-3 py-2.5 bg-white rounded-lg border border-[#A88752]/40 text-xs text-[#1C1614] focus:outline-none focus:border-[#173F35]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#F5EFE6] bg-[#173F35] hover:bg-[#0F2C25] rounded-lg transition-colors shadow-md"
                >
                  <span>Confirm Strategic Discovery Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[11px] text-center text-[#1C1614]/60 mt-2 font-light">
                  Strict non-disclosure agreement in effect. No unsolicited sales decks.
                </p>
              </div>
            </form>
          ) : (
            /* Confirmation Success State */
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-[#173F35] text-[#F5EFE6] flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-[#173F35] font-bold block mb-1">
                  Session Confirmed
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-[#1C1614] mb-2">
                  We Look Forward To Speaking, {formData.fullName}.
                </h3>
                <p className="text-xs sm:text-sm text-[#1C1614]/80 max-w-lg mx-auto font-light leading-relaxed">
                  Your strategic discovery briefing has been booked for <strong className="text-[#1C1614]">{bookingDate}</strong> at <strong className="text-[#1C1614]">{bookingTime}</strong>. A calendar invitation and executive dossier will be delivered to <strong className="text-[#173F35]">{formData.workEmail}</strong>.
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="p-6 rounded-xl bg-white border border-[#A88752]/30 text-left max-w-lg mx-auto space-y-3">
                <div className="flex items-center justify-between border-b border-[#A88752]/20 pb-3">
                  <span className="text-xs text-[#1C1614]/60">Booking Reference</span>
                  <span className="font-mono text-xs font-bold text-[#173F35]">{refCode}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#A88752]/20 pb-3">
                  <span className="text-xs text-[#1C1614]/60">Enterprise</span>
                  <span className="text-xs font-semibold text-[#1C1614]">{formData.brandName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#A88752]/20 pb-3">
                  <span className="text-xs text-[#1C1614]/60">Capabilities In Scope</span>
                  <span className="text-xs font-medium text-[#1C1614] text-right truncate max-w-[240px]">
                    {formData.selectedServices.join(', ')}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#1C1614]/60">Lead Strategic Partner</span>
                  <span className="text-xs font-semibold text-[#173F35]">Alliver Senior Partner</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadBrief}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#1C1614] hover:text-[#173F35] border border-[#A88752]/50 hover:border-[#173F35] rounded-lg transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Brief (.TXT)</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#F5EFE6] bg-[#173F35] hover:bg-[#0F2C25] rounded-lg transition-all shadow-sm"
                >
                  <span>Return To Site</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
