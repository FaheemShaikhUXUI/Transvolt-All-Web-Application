import React, { useState } from 'react';
import {
  X,
  FileText,
  Calendar,
  Clock,
  MapPin,
  Shield,
  Truck,
  User,
  AlertTriangle,
  Building,
  DollarSign,
  Phone,
  Mail,
  CheckCircle2,
  Download,
  Save,
  Check,
  CreditCard,
  FileCheck,
  Layers,
  ArrowRight,
  Sparkles,
  Copy
} from 'lucide-react';
import { InsuranceCase } from './InsuranceDashboard';
import { downloadClaimPdf } from '../../utils/generateClaimPdf';

interface MotorClaimFormModalProps {
  claim: InsuranceCase | null;
  companyName: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedClaim: Partial<InsuranceCase>) => void;
}

export function MotorClaimFormModal({
  claim,
  companyName,
  isOpen,
  onClose,
  onSave
}: MotorClaimFormModalProps) {
  if (!isOpen || !claim) return null;

  const [activeTab, setActiveTab] = useState<'policy' | 'accident' | 'vehicle' | 'driver' | 'damages'>('policy');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedCaseId, setCopiedCaseId] = useState(false);

  const handleCopyCaseId = () => {
    if (claim?.caseId) {
      navigator.clipboard.writeText(claim.caseId);
      setCopiedCaseId(true);
      setTimeout(() => setCopiedCaseId(false), 1500);
    }
  };

  // Form State initialized with PDF data
  const [formData, setFormData] = useState({
    // Policy & Insured
    claimNo: `CLM-${claim.caseId}`,
    policyNo: claim.policyNumber !== 'NA' ? claim.policyNumber : '0407033126P104898891',
    insurancePeriodStart: '2026-08-11',
    insurancePeriodEnd: '2026-08-29',
    insuredName: 'Transvolt Mobility Pvt Ltd',
    insuredAddress: 'Thane West, Maharashtra',
    mobile: '8657000731',
    email: 'nishant.k@transvolt.in',
    panNo: 'AAACT2026P',
    bankAcc: '918020039281726 (HDFC Bank)',
    branchCode: 'BO-MUM-04',
    pin: '400601',

    // Accident & Police
    accidentDate: claim.recordDate || '2026-10-06',
    accidentTime: '14:05:00',
    place: 'Lodha Park, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013',
    firNo: 'FIR-2026-0891',
    chargesUS: 'Sec 279 / 337 IPC',
    policeStation: 'N.M. Joshi Marg Police Station',
    complainantName: 'Mr. Arvind Shinde',
    vehiclePurpose: 'Official Mining Haulage Logistics',
    accidentBrief: 'Minor collision during turning maneuver at mine dispatch bay with secondary trailer corner contact.',
    firDelayedReason: 'Spot assessment and preliminary technical clearance by safety officer.',
    otherVehicles: 'None (Solo incident / Barrier)',

    // Vehicle & Permit
    vehicleNo: claim.vehicleNumber,
    makeModel: 'Tata Prima / BharatBenz Hauler',
    mfgYear: '2024',
    engineNo: '1234523',
    chassisNo: '2342343',
    cubicCapacity: '25 Tons / 6700cc',
    isCommercial: true,
    regdLadenWeight: '35,000 kg',
    unladenWeight: '12,500 kg',
    permitType: 'National Goods Carriage (All India)',
    natureOfGoods: 'Clean Coal Aggregates',
    hasPublicLiability: true,
    passengersCarried: '1 (Driver)',
    passengersPermitted: '2',
    trailerAttached: true,
    trailerNo: 'TR-MH-8819',

    // Driver on Wheel
    driverName: claim.pilotName || 'Mr. driv12 test',
    driverAge: '34',
    relationship: 'Own Paid Driver',
    dlNumber: 'DL98765-MH04',
    dlAuthorised: 'HMV / Trailer / Goods Multi-Axle',
    issuingAuthority: 'RTO Thane (MH-04)',
    dlExpiry: '2026-11-07',
    dlSuspended: false,
    pastAccidents: 'None in last 5 years (Clean record)',

    // Third Party & Damage Inspection
    injuredCount: '0',
    deathCount: '0',
    workmanInjured: false,
    tppdApproxCost: '0.00',
    tppdNature: 'Minor scrape to site guard rail',
    inspectionAddress: 'Transvolt Central Depot, Lower Parel, Mumbai',
    contactPerson: 'Shruthi C',
    contactPhone: '8387777432',
    contactEmail: 'sruthi.c@transvolt.in',
    idvAmount: '45,00,000',
    estimatedRepairCost: '67,000',
    filingPlace: 'Mumbai',
    declarationAccepted: true,
  });

  const handleChange = (field: string, val: any) => {
    setFormData(prev => ({ ...prev, [field]: val }));
  };

  const handleSave = () => {
    onSave({
      policyNumber: formData.policyNo,
      vehicleNumber: formData.vehicleNo,
      pilotName: formData.driverName,
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 1200);
  };

  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSaveAndDownload = () => {
    setIsDownloading(true);
    try {
      // 1. Save data updates back to parent state
      onSave({
        policyNumber: formData.policyNo,
        vehicleNumber: formData.vehicleNo,
        pilotName: formData.driverName,
      });

      // 2. Direct high-fidelity PDF generation & download (No browser's note / no alert)
      downloadClaimPdf(formData, companyName, claim);

      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadSuccess(false);
        setIsDownloading(false);
      }, 1600);
    } catch (err) {
      console.error('PDF Generation failed:', err);
      setIsDownloading(false);
    }
  };

  const tabs = [
    { id: 'policy', label: '1. Policy & Insured', icon: Shield },
    { id: 'accident', label: '2. Accident & Police (FIR)', icon: AlertTriangle },
    { id: 'vehicle', label: '3. Vehicle & Commercial', icon: Truck },
    { id: 'driver', label: '4. Driver On Wheel', icon: User },
    { id: 'damages', label: '5. Inspection & Survey', icon: FileCheck },
  ] as const;

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden animate-in fade-in duration-200">
      <style>{`
        @keyframes formRowSlideUp {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .stagger-container > * {
          animation: formRowSlideUp 0.38s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .stagger-container > *:nth-child(1) { animation-delay: 0.04s; }
        .stagger-container > *:nth-child(2) { animation-delay: 0.08s; }
        .stagger-container > *:nth-child(3) { animation-delay: 0.12s; }
        .stagger-container > *:nth-child(4) { animation-delay: 0.16s; }
        .stagger-container > *:nth-child(5) { animation-delay: 0.20s; }
        .stagger-container > *:nth-child(6) { animation-delay: 0.24s; }
        .stagger-container > *:nth-child(7) { animation-delay: 0.28s; }
        .stagger-container > *:nth-child(8) { animation-delay: 0.32s; }
        .stagger-container > *:nth-child(9) { animation-delay: 0.36s; }
        .stagger-container > *:nth-child(10) { animation-delay: 0.40s; }
        .stagger-container > *:nth-child(11) { animation-delay: 0.44s; }
        .stagger-container > *:nth-child(12) { animation-delay: 0.48s; }
      `}</style>
      <div className="relative w-full max-w-5xl h-[88vh] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col overflow-hidden">
        
        {/* Top Header with Case ID Special Highlight & Luxury UI */}
        <div className="px-6 py-4 border-b border-slate-200/90 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Document Icon + Title Hierarchy + Underwriter & Vehicle Pill */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 ring-4 ring-blue-500/10 flex-shrink-0">
              <FileText className="w-5.5 h-5.5 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                  Motor Vehicle Claim Form (CIF-Editor)
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200/80 dark:border-emerald-800/70 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  Editable CIF Schema
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2.5 py-0.5 rounded-md border border-blue-200/80 dark:border-blue-800/80">
                  {companyName}
                </span>
                <span className="text-slate-300 dark:text-slate-700 font-semibold">•</span>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                  <Truck className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span className="font-mono">{claim.vehicleNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: SPECIAL CASE ID HIGHLIGHT PLACE + Close Button */}
          <div className="flex items-center gap-3">
            {/* Special Highlight Container for Case ID */}
            <div 
              onClick={handleCopyCaseId}
              title="Click to copy Case ID"
              className="group relative flex items-center gap-3 pl-3.5 pr-2.5 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white shadow-md shadow-slate-900/10 border border-slate-700 hover:border-blue-500/60 transition-all cursor-pointer"
            >
              <div className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              
              <div className="flex flex-col pr-1">
                <span className="text-[9.5px] font-bold uppercase tracking-widest text-slate-400 leading-none">
                  Official Case ID
                </span>
                <span className="text-xs sm:text-sm font-mono font-extrabold text-white tracking-wide mt-0.5">
                  {claim.caseId}
                </span>
              </div>

              <div className="w-6 h-6 rounded-md bg-white/10 group-hover:bg-blue-500/20 text-slate-300 group-hover:text-blue-300 flex items-center justify-center transition-colors">
                {copiedCaseId ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </div>

              {copiedCaseId && (
                <div className="absolute -bottom-7 right-0 text-[10px] font-bold bg-slate-900 text-emerald-400 px-2 py-0.5 rounded shadow-lg border border-slate-700 whitespace-nowrap z-30">
                  Copied!
                </div>
              )}
            </div>

            {/* Elegant Circular Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white flex items-center justify-center transition-all cursor-pointer border border-slate-200/60 dark:border-slate-700 shadow-2xs"
              title="Close Form"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Tab Stepper Bar */}
        <div className="px-6 bg-slate-50/80 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-slate-800 overflow-x-auto scrollbar-none flex gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3.5 text-xs font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 rounded-t-lg shadow-xs'
                    : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Form Body Container with Smooth Slide-Up from Down Effect */}
        <div
          key={activeTab}
          className="flex-1 overflow-y-auto px-6 py-6 bg-white dark:bg-slate-900 space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-300 ease-out"
        >

          {/* TAB 1: Policy & Insured Particulars */}
          {activeTab === 'policy' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
                  <Shield className="w-[22px] h-[22px] text-blue-600 stroke-[2.2]" />
                  Policy Details & Insured Profile
                </h3>
                <span className="text-xs text-slate-400 font-medium">Ref: PDF Page 1 (Header Section)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-container">
                {/* Policy No */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Policy Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.policyNo}
                      onChange={(e) => handleChange('policyNo', e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Claim Number */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Claim Number
                  </label>
                  <input
                    type="text"
                    value={formData.claimNo}
                    onChange={(e) => handleChange('claimNo', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Period of Insurance */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Period of Insurance (Start / End)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={formData.insurancePeriodStart}
                      onChange={(e) => handleChange('insurancePeriodStart', e.target.value)}
                      className="w-full px-2 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="date"
                      value={formData.insurancePeriodEnd}
                      onChange={(e) => handleChange('insurancePeriodEnd', e.target.value)}
                      className="w-full px-2 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Insured Name */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Insured Name & Address
                  </label>
                  <input
                    type="text"
                    value={formData.insuredName + ' — ' + formData.insuredAddress}
                    onChange={(e) => handleChange('insuredAddress', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* PIN Code */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Area PIN Code
                  </label>
                  <input
                    type="text"
                    value={formData.pin}
                    onChange={(e) => handleChange('pin', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Mobile */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Mobile Number
                  </label>
                  <div className="flex items-center rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 mr-2" />
                    <input
                      type="text"
                      value={formData.mobile}
                      onChange={(e) => handleChange('mobile', e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Email Address
                  </label>
                  <div className="flex items-center rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 mr-2" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                {/* PAN Number */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    PAN Number
                  </label>
                  <input
                    type="text"
                    value={formData.panNo}
                    onChange={(e) => handleChange('panNo', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Bank Account */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Bank Account Particulars (NEFT/RTGS Settlement)
                  </label>
                  <div className="flex items-center rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2">
                    <CreditCard className="w-3.5 h-3.5 text-slate-400 mr-2" />
                    <input
                      type="text"
                      value={formData.bankAcc}
                      onChange={(e) => handleChange('bankAcc', e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Branch Code */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Issuing Office Code
                  </label>
                  <input
                    type="text"
                    value={formData.branchCode}
                    onChange={(e) => handleChange('branchCode', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Accident & Police (FIR) Details */}
          {activeTab === 'accident' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
                  <AlertTriangle className="w-[22px] h-[22px] text-amber-500 stroke-[2.2]" />
                  Accident Incident & Police (FIR) Documentation
                </h3>
                <span className="text-xs text-slate-400 font-medium">Ref: PDF Page 1 (Details of Accident / Theft)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-container">
                {/* Date */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Date of Accident
                  </label>
                  <input
                    type="date"
                    value={formData.accidentDate}
                    onChange={(e) => handleChange('accidentDate', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Time of Accident
                  </label>
                  <input
                    type="time"
                    value={formData.accidentTime}
                    onChange={(e) => handleChange('accidentTime', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Vehicle Purpose */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Purpose of Usage at Material Time
                  </label>
                  <input
                    type="text"
                    value={formData.vehiclePurpose}
                    onChange={(e) => handleChange('vehiclePurpose', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Place / Location */}
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Accident Place / Geolocation
                  </label>
                  <div className="flex items-center rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2">
                    <MapPin className="w-4 h-4 text-rose-500 mr-2 flex-shrink-0" />
                    <input
                      type="text"
                      value={formData.place}
                      onChange={(e) => handleChange('place', e.target.value)}
                      className="w-full bg-transparent text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none"
                    />
                  </div>
                </div>

                {/* FIR Number */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    FIR No. & Date
                  </label>
                  <input
                    type="text"
                    value={formData.firNo}
                    onChange={(e) => handleChange('firNo', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Charges */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Charges Under Section (u/s)
                  </label>
                  <input
                    type="text"
                    value={formData.chargesUS}
                    onChange={(e) => handleChange('chargesUS', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Police Station */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Police Station Name
                  </label>
                  <input
                    type="text"
                    value={formData.policeStation}
                    onChange={(e) => handleChange('policeStation', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Complainant Name */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Name of Complainant who Lodged FIR
                  </label>
                  <input
                    type="text"
                    value={formData.complainantName}
                    onChange={(e) => handleChange('complainantName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Other Vehicles Involved */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Other Vehicle(s) Involved
                  </label>
                  <input
                    type="text"
                    value={formData.otherVehicles}
                    onChange={(e) => handleChange('otherVehicles', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Brief Narrative */}
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Brief Particulars of the Accident
                  </label>
                  <textarea
                    rows={2}
                    value={formData.accidentBrief}
                    onChange={(e) => handleChange('accidentBrief', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Delay Reasons */}
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Specify Reasons for Delayed FIR or Not Lodging FIR
                  </label>
                  <input
                    type="text"
                    value={formData.firDelayedReason}
                    onChange={(e) => handleChange('firDelayedReason', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Vehicle & Commercial Specifications */}
          {activeTab === 'vehicle' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
                  <Truck className="w-[22px] h-[22px] text-emerald-600 stroke-[2.2]" />
                  Insured Vehicle & Commercial Permit Specifications
                </h3>
                <span className="text-xs text-slate-400 font-medium">Ref: PDF Page 1 (Vehicle Particulars)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-container">
                {/* Vehicle Number */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Vehicle Number
                  </label>
                  <input
                    type="text"
                    value={formData.vehicleNo}
                    onChange={(e) => handleChange('vehicleNo', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Make & Model */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Make / Model
                  </label>
                  <input
                    type="text"
                    value={formData.makeModel}
                    onChange={(e) => handleChange('makeModel', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Year of Mfg */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Year of Manufacturing
                  </label>
                  <input
                    type="text"
                    value={formData.mfgYear}
                    onChange={(e) => handleChange('mfgYear', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Engine No */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Engine Number
                  </label>
                  <input
                    type="text"
                    value={formData.engineNo}
                    onChange={(e) => handleChange('engineNo', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Chassis No */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Chassis Number
                  </label>
                  <input
                    type="text"
                    value={formData.chassisNo}
                    onChange={(e) => handleChange('chassisNo', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Cubic / Carrying Capacity */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Cubic / Carrying Capacity
                  </label>
                  <input
                    type="text"
                    value={formData.cubicCapacity}
                    onChange={(e) => handleChange('cubicCapacity', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Laden Weight */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Regd. Laden Weight
                  </label>
                  <input
                    type="text"
                    value={formData.regdLadenWeight}
                    onChange={(e) => handleChange('regdLadenWeight', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Unladen Weight */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Unladen Weight
                  </label>
                  <input
                    type="text"
                    value={formData.unladenWeight}
                    onChange={(e) => handleChange('unladenWeight', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Permit Type */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Type of Commercial Permit
                  </label>
                  <input
                    type="text"
                    value={formData.permitType}
                    onChange={(e) => handleChange('permitType', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Trailer Attached Toggle */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-100">
                      Trailer Attached?
                    </span>
                    <span className="text-[11px] text-slate-400">Specify No: {formData.trailerNo}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('trailerAttached', !formData.trailerAttached)}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      formData.trailerAttached ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                        formData.trailerAttached ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Public Liability Toggle */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-100">
                      Public Liability Policy Taken?
                    </span>
                    <span className="text-[11px] text-slate-400">Dangerous / Hazardous Goods</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleChange('hasPublicLiability', !formData.hasPublicLiability)}
                    className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${
                      formData.hasPublicLiability ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-600'
                    }`}
                  >
                    <span
                      className={`block w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                        formData.hasPublicLiability ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Nature of Goods */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Nature of Goods Carried
                  </label>
                  <input
                    type="text"
                    value={formData.natureOfGoods}
                    onChange={(e) => handleChange('natureOfGoods', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Driver Particulars */}
          {activeTab === 'driver' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
                  <User className="w-[22px] h-[22px] text-purple-600 stroke-[2.2]" />
                  Driver On Wheel At The Material Time
                </h3>
                <span className="text-xs text-slate-400 font-medium">Ref: PDF Page 2 (Top Section)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-container">
                {/* Driver Name */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Driver Name
                  </label>
                  <input
                    type="text"
                    value={formData.driverName}
                    onChange={(e) => handleChange('driverName', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Age
                  </label>
                  <input
                    type="text"
                    value={formData.driverAge}
                    onChange={(e) => handleChange('driverAge', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Relationship with Insured */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Relationship with Insured
                  </label>
                  <select
                    value={formData.relationship}
                    onChange={(e) => handleChange('relationship', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  >
                    <option value="Own Paid Driver">Own Paid Driver (X)</option>
                    <option value="Self">Self</option>
                    <option value="Relation / Friend / Other">Relation / Friend / Other</option>
                  </select>
                </div>

                {/* Driving License No */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Driving Licence No.
                  </label>
                  <input
                    type="text"
                    value={formData.dlNumber}
                    onChange={(e) => handleChange('dlNumber', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Issuing Authority */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Issuing Authority
                  </label>
                  <input
                    type="text"
                    value={formData.issuingAuthority}
                    onChange={(e) => handleChange('issuingAuthority', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Date of Expiry
                  </label>
                  <input
                    type="date"
                    value={formData.dlExpiry}
                    onChange={(e) => handleChange('dlExpiry', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Authorised to Drive */}
                <div className="sm:col-span-2">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Vehicle Class Authorised to Drive
                  </label>
                  <input
                    type="text"
                    value={formData.dlAuthorised}
                    onChange={(e) => handleChange('dlAuthorised', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* License Suspended Toggle */}
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <div>
                    <span className="block text-xs font-bold text-slate-800 dark:text-slate-100">
                      Licence Suspended by Court?
                    </span>
                    <span className="text-[11px] text-slate-400">Any past suspension record</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleChange('dlSuspended', false)}
                      className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                        !formData.dlSuspended ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      No
                    </button>
                    <button
                      type="button"
                      onClick={() => handleChange('dlSuspended', true)}
                      className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                        formData.dlSuspended ? 'bg-rose-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      Yes
                    </button>
                  </div>
                </div>

                {/* Past Accidents */}
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Previous Accidents in Last 5 Years (if any)
                  </label>
                  <input
                    type="text"
                    value={formData.pastAccidents}
                    onChange={(e) => handleChange('pastAccidents', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Third Party, Survey & Repair Estimation */}
          {activeTab === 'damages' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
                  <FileCheck className="w-[22px] h-[22px] text-emerald-600 stroke-[2.2]" />
                  Survey Inspection, Repair Estimation & Third Party Injury
                </h3>
                <span className="text-xs text-slate-400 font-medium">Ref: PDF Page 2 (Bottom Section)</span>
              </div>

              {/* Injury / Third Party Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                  Injury / Death / TPPD Summary
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">Persons Injured</label>
                    <input
                      type="number"
                      value={formData.injuredCount}
                      onChange={(e) => handleChange('injuredCount', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">Fatalities / Death</label>
                    <input
                      type="number"
                      value={formData.deathCount}
                      onChange={(e) => handleChange('deathCount', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-slate-500 mb-1">Approx Cost of TPPD Damage</label>
                    <input
                      type="text"
                      value={`₹ ${formData.tppdApproxCost}`}
                      onChange={(e) => handleChange('tppdApproxCost', e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>
              </div>

              {/* Inspection Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-container">
                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Where Damaged Vehicle Can Be Inspected
                  </label>
                  <input
                    type="text"
                    value={formData.inspectionAddress}
                    onChange={(e) => handleChange('inspectionAddress', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Contact Coordinator Name
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => handleChange('contactPerson', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Coordinator Phone
                  </label>
                  <input
                    type="text"
                    value={formData.contactPhone}
                    onChange={(e) => handleChange('contactPhone', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Coordinator Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleChange('contactEmail', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Insured Declared Value (IDV)
                  </label>
                  <input
                    type="text"
                    value={`₹ ${formData.idvAmount}`}
                    onChange={(e) => handleChange('idvAmount', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Approx. Estimated Cost of Repairs
                  </label>
                  <input
                    type="text"
                    value={`₹ ${formData.estimatedRepairCost}`}
                    onChange={(e) => handleChange('estimatedRepairCost', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-extrabold text-emerald-700 dark:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    Claim Filing Place
                  </label>
                  <input
                    type="text"
                    value={formData.filingPlace}
                    onChange={(e) => handleChange('filingPlace', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Warranted Truth Declaration */}
              <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/50 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="declaration"
                  checked={formData.declarationAccepted}
                  onChange={(e) => handleChange('declarationAccepted', e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <label htmlFor="declaration" className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed cursor-pointer">
                  <span className="font-bold text-slate-900 dark:text-white">Legal Warranty of Truth:</span> I / We hereby warrant the truth of the foregoing statements in every respect, and agree that any false or fraudulent suppression shall forfeit claim rights.
                </label>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>All 42 questions validated & synchronized with official CIF schema.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 stroke-[2]" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={isDownloading}
              onClick={handleSaveAndDownload}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-80 text-white text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                  <span>Downloaded!</span>
                </>
              ) : isDownloading ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 stroke-[2]" />
                  <span>Save & Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
