import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  ChevronDown,
  ChevronUp,
  Pencil,
  Download,
  Menu,
  Moon,
  Sun,
  SunMedium,
  Sunset,
  LayoutDashboard,
  Sliders,
  Users,
  Briefcase,
  Shield,
  ChevronRight,
  Boxes,
  Bell,
  Check,
  X,
  FileText,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileX,
  Copy,
  Repeat,
  Bus,
  Truck,
  Archive,
  Minus
} from 'lucide-react';
import TransvoltLogo from '../../../imports/Transvolt_logo_Black.svg';
import LogoIcon from '../../../imports/Logo_Icon.svg';
import { MotorClaimFormModal } from './MotorClaimFormModal';

export interface InsuranceCase {
  srNo: number;
  caseId: string;
  vehicleNumber: string;
  type: 'Trailer' | 'Bus';
  policyNumber: string;
  pilotName: string;
  pilotId: string;
  schedule: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  recordDate: string;
  status: string;
  statusType: 'danger' | 'success';
  reassess?: boolean;
  newIndiaAssurance: { hasFile: boolean };
  unitedIndiaInsurance: { hasFile: boolean };
}

const initialInsuranceData: InsuranceCase[] = [
  {
    srNo: 1,
    caseId: 'INC-CM-0130',
    vehicleNumber: 'mh1233',
    type: 'Trailer',
    policyNumber: '0407033126P104898891',
    pilotName: 'Mr. driv12 test',
    pilotId: 'PLT-0130',
    schedule: 'Morning',
    recordDate: '2026-10-06',
    status: 'Vehicle repair completed',
    statusType: 'success',
    reassess: true,
    newIndiaAssurance: { hasFile: true },
    unitedIndiaInsurance: { hasFile: true },
  },
  {
    srNo: 2,
    caseId: 'INC-CM-0123',
    vehicleNumber: 'ML11A0396AJHJJJ',
    type: 'Bus',
    policyNumber: 'NA',
    pilotName: 'Mr. driv12 test',
    pilotId: 'PLT-0123',
    schedule: 'Afternoon',
    recordDate: '2026-09-24',
    status: 'Vehicle repair completed',
    statusType: 'success',
    reassess: true,
    newIndiaAssurance: { hasFile: false },
    unitedIndiaInsurance: { hasFile: false },
  },
  {
    srNo: 3,
    caseId: 'INC-CM-0122',
    vehicleNumber: 'MH23444fsdfsf',
    type: 'Bus',
    policyNumber: '0407033126P104898891',
    pilotName: 'Mr. Dhar User',
    pilotId: 'PLT-0122',
    schedule: 'Evening',
    recordDate: '2026-09-24',
    status: 'Time Over || Pending by Maintenance Team',
    statusType: 'danger',
    newIndiaAssurance: { hasFile: false },
    unitedIndiaInsurance: { hasFile: false },
  },
  {
    srNo: 4,
    caseId: 'INC-CM-0120',
    vehicleNumber: 'mh1233',
    type: 'Trailer',
    policyNumber: '0407033126P104898891',
    pilotName: 'Mr. driv test',
    pilotId: 'PLT-0120',
    schedule: 'Night',
    recordDate: '2026-09-24',
    status: 'Time Over || Claim intimated',
    statusType: 'danger',
    newIndiaAssurance: { hasFile: true },
    unitedIndiaInsurance: { hasFile: true },
  },
  {
    srNo: 5,
    caseId: 'INC-CM-0118',
    vehicleNumber: 'mh1233',
    type: 'Trailer',
    policyNumber: '0407033126P104898891',
    pilotName: 'Mr. driv test',
    pilotId: 'PLT-0118',
    schedule: 'Morning',
    recordDate: '2026-09-24',
    status: 'Vehicle repair completed',
    statusType: 'success',
    reassess: true,
    newIndiaAssurance: { hasFile: true },
    unitedIndiaInsurance: { hasFile: true },
  },
  {
    srNo: 6,
    caseId: 'INC-CM-0116',
    vehicleNumber: 'ML11A0396AJHJJJ',
    type: 'Bus',
    policyNumber: 'NA',
    pilotName: 'Mr. driv test',
    pilotId: 'PLT-0116',
    schedule: 'Afternoon',
    recordDate: '2026-09-22',
    status: 'Time Over || Pending by Maintenance Team',
    statusType: 'danger',
    newIndiaAssurance: { hasFile: false },
    unitedIndiaInsurance: { hasFile: false },
  },
  {
    srNo: 7,
    caseId: 'INC-CM-0115',
    vehicleNumber: 'MH23444fsdfsf',
    type: 'Bus',
    policyNumber: '0407033126P104898891',
    pilotName: 'Mr. driv test',
    pilotId: 'PLT-0115',
    schedule: 'Evening',
    recordDate: '2026-09-22',
    status: 'Time Over || Pending by Maintenance Team',
    statusType: 'danger',
    newIndiaAssurance: { hasFile: false },
    unitedIndiaInsurance: { hasFile: false },
  },
  {
    srNo: 8,
    caseId: 'INC-CM-0114',
    vehicleNumber: 'MH23444',
    type: 'Trailer',
    policyNumber: '0407033126P104898891',
    pilotName: 'Mr. driv test',
    pilotId: 'PLT-0114',
    schedule: 'Night',
    recordDate: '2026-09-17',
    status: 'Time Over || Claim intimated',
    statusType: 'danger',
    newIndiaAssurance: { hasFile: true },
    unitedIndiaInsurance: { hasFile: true },
  },
  {
    srNo: 9,
    caseId: 'INC-CM-0113',
    vehicleNumber: 'MH123333',
    type: 'Bus',
    policyNumber: 'POL1002',
    pilotName: 'Mr. driv12 test',
    pilotId: 'PLT-0113',
    schedule: 'Morning',
    recordDate: '2026-09-15',
    status: 'Time Over || Pending by Maintenance Team',
    statusType: 'danger',
    newIndiaAssurance: { hasFile: true },
    unitedIndiaInsurance: { hasFile: true },
  },
  {
    srNo: 10,
    caseId: 'INC-CM-0112',
    vehicleNumber: 'ML11A04069',
    type: 'Bus',
    policyNumber: 'POL1020',
    pilotName: 'Mr. driv test',
    pilotId: 'PLT-0112',
    schedule: 'Afternoon',
    recordDate: '2026-09-15',
    status: 'Time Over || Pending by Maintenance Team',
    statusType: 'danger',
    newIndiaAssurance: { hasFile: true },
    unitedIndiaInsurance: { hasFile: true },
  },
  {
    srNo: 11,
    caseId: 'INC-CM-0111',
    vehicleNumber: 'MH14AA2211',
    type: 'Trailer',
    policyNumber: '0407033126P104899120',
    pilotName: 'Mr. Sanjay Patil',
    pilotId: 'PLT-0111',
    schedule: 'Night',
    recordDate: '2026-09-14',
    status: 'Time Over || Claim intimated',
    statusType: 'danger',
    newIndiaAssurance: { hasFile: true },
    unitedIndiaInsurance: { hasFile: true },
  },
  {
    srNo: 12,
    caseId: 'INC-CM-0110',
    vehicleNumber: 'MH12RQ4490',
    type: 'Bus',
    policyNumber: 'NA',
    pilotName: 'Mr. Amit Rawat',
    pilotId: 'PLT-0110',
    schedule: 'Morning',
    recordDate: '2026-09-12',
    status: 'Time Over || Pending by Maintenance Team',
    statusType: 'danger',
    newIndiaAssurance: { hasFile: false },
    unitedIndiaInsurance: { hasFile: false },
  },
  {
    srNo: 13,
    caseId: 'INC-CM-0109',
    vehicleNumber: 'MH11BB3302',
    type: 'Trailer',
    policyNumber: '0407033126P104899341',
    pilotName: 'Mr. Sunil Deshmukh',
    pilotId: 'PLT-0109',
    schedule: 'Afternoon',
    recordDate: '2026-09-10',
    status: 'Vehicle repair completed',
    statusType: 'success',
    reassess: true,
    newIndiaAssurance: { hasFile: true },
    unitedIndiaInsurance: { hasFile: true },
  },
  {
    srNo: 14,
    caseId: 'INC-CM-0108',
    vehicleNumber: 'ML09C8821',
    type: 'Bus',
    policyNumber: 'POL1088',
    pilotName: 'Mr. Rajesh Kumar',
    pilotId: 'PLT-0108',
    schedule: 'Evening',
    recordDate: '2026-09-08',
    status: 'Vehicle repair completed',
    statusType: 'success',
    reassess: false,
    newIndiaAssurance: { hasFile: true },
    unitedIndiaInsurance: { hasFile: true },
  },
  {
    srNo: 15,
    caseId: 'INC-CM-0107',
    vehicleNumber: 'MH43AA9910',
    type: 'Trailer',
    policyNumber: '0407033126P104899550',
    pilotName: 'Mr. Vikram Shinde',
    pilotId: 'PLT-0107',
    schedule: 'Night',
    recordDate: '2026-09-05',
    status: 'Time Over || Pending by Maintenance Team',
    statusType: 'danger',
    newIndiaAssurance: { hasFile: false },
    unitedIndiaInsurance: { hasFile: true },
  },
];

interface InsuranceDashboardProps {
  onBackToProjects: () => void;
}

export function InsuranceDashboard({ onBackToProjects }: InsuranceDashboardProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed' | 'Archived'>('All');
  const [selectedSite, setSelectedSite] = useState('Coal Mines');
  const [siteDropdownOpen, setSiteDropdownOpen] = useState(false);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'Insurance' | 'Maintenance'>('Insurance');
  const [operationsOpen, setOperationsOpen] = useState(true);
  const [configOpen, setConfigOpen] = useState(false);
  const [userMgmtOpen, setUserMgmtOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [copiedBadge, setCopiedBadge] = useState<{ x: number; y: number } | null>(null);
  const [insuranceData, setInsuranceData] = useState<InsuranceCase[]>(initialInsuranceData);
  const [editingClaimRow, setEditingClaimRow] = useState<InsuranceCase | null>(null);
  const [editingCompany, setEditingCompany] = useState<string>('The New India Assurance Co. Ltd.');
  const [archivedCaseIds, setArchivedCaseIds] = useState<string[]>([]);
  const [archiveToast, setArchiveToast] = useState<string | null>(null);
  const [archiveGlow, setArchiveGlow] = useState<'purple' | 'orange' | null>(null);

  const handleSaveClaim = (updatedFields: Partial<InsuranceCase>) => {
    if (!editingClaimRow) return;
    setInsuranceData(prev =>
      prev.map(item =>
        item.caseId === editingClaimRow.caseId
          ? { ...item, ...updatedFields }
          : item
      )
    );
  };

  const handleCopyText = (text: string, e: React.MouseEvent) => {
    if (text === 'NA') return;
    try {
      navigator.clipboard.writeText(text);
    } catch {}
    setCopiedBadge({ x: e.clientX, y: e.clientY });
    setTimeout(() => {
      setCopiedBadge(null);
    }, 1200);
  };

  const filteredData = insuranceData.filter(item => {
    const matchesSearch =
      item.caseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.pilotName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.policyNumber.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === 'Pending') {
      return item.statusType === 'danger' || item.status.toLowerCase().includes('pending') || item.status.toLowerCase().includes('claim') || item.reassess;
    }
    if (statusFilter === 'Completed') {
      return item.statusType === 'success';
    }
    if (statusFilter === 'Archived') {
      return archivedCaseIds.includes(item.caseId);
    }
    return true;
  });

  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const isAllArchived = paginatedData.length > 0 && paginatedData.every(r => archivedCaseIds.includes(r.caseId));

  const handleToggleArchiveAll = () => {
    if (isAllArchived) {
      setArchivedCaseIds(prev => prev.filter(id => !paginatedData.some(p => p.caseId === id)));
      setArchiveGlow('orange');
      setTimeout(() => setArchiveGlow(null), 1500);
      setArchiveToast('Unarchived page cases');
    } else {
      const pageIds = paginatedData.map(p => p.caseId);
      setArchivedCaseIds(prev => Array.from(new Set([...prev, ...pageIds])));
      setArchiveGlow('purple');
      setTimeout(() => setArchiveGlow(null), 1500);
      setArchiveToast(`Archived ${pageIds.length} cases`);
    }
    setTimeout(() => setArchiveToast(null), 1800);
  };

  const handleDirectArchiveCase = (caseId: string) => {
    setArchivedCaseIds(prev => Array.from(new Set([...prev, caseId])));
    setArchiveGlow('purple');
    setTimeout(() => setArchiveGlow(null), 1500);
    setArchiveToast(`Archived ${caseId}`);
    setTimeout(() => setArchiveToast(null), 1800);
  };

  const handleRemoveFromArchive = (caseId: string) => {
    setArchivedCaseIds(prev => prev.filter(id => id !== caseId));
    setArchiveGlow('orange');
    setTimeout(() => setArchiveGlow(null), 1500);
    setArchiveToast(`Removed ${caseId} from Archive`);
    setTimeout(() => setArchiveToast(null), 1800);
  };

  const handleArchiveTabClick = () => {
    setStatusFilter(prev => (prev === 'Archived' ? 'All' : 'Archived'));
    setCurrentPage(1);
  };

  return (
    <div className={`flex h-screen bg-[#f8fafc] text-slate-800 ${isDark ? 'dark bg-slate-900 text-slate-100' : ''}`}>
      {/* 1. TailAdmin Left Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen z-50 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${
          isCollapsed ? 'w-[72px]' : 'w-[260px]'
        }`}
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-slate-100 dark:border-slate-800">
          {!isCollapsed ? (
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={onBackToProjects}>
              <img src={TransvoltLogo} alt="Transvolt" className="h-6 w-auto" />
            </div>
          ) : (
            <div className="mx-auto cursor-pointer" onClick={onBackToProjects}>
              <img src={LogoIcon} alt="Transvolt" className="w-8 h-8" />
            </div>
          )}
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {/* Dashboard */}
          <button
            type="button"
            onClick={onBackToProjects}
            className="flex items-center w-full gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <LayoutDashboard className="w-5 h-5 text-slate-500" />
            {!isCollapsed && <span>Dashboard</span>}
          </button>

          {/* Configuration */}
          <div>
            <button
              type="button"
              onClick={() => setConfigOpen(!configOpen)}
              className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-5 h-5 text-slate-500" />
                {!isCollapsed && <span>Configuration</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${configOpen ? 'rotate-180' : ''}`} />
              )}
            </button>
          </div>

          {/* User Management */}
          <div>
            <button
              type="button"
              onClick={() => setUserMgmtOpen(!userMgmtOpen)}
              className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-slate-500" />
                {!isCollapsed && <span>User Management</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${userMgmtOpen ? 'rotate-180' : ''}`} />
              )}
            </button>
          </div>

          {/* Operations (Expanded with Insurance Active) */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setOperationsOpen(!operationsOpen)}
              className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Briefcase className="w-5 h-5 text-slate-500" />
                {!isCollapsed && <span className="font-semibold">Operations</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${operationsOpen ? 'rotate-180' : ''}`} />
              )}
            </button>

            {operationsOpen && !isCollapsed && (
              <div className="space-y-2 mt-1.5 pl-2">
                {/* Insurance Parent Item (Soft Light Blue Pill matching Image) */}
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#eef4ff] dark:bg-blue-950/40 text-[#3b5bfd] dark:text-blue-400 cursor-pointer select-none">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-4 h-4 text-[#3b5bfd] dark:text-blue-400 stroke-[1.8]" />
                    <span className="text-sm font-semibold tracking-wide">Insurance</span>
                  </div>
                  <ChevronUp className="w-4 h-4 text-[#3b5bfd] dark:text-blue-400 stroke-[2.2]" />
                </div>

                {/* Sub-items Indented to the right */}
                <div className="pl-6 space-y-1.5">
                  {/* 1. Insurance Sub-item (Active Soft Blue Pill, Bold Blue Text) */}
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('Insurance')}
                    className={`w-full text-left px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeSubTab === 'Insurance'
                        ? 'bg-[#eef4ff] dark:bg-blue-950/50 text-[#3b5bfd] dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-300 hover:text-[#3b5bfd]'
                    }`}
                  >
                    Insurance
                  </button>

                  {/* 2. Maintenance Sub-item (Plain Bold Dark Text, No Bullet) */}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSubTab('Maintenance');
                      showToast('Switched to Maintenance view');
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      activeSubTab === 'Maintenance'
                        ? 'bg-[#eef4ff] dark:bg-blue-950/50 text-[#3b5bfd] dark:text-blue-400'
                        : 'text-slate-800 dark:text-slate-200 hover:text-[#3b5bfd]'
                    }`}
                  >
                    Maintenance
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to All Projects Hub Button at Footer */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={onBackToProjects}
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
            title="Return to Master Page"
          >
            <Boxes className="w-4 h-4 text-emerald-600" />
            {!isCollapsed && <span>All Projects Hub</span>}
          </button>
        </div>
      </aside>

      {/* 2. Main Page Content Offset by Sidebar */}
      <div
        className="flex flex-col flex-1 overflow-hidden transition-all duration-300"
        style={{ marginLeft: isCollapsed ? '72px' : '260px' }}
      >
        {/* Top Header Bar matching Image 2 */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 flex items-center justify-between flex-shrink-0 z-40">
          {/* Left: Collapse Hamburger Toggle */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              title="Toggle Sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Right: Site Select + Theme Toggle + User Avatar Profile */}
          <div className="flex items-center gap-4">
            {/* Site Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSiteDropdownOpen(!siteDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <span>{selectedSite}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
              {siteDropdownOpen && (
                <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-50 text-xs">
                  {['Coal Mines', 'Public Bus', 'Port Logistics', 'Cement Depo'].map(site => (
                    <button
                      key={site}
                      type="button"
                      onClick={() => {
                        setSelectedSite(site);
                        setSiteDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200"
                    >
                      {site}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 rounded-full text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors cursor-pointer"
              title="Toggle Dark / Light Theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-700">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-semibold text-xs border border-slate-300 dark:border-slate-600">
                M
              </div>
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">mukesh.s</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </div>
          </div>
        </header>

        {/* Page Body Container */}
        <main className="flex-1 overflow-y-auto px-6 md:px-8 pt-4 pb-6">
          {/* Breadcrumbs & Title with equal compact spacing top & bottom */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              Insurance
            </h1>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
              <span className="hover:text-slate-600 cursor-pointer" onClick={onBackToProjects}>Home</span>
              <span>&gt;</span>
              <span className="text-slate-600 dark:text-slate-300 font-semibold">Insurance</span>
            </div>
          </div>



          {/* Main Card: Insurance List Table Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden">
            {/* Card Header: Back Arrow + Title + Search + Filter */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Left Title with Back Arrow */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={onBackToProjects}
                  className="p-1 rounded-md text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Back to All Projects"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h2 className="text-sm sm:text-base font-bold text-slate-800 dark:text-white">
                  Insurance List
                </h2>
              </div>

              {/* Right: Search Box + Pending Filter Dropdown with Filter Icon */}
              <div className="flex items-center gap-2.5">
                <div className="relative w-44 sm:w-56">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                {/* Archive Important Cases Button */}
                <button
                  type="button"
                  onClick={handleArchiveTabClick}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ease-in-out cursor-pointer whitespace-nowrap ${
                    archiveGlow === 'purple'
                      ? 'shadow-[0_0_16px_rgba(168,85,247,0.45)] border-purple-300 dark:border-purple-600 bg-purple-50/70 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300'
                      : archiveGlow === 'orange'
                        ? 'shadow-[0_0_16px_rgba(249,115,22,0.45)] border-orange-300 dark:border-orange-600 bg-orange-50/70 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300'
                        : statusFilter === 'Archived'
                          ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm border border-purple-500'
                          : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60 shadow-2xs'
                  }`}
                  title={
                    statusFilter === 'Archived'
                      ? 'Currently viewing Archived Cases (Click to show All)'
                      : 'Click to view Archived Cases'
                  }
                >
                  <Archive className={`w-3.5 h-3.5 transition-colors duration-300 ${
                    archiveGlow === 'purple'
                      ? 'text-purple-600 dark:text-purple-400'
                      : archiveGlow === 'orange'
                        ? 'text-orange-600 dark:text-orange-400'
                        : statusFilter === 'Archived'
                          ? 'text-white'
                          : 'text-purple-600 dark:text-purple-400'
                  }`} />
                  <span>Archive Important Cases ({archivedCaseIds.length})</span>
                </button>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <Filter className="w-3.5 h-3.5 text-slate-500" />
                    <span>{statusFilter}</span>
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                  {filterDropdownOpen && (
                    <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-50 text-xs font-medium">
                      {(['All', 'Pending', 'Completed', 'Archived'] as const).map(option => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setStatusFilter(option);
                            setFilterDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 hover:bg-blue-50 dark:hover:bg-slate-700 ${
                            statusFilter === option ? 'text-blue-600 font-semibold' : 'text-slate-700 dark:text-slate-200'
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Table with TailAdmin UI Kit Styling */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead className="bg-[#eaf4fe] dark:bg-sky-950/60 border-b border-sky-100 dark:border-sky-900/60 text-[11px] font-bold text-sky-800 dark:text-sky-300 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-3 font-bold text-center w-12">Sr No</th>
                    {/* Direct Archive Checkbox Column */}
                    <th className="py-3.5 px-2 font-bold text-center w-8">
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={isAllArchived}
                          onChange={handleToggleArchiveAll}
                          className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-purple-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-purple-600"
                          title="Archive / Unarchive Page Cases"
                        />
                      </div>
                    </th>
                    <th className="py-3.5 px-4 font-bold">Case ID</th>
                    <th className="py-3.5 px-4 font-bold">Vehicle Number</th>
                    <th className="py-3.5 px-4 font-bold text-center w-16">Type</th>
                    <th className="py-3.5 px-4 font-bold">Policy Number</th>
                    <th className="py-3.5 px-4 font-bold">Pilot Name</th>
                    <th className="py-3.5 px-4 font-bold text-center">Schedule</th>
                    <th className="py-3.5 px-4 font-bold">Record Date</th>
                    <th className="py-3.5 px-4 font-bold">Status</th>
                    <th className="py-3.5 px-4 font-bold text-center">THE NEW INDIA</th>
                    <th className="py-3.5 px-4 font-bold text-center">UNITED INDIA</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200 font-medium">
                  {paginatedData.map((row, idx) => (
                    <tr
                      key={row.caseId}
                      className={`group transition-all duration-150 border-l-2 ${
                        archivedCaseIds.includes(row.caseId)
                          ? 'border-l-purple-500 bg-purple-50/40 dark:bg-purple-950/20'
                          : idx % 2 === 0
                            ? 'border-l-transparent hover:border-l-emerald-500 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 bg-white dark:bg-slate-900'
                            : 'border-l-transparent hover:border-l-emerald-500 hover:bg-emerald-50/80 dark:hover:bg-emerald-950/40 bg-slate-100/85 dark:bg-slate-800/60'
                      }`}
                    >
                      {/* Col 1: Sr No */}
                      <td className="py-3.5 px-3 text-center text-slate-400 font-mono text-[11px]">
                        {row.srNo}
                      </td>

                      {/* Col: Direct Checkbox or Minus Icon for Archived */}
                      <td className="py-3.5 px-2 text-center">
                        <div className="flex items-center justify-center">
                          {archivedCaseIds.includes(row.caseId) ? (
                            <button
                              type="button"
                              onClick={() => handleRemoveFromArchive(row.caseId)}
                              className="w-5 h-5 rounded bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200/80 dark:border-rose-800/60 flex items-center justify-center transition-all cursor-pointer shadow-2xs hover:scale-110 active:scale-95"
                              title="Remove from Archived"
                            >
                              <Minus className="w-3 h-3 stroke-[3]" />
                            </button>
                          ) : (
                            <input
                              type="checkbox"
                              checked={false}
                              onChange={() => handleDirectArchiveCase(row.caseId)}
                              className="w-3.5 h-3.5 rounded border-slate-300 dark:border-slate-600 text-purple-600 focus:ring-0 focus:ring-offset-0 cursor-pointer accent-purple-600 transition-transform active:scale-90"
                              title="Click to directly Archive this case"
                            />
                          )}
                        </div>
                      </td>

                      {/* Col 2: Case ID with Copy Icon & Archived Badge */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => handleCopyText(row.caseId, e)}
                              className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700/60 transition-colors cursor-pointer opacity-70 group-hover:opacity-100"
                              title="Copy Case ID"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-bold text-slate-900 dark:text-white tracking-tight">{row.caseId}</span>
                          </div>
                          {archivedCaseIds.includes(row.caseId) && (
                            <span className="inline-flex items-center w-fit px-1.5 py-0.5 rounded text-[9.5px] font-bold uppercase tracking-wider bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-200/80 dark:border-purple-800/70 mt-1 shadow-2xs">
                              Archived
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Col 3: Vehicle Number with Copy Icon */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => handleCopyText(row.vehicleNumber, e)}
                            className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700/60 transition-colors cursor-pointer opacity-70 group-hover:opacity-100"
                            title="Copy Vehicle Number"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-slate-700 dark:text-slate-200 font-semibold">{row.vehicleNumber}</span>
                        </div>
                      </td>

                      {/* Col 4: Type Icon (No text) */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          {row.type === 'Trailer' ? (
                            <div
                              title="Trailer (Commercial Freight Hauler)"
                              className="w-8 h-7.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200/90 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shadow-2xs hover:scale-110 transition-transform cursor-pointer px-1"
                            >
                              <svg
                                className="w-6 h-3.5 fill-current"
                                viewBox="0 0 29 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                {/* Trailer Cargo Body on Left */}
                                <path d="M1 2.2h19v6.2H1V2.2z" />
                                
                                {/* Trailer Rear Mudflap / Bumper */}
                                <path d="M1 8.4v1.8h0.8" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round" />

                                {/* Chassis Rail / Skirt under trailer */}
                                <path d="M12 8.4h6v0.8h-6z" />

                                {/* Tractor Unit facing Right */}
                                <path d="M19 4.2h1.2c0.2-1.7 1.3-2.4 2.8-2.4 0.3 0 0.7 0.1 0.9 0.3v1.7h1.4l1.6 3v2.8h-0.9a1.7 1.7 0 0 0-3.3 0h-2.1a1.7 1.7 0 0 0-3.3 0H16V7h3V4.2z" />
                                
                                {/* Windshield Window Cutout */}
                                <polygon points="23.2,4.4 24.8,4.4 26,6.6 23.2,6.6" className="fill-amber-50 dark:fill-amber-950" />

                                {/* Triple Trailer Wheels on Left */}
                                <circle cx="4.2" cy="11.2" r="1.6" />
                                <circle cx="4.2" cy="11.2" r="0.6" className="fill-amber-50 dark:fill-amber-950" />

                                <circle cx="7.2" cy="11.2" r="1.6" />
                                <circle cx="7.2" cy="11.2" r="0.6" className="fill-amber-50 dark:fill-amber-950" />

                                <circle cx="10.2" cy="11.2" r="1.6" />
                                <circle cx="10.2" cy="11.2" r="0.6" className="fill-amber-50 dark:fill-amber-950" />

                                {/* Tractor Rear Drive Wheel */}
                                <circle cx="17.8" cy="11.2" r="1.6" />
                                <circle cx="17.8" cy="11.2" r="0.6" className="fill-amber-50 dark:fill-amber-950" />

                                {/* Tractor Front Steering Wheel on Right */}
                                <circle cx="24.4" cy="11.2" r="1.6" />
                                <circle cx="24.4" cy="11.2" r="0.6" className="fill-amber-50 dark:fill-amber-950" />
                              </svg>
                            </div>
                          ) : row.type === 'Bus' ? (
                            <div
                              title="Bus (Passenger Transport)"
                              className="w-7.5 h-7.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200/90 dark:border-cyan-800/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                            >
                              <Bus className="w-4.5 h-4.5 stroke-[2]" />
                            </div>
                          ) : (
                            <div
                              title={`Vehicle: ${row.type}`}
                              className="w-7.5 h-7.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200/90 dark:border-blue-800/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                            >
                              <Truck className="w-4.5 h-4.5 stroke-[2]" />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Col 5: Policy Number with Copy Icon */}
                      <td className="py-3.5 px-4">
                        {row.policyNumber === 'NA' ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/60 shadow-xs">
                            NA
                          </span>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={(e) => handleCopyText(row.policyNumber, e)}
                              className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-700/60 transition-colors cursor-pointer opacity-70 group-hover:opacity-100"
                              title="Copy Policy Number"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                            <span className="font-mono text-xs font-medium text-slate-700 dark:text-slate-300">
                              {row.policyNumber}
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Col 6: Pilot Name with Thin Pilot ID */}
                      <td className="py-3.5 px-4">
                        <div>
                          <span className="block font-semibold text-slate-800 dark:text-slate-100 text-xs">
                            {row.pilotName}
                          </span>
                          <span className="block text-[10.5px] font-normal text-slate-400 dark:text-slate-500 tracking-wide mt-0.5">
                            ID: {row.pilotId}
                          </span>
                        </div>
                      </td>

                      {/* Col 7: Schedule */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex justify-center">
                          {row.schedule === 'Morning' && (
                            <span className="inline-flex items-center justify-center gap-1.5 w-[92px] px-2.5 py-1 rounded-md text-[11px] font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200/70 dark:border-sky-800/50 shadow-xs">
                              <Sun className="w-3 h-3 text-sky-500 flex-shrink-0" />
                              <span>Morning</span>
                            </span>
                          )}
                          {row.schedule === 'Afternoon' && (
                            <span className="inline-flex items-center justify-center gap-1.5 w-[92px] px-2.5 py-1 rounded-md text-[11px] font-semibold bg-orange-50 dark:bg-orange-950/40 text-orange-700 dark:text-orange-300 border border-orange-200/70 dark:border-orange-800/50 shadow-xs">
                              <SunMedium className="w-3 h-3 text-orange-500 flex-shrink-0" />
                              <span>Afternoon</span>
                            </span>
                          )}
                          {row.schedule === 'Evening' && (
                            <span className="inline-flex items-center justify-center gap-1.5 w-[92px] px-2.5 py-1 rounded-md text-[11px] font-semibold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 border border-purple-200/70 dark:border-purple-800/50 shadow-xs">
                              <Sunset className="w-3 h-3 text-purple-500 flex-shrink-0" />
                              <span>Evening</span>
                            </span>
                          )}
                          {row.schedule === 'Night' && (
                            <span className="inline-flex items-center justify-center gap-1.5 w-[92px] px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700 shadow-xs">
                              <Moon className="w-3 h-3 text-slate-500 flex-shrink-0" />
                              <span>Night</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Col 8: Record Date */}
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                        {row.recordDate}
                      </td>

                      {/* Col 9: Status */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          {row.status.includes('completed') ? (
                            <>
                              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                                <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5] flex-shrink-0" />
                                <span>Vehicle repair completed</span>
                              </span>
                              {row.reassess && (
                                <div className="relative group/tooltip inline-flex items-center">
                                  <div
                                    className="w-[22px] h-[22px] rounded-full bg-[#ff6b00] text-white flex items-center justify-center shadow-xs cursor-pointer hover:scale-110 transition-transform flex-shrink-0"
                                    title="Re-Assessed"
                                  >
                                    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-white stroke-white stroke-[0.8]" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M16.5 5.5A7.5 7.5 0 0 0 5.1 11.2H2.3l4.2 4.2 4.2-4.2H7.9a4.8 4.8 0 0 1 7.2-3.7l1.4-2zM7.5 18.5a7.5 7.5 0 0 0 11.4-5.7h2.8l-4.2-4.2-4.2 4.2h2.8a4.8 4.8 0 0 1-7.2 3.7l-1.4 2z" />
                                    </svg>
                                  </div>
                                  {/* Hover Tooltip displaying Re-Assessed near the icon */}
                                  <div className="absolute left-full ml-1.5 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-slate-900 text-white text-[10.5px] font-semibold whitespace-nowrap shadow-lg opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity z-50">
                                    Re-Assessed
                                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900" />
                                  </div>
                                </div>
                              )}
                            </>
                          ) : row.status.includes('Claim') ? (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 dark:text-rose-400">
                              <AlertCircle className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                              <span>Claim Intimated</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-500 dark:text-rose-400">
                              <Clock className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                              <span>Maint. Pending</span>
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Col 10: THE NEW INDIA Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingClaimRow(row);
                              setEditingCompany('The New India Assurance Co. Ltd.');
                            }}
                            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all cursor-pointer border border-slate-200/70 dark:border-slate-700/60 shadow-xs hover:scale-105 active:scale-95"
                            title="Edit Claim Form"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          {row.newIndiaAssurance.hasFile ? (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingClaimRow(row);
                                setEditingCompany('The New India Assurance Co. Ltd.');
                              }}
                              className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-all cursor-pointer border border-blue-200/70 dark:border-blue-800/60 shadow-xs hover:scale-105 active:scale-95"
                              title="Download Attachment"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span
                              className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800/40 text-slate-300 dark:text-slate-600 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700 cursor-not-allowed"
                              title="Document Not Available"
                            >
                              <FileX className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Col 11: UNITED INDIA Actions */}
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingClaimRow(row);
                              setEditingCompany('United India Insurance Co. Ltd.');
                            }}
                            className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 text-slate-500 dark:text-slate-400 flex items-center justify-center transition-all cursor-pointer border border-slate-200/70 dark:border-slate-700/60 shadow-xs hover:scale-105 active:scale-95"
                            title="Edit Claim Form"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          {row.unitedIndiaInsurance.hasFile ? (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingClaimRow(row);
                                setEditingCompany('United India Insurance Co. Ltd.');
                              }}
                              className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-all cursor-pointer border border-blue-200/70 dark:border-blue-800/60 shadow-xs hover:scale-105 active:scale-95"
                              title="Download Attachment"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          ) : (
                            <span
                              className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800/40 text-slate-300 dark:text-slate-600 flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700 cursor-not-allowed"
                              title="Document Not Available"
                            >
                              <FileX className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}

                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={12} className="py-8 text-center text-slate-400 text-xs">
                        No insurance records found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Table Footer: Rows per page + Pagination matching Image 2 */}
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
              {/* Rows Per Page */}
              <div className="flex items-center gap-2">
                <span>Rows per page:</span>
                <select
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="px-2 py-1 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-semibold focus:outline-none"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1 rounded text-slate-500 hover:text-slate-800 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed font-medium cursor-pointer"
                >
                  &lt; Previous
                </button>

                {[1, 2, 3, 4, 5].map(pageNum => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-7 h-7 rounded text-xs font-bold transition-all cursor-pointer ${
                      currentPage === pageNum
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => setCurrentPage(prev => Math.min(5, prev + 1))}
                  disabled={currentPage === 5}
                  className="px-2.5 py-1 rounded text-slate-500 hover:text-slate-800 dark:hover:text-white disabled:opacity-40 disabled:cursor-not-allowed font-medium cursor-pointer"
                >
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Mouse Cursor Badge for Copy */}
      {copiedBadge && (
        <div
          style={{ left: `${copiedBadge.x}px`, top: `${copiedBadge.y - 12}px` }}
          className="pointer-events-none fixed z-[99999] -translate-x-1/2 -translate-y-full px-2.5 py-1 rounded-full bg-slate-900/95 text-white text-[11px] font-semibold tracking-wide shadow-xl border border-white/20 backdrop-blur-sm flex items-center gap-1.5 animate-in fade-in zoom-in-90 duration-150"
        >
          <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
          <span>Copied</span>
        </div>
      )}

      {/* Floating Toast Notification for Archive */}
      {archiveToast && (
        <div className="fixed bottom-6 right-6 z-[99999] bg-slate-900/95 text-white px-4 py-2.5 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold backdrop-blur-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{archiveToast}</span>
        </div>
      )}

      {/* Interactive Motor Vehicle Claim Form Modal */}
      <MotorClaimFormModal
        isOpen={!!editingClaimRow}
        claim={editingClaimRow}
        companyName={editingCompany}
        onClose={() => setEditingClaimRow(null)}
        onSave={handleSaveClaim}
      />
    </div>
  );
}
