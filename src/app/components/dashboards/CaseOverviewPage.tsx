import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  User,
  Phone,
  Mail,
  MapPin,
  Download,
  Pin,
  Eye,
  X,
  FileText,
  Clock,
  Compass,
  Building,
  ShieldAlert,
  Hash,
  Truck,
  Bus,
  CheckCircle2,
  Wrench,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { InsuranceCase } from './InsuranceDashboard';

interface CaseOverviewPageProps {
  caseData: InsuranceCase;
  onBack: () => void;
}

export function CaseOverviewPage({ caseData, onBack }: CaseOverviewPageProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'maintenance'>('basic');
  const [isPinned, setIsPinned] = useState(false);
  const [previewImage, setPreviewImage] = useState<{ title: string; url: string } | null>(null);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  // Dynamic sample photos for inspection categories
  const photoCategories = [
    {
      name: 'Damage',
      images: [
        { title: 'Side Window Glass Crack', url: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=400&q=80' },
        { title: 'Door Frame Impact Scrape', url: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=400&q=80' },
      ]
    },
    {
      name: 'Odometer',
      images: [
        { title: 'Cluster Odometer Reading', url: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&q=80' },
      ]
    },
    {
      name: 'Front',
      images: [
        { title: 'Front Windshield & Bumper', url: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=400&q=80' },
        { title: 'Front Right Headlamp Area', url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80' },
      ]
    },
    {
      name: 'Rear',
      images: [
        { title: 'Rear Panel & Tail Lights', url: 'https://images.unsplash.com/photo-1557223562-6c77ef16210f?auto=format&fit=crop&w=400&q=80' },
      ]
    },
    {
      name: 'Left',
      images: [
        { title: 'Left Flank & Passenger Doors', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80' },
      ]
    },
    {
      name: 'Right',
      images: [
        { title: 'Right Driver Side Profile', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80' },
      ]
    }
  ];

  const handleDownloadAll = () => {
    setDownloadToast('Preparing all case documents and photos zip bundle...');
    setTimeout(() => {
      setDownloadToast('Download started for ' + caseData.caseId + '_bundle.zip');
      setTimeout(() => setDownloadToast(null), 2500);
    }, 1200);
  };

  const InfoIconBadge = ({ children }: { children: React.ReactNode }) => (
    <div className="w-6.5 h-6.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-center text-slate-400 dark:text-slate-400 shrink-0">
      {children}
    </div>
  );

  return (
    <div className="min-h-full pb-16 space-y-5 animate-in fade-in duration-200">
      {/* Toast Notification */}
      {downloadToast && (
        <div className="fixed top-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5 border border-slate-700">
          <Download className="w-4 h-4 text-emerald-400 animate-bounce" />
          <span>{downloadToast}</span>
        </div>
      )}

      {/* Top Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        {/* Left: Back Arrow + Page Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700 transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
            title="Back to Insurance List"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <span className="text-sm sm:text-base font-bold font-mono px-3 py-1.5 rounded-lg bg-slate-100/90 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200/90 dark:border-slate-700 shadow-2xs">
            <span className="text-slate-500 dark:text-slate-400 font-semibold mr-1.5">Case ID:</span>
            <span className="text-slate-900 dark:text-white font-extrabold">{caseData.caseId}</span>
          </span>
        </div>

        {/* Right: Actions & Badges */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Open Case pill */}
          <span className="px-3 py-1 rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 shadow-2xs">
            Open Case
          </span>

          {/* Incident badge */}
          <span className="px-3.5 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 border border-orange-200/80 dark:border-orange-800/60 text-xs font-semibold shadow-2xs">
            Incident
          </span>

          {/* Pin Button */}
          <button
            type="button"
            onClick={() => setIsPinned(!isPinned)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              isPinned
                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-600'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title={isPinned ? 'Unpin case' : 'Pin case'}
          >
            <Pin className={`w-3.5 h-3.5 ${isPinned ? 'fill-current' : ''}`} />
          </button>

          {/* View on Map */}
          <button
            type="button"
            onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=Mira-Bhaindar+RTO+Depot`, '_blank')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-2xs cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>View on Map</span>
          </button>

          {/* Download All */}
          <button
            type="button"
            onClick={handleDownloadAll}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-2xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Download All</span>
          </button>
        </div>
      </div>

      {/* Top Summary Cards Banner - Rich Sky Blue Theme */}
      <div className="bg-[#d9ecfd] dark:bg-sky-950/65 border border-sky-200 dark:border-sky-800/80 rounded-xl p-3 sm:p-4 shadow-xs">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-0 lg:divide-x lg:divide-sky-200/90 dark:lg:divide-sky-800/60">
          {/* 1. Case Occur Date & Time */}
          <div className="flex items-center gap-3 lg:px-4">
            <div className="w-9 h-9 rounded-lg bg-white/95 dark:bg-slate-800/90 border border-sky-200 dark:border-sky-700/70 flex items-center justify-center text-sky-700 dark:text-sky-300 shrink-0 shadow-2xs">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[11px] text-sky-900/70 dark:text-sky-300/80 font-medium leading-none mb-1">
                Case Occur Date & Time
              </p>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {caseData.recordDate ? caseData.recordDate.split('-').reverse().join('/') : '21/12/2025'} | 12:36 PM
              </p>
            </div>
          </div>

          {/* 2. Record Date & Time */}
          <div className="flex items-center gap-3 lg:px-4">
            <div className="w-9 h-9 rounded-lg bg-white/95 dark:bg-slate-800/90 border border-sky-200 dark:border-sky-700/70 flex items-center justify-center text-sky-700 dark:text-sky-300 shrink-0 shadow-2xs">
              <Calendar className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[11px] text-sky-900/70 dark:text-sky-300/80 font-medium leading-none mb-1">
                Record Date & Time
              </p>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {caseData.recordDate ? caseData.recordDate.split('-').reverse().join('/') : '21/12/2025'} | 12:36 PM
              </p>
            </div>
          </div>

          {/* 3. Contact Person */}
          <div className="flex items-center gap-3 lg:px-4">
            <div className="w-9 h-9 rounded-lg bg-white/95 dark:bg-slate-800/90 border border-sky-200 dark:border-sky-700/70 flex items-center justify-center text-sky-700 dark:text-sky-300 shrink-0 shadow-2xs">
              <User className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[11px] text-sky-900/70 dark:text-sky-300/80 font-medium leading-none mb-1">
                Contact Person
              </p>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[130px]">
                {caseData.pilotName || 'Rakesh Kumar'}
              </p>
            </div>
          </div>

          {/* 4. Contact Number */}
          <div className="flex items-center gap-3 lg:px-4">
            <div className="w-9 h-9 rounded-lg bg-white/95 dark:bg-slate-800/90 border border-sky-200 dark:border-sky-700/70 flex items-center justify-center text-sky-700 dark:text-sky-300 shrink-0 shadow-2xs">
              <Phone className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[11px] text-sky-900/70 dark:text-sky-300/80 font-medium leading-none mb-1">
                Contact Number
              </p>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight font-mono">
                +91 98200 44521
              </p>
            </div>
          </div>

          {/* 5. Email */}
          <div className="flex items-center gap-3 lg:px-4 col-span-2 md:col-span-1">
            <div className="w-9 h-9 rounded-lg bg-white/95 dark:bg-slate-800/90 border border-sky-200 dark:border-sky-700/70 flex items-center justify-center text-sky-700 dark:text-sky-300 shrink-0 shadow-2xs">
              <Mail className="w-4.5 h-4.5" />
            </div>
            <div>
              <p className="text-[11px] text-sky-900/70 dark:text-sky-300/80 font-medium leading-none mb-1">
                Email
              </p>
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[145px]" title="Rakesh.k@transvolt.in">
                {caseData.pilotName.toLowerCase().replace(/[^a-z]/g, '') || 'rakesh'}.k@transvolt.in
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="border-b border-slate-200 dark:border-slate-800 flex items-center gap-6">
        <button
          type="button"
          onClick={() => setActiveTab('basic')}
          className={`pb-2.5 text-xs font-bold transition-all cursor-pointer relative ${
            activeTab === 'basic'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Basic Information
          {activeTab === 'basic' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('maintenance')}
          className={`pb-2.5 text-xs font-bold transition-all cursor-pointer relative ${
            activeTab === 'maintenance'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          Maintenance
          {activeTab === 'maintenance' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
          )}
        </button>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'basic' ? (
        <>
          {/* 3 Information Cards Grid - Uniform TailAdmin 2-Column Tile System */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {/* Card 1: Basic Information */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
              {/* TailAdmin Card Header */}
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/40 dark:bg-slate-800/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Basic Information
                  </h3>
                </div>
                <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/50">
                  Trip Details
                </span>
              </div>

              {/* Uniform 2-Column Tile Grid */}
              <div className="p-4 grid grid-cols-2 gap-2.5 flex-1 content-start">
                {/* Full Width Top Tile: Route */}
                <div className="col-span-2 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all">
                  <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Compass className="w-3 h-3 text-blue-500" />
                      Assigned Route
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded">
                      Active
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 tracking-tight uppercase truncate" title="UMC HOSPITAL TO SHIV MANDIR">
                    UMC HOSPITAL TO SHIV MANDIR
                  </p>
                </div>

                {/* Tile: Schedule Code */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Hash className="w-3 h-3 text-slate-400" />
                    Schedule Code
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono">
                    10121
                  </span>
                </div>

                {/* Tile: Shift */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Shift
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {caseData.schedule || 'Morning'}
                    </span>
                  </div>
                </div>

                {/* Tile: Case Type */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <ShieldAlert className="w-3 h-3 text-amber-500" />
                    Case Type
                  </span>
                  <span className="inline-flex items-center w-fit px-1.5 py-0.5 rounded text-[10.5px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                    Incident
                  </span>
                </div>

                {/* Tile: Company Name */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Building className="w-3 h-3 text-slate-400" />
                    Company Name
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate" title="Transvolt Mobility">
                    Transvolt Mobility
                  </span>
                </div>

                {/* Tile: Third Party Involvement */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <User className="w-3 h-3 text-slate-400" />
                    3rd Party Involve
                  </span>
                  <span className="inline-flex items-center w-fit px-1.5 py-0.5 rounded text-[10.5px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    No
                  </span>
                </div>

                {/* Tile: FIR Registered */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-slate-400" />
                    FIR Registered
                  </span>
                  <span className="inline-flex items-center w-fit px-1.5 py-0.5 rounded text-[10.5px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    No
                  </span>
                </div>

                {/* Full Width Bottom Tile: Location */}
                <div className="col-span-2 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all">
                  <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      Company & Incident Location
                    </span>
                    <span className="text-[9.5px] font-mono text-slate-400">
                      RTO Zone
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    Mira-Bhaindar RTO Depot
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Pilot Information */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
              {/* TailAdmin Card Header */}
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/40 dark:bg-slate-800/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Pilot Information
                  </h3>
                </div>
                <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/50">
                  Driver Profile
                </span>
              </div>

              {/* Uniform 2-Column Tile Grid */}
              <div className="p-4 grid grid-cols-2 gap-2.5 flex-1 content-start">
                {/* Full Width Top Tile: Pilot Name */}
                <div className="col-span-2 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all">
                  <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3 h-3 text-emerald-500" />
                      Pilot Full Name
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded">
                      On-Duty
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 tracking-tight truncate">
                    {caseData.pilotName || 'Mr. driv12 test'}
                  </p>
                </div>

                {/* Tile: Pilot Code */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Hash className="w-3 h-3 text-slate-400" />
                    Pilot Code / ID
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono">
                    {caseData.pilotId || 'PLT-0130'}
                  </span>
                </div>

                {/* Tile: DOB */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    Date of Birth
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono">
                    12/04/1990
                  </span>
                </div>

                {/* Tile: Phone Contact */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    Pilot Contact
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono truncate">
                    +91 98200 44521
                  </span>
                </div>

                {/* Tile: Experience & Badge */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Experience
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                    4.5 Yrs Active
                  </span>
                </div>

                {/* Tile: DL Validity */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
                    <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      DL Validity
                    </span>
                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1 rounded">
                      Valid
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono">
                    24/09/2032
                  </span>
                </div>

                {/* Tile: DL Number with Quick Actions */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <FileText className="w-3 h-3 text-slate-400" />
                    DL Number
                  </span>
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono">
                      MH04201889
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setPreviewImage({ title: 'Driver License Copy', url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80' })}
                        className="p-1 rounded text-cyan-600 hover:text-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-950/40 cursor-pointer"
                        title="View Driver License"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setDownloadToast('Downloading DL MH04201889.pdf');
                          setTimeout(() => setDownloadToast(null), 2000);
                        }}
                        className="p-1 rounded text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 cursor-pointer"
                        title="Download Driver License"
                      >
                        <Download className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Full Width Bottom Tile: Endorsements */}
                <div className="col-span-2 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all">
                  <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      License Class & Endorsement
                    </span>
                    <span className="text-[9.5px] font-mono text-slate-400">
                      HMV-PV
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    Commercial Heavy Passenger & Multi-Axle
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: Vehicle Information */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
              {/* TailAdmin Card Header */}
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/40 dark:bg-slate-800/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 border border-purple-200/70 dark:border-purple-800/60 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <Truck className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Vehicle Information
                  </h3>
                </div>
                <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-200/60 dark:border-purple-800/50">
                  Fleet Asset
                </span>
              </div>

              {/* Uniform 2-Column Tile Grid */}
              <div className="p-4 grid grid-cols-2 gap-2.5 flex-1 content-start">
                {/* Full Width Top Tile: Vehicle Registration */}
                <div className="col-span-2 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all">
                  <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Truck className="w-3 h-3 text-purple-500" />
                      Vehicle Registration Number
                    </span>
                    <span className="text-[9.5px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-1.5 py-0.2 rounded font-mono">
                      EV Fleet
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white font-mono tracking-wider bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 shadow-2xs">
                      {caseData.vehicleNumber || 'mh1233'}
                    </span>
                  </div>
                </div>

                {/* Tile: Vehicle Type */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    {caseData.type === 'Bus' ? (
                      <Bus className="w-3 h-3 text-cyan-500" />
                    ) : (
                      <Truck className="w-3 h-3 text-blue-500" />
                    )}
                    Vehicle Type
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10.5px] font-bold ${
                      caseData.type === 'Trailer'
                        ? 'bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60'
                        : caseData.type === 'Truck'
                          ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60'
                          : 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 border border-cyan-200/60'
                    }`}>
                      {caseData.type || 'Trailer'}
                    </span>
                  </div>
                </div>

                {/* Tile: Vehicle Variant */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Hash className="w-3 h-3 text-slate-400" />
                    Vehicle Variant
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate" title={caseData.type === 'Trailer' ? 'Electric Heavy Hauler' : caseData.type === 'Truck' ? '14T Electric Tipper' : '9m - Non AC'}>
                    {caseData.type === 'Trailer' ? 'Electric Heavy Hauler' : caseData.type === 'Truck' ? '14T Electric Tipper' : '9m - Non AC'}
                  </span>
                </div>

                {/* Tile: Engine Number */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Hash className="w-3 h-3 text-slate-400" />
                    Engine / Motor No.
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono">
                    TVM9948210
                  </span>
                </div>

                {/* Tile: Chassis Number */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Hash className="w-3 h-3 text-slate-400" />
                    Chassis Number
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono">
                    CHS8829103
                  </span>
                </div>

                {/* Tile: Depot Location */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Building className="w-3 h-3 text-slate-400" />
                    Base Depot
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate" title="Mira-Bhaindar RTO Depot">
                    Mira-Bhaindar Depot
                  </span>
                </div>

                {/* Tile: Registration Date */}
                <div className="p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all flex flex-col justify-between min-h-[58px]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    Date of Reg.
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-100 font-mono">
                    15/02/2024
                  </span>
                </div>

                {/* Full Width Bottom Tile: Powertrain & Battery */}
                <div className="col-span-2 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-slate-100/60 dark:hover:bg-slate-800/70 transition-all">
                  <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3 h-3 text-amber-500" />
                      Powertrain & Battery Pack
                    </span>
                    <span className="text-[9.5px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1 rounded font-bold">
                      Health 98%
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                    250 kWh LFP Pack • Dual PMSM Electric Drive
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Case Photo */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Case Photo
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {photoCategories.map(cat => (
                <div key={cat.name} className="space-y-1.5">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {cat.name}
                  </p>
                  <div className="flex items-center gap-1.5">
                    {cat.images.map((img, i) => (
                      <div
                        key={i}
                        className="relative group w-14 h-11 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 shrink-0 cursor-pointer shadow-2xs"
                        onClick={() => setPreviewImage(img)}
                      >
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 flex items-center justify-center transition-colors">
                          <span className="text-[9.5px] font-bold text-white tracking-wide">
                            View
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Accident Description */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Accident Description
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
              As per the statement of Pilot Bhaskar Pawar (ID No. 0435), while passengers were alighting at Lalchakki bus stop, he lost his balance and collided with the glass of the second passenger window near the left-side door of the bus. His shoulder struck the glass, resulting in the breakage of the window.
            </p>
          </div>
        </>
      ) : (
        /* Maintenance Tab Content */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-2xs space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600">
                <Wrench className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Maintenance & Repair Status
                </h3>
                <p className="text-xs text-slate-400">
                  Depot job-card & workshop execution tracker
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200">
              Completed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
              <span className="text-[10.5px] uppercase font-bold text-slate-400 block mb-1">
                Workshop Job Card No.
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-white font-mono">
                JC-2026-0924
              </span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
              <span className="text-[10.5px] uppercase font-bold text-slate-400 block mb-1">
                Assigned Lead Technician
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                Suresh Gaikwad (Grade A)
              </span>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
              <span className="text-[10.5px] uppercase font-bold text-slate-400 block mb-1">
                Estimated Labor Hours
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-white">
                4.5 hrs (Completed on time)
              </span>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 pt-4">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-100 mb-2">
              Parts Replaced / Serviced:
            </h4>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-5">
              <li>Tempered side passenger safety glass (1200mm x 850mm OEM standard)</li>
              <li>Rubber bead sealant & outer channel alignment</li>
              <li>Window lock safety bracket assembly</li>
            </ul>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative max-w-2xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-slate-800">
              <h4 className="text-sm font-bold text-white">
                {previewImage.title}
              </h4>
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 flex items-center justify-center bg-black/40 max-h-[70vh] overflow-hidden">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="max-h-[60vh] w-auto object-contain rounded-lg shadow-lg"
              />
            </div>
            <div className="p-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setPreviewImage(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
