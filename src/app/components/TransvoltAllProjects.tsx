import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, Filter, ExternalLink, ArrowRight, CheckCircle2, Clock, PauseCircle, Compass, MoreVertical, Trash2, Check, ChevronDown, Globe, Smartphone, Cpu, Boxes, GripVertical, Link2Off, Sparkles, LayoutDashboard, Plus, X, Pencil, Monitor } from 'lucide-react';
import LogoWhite from '../../imports/Logo_White.svg';

// --- Wave Background anchored to 1920x1080 fixed aspect canvas without stretching ---
function AnimatedWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

    const resize = () => {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handlePointerMove = (e: PointerEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('pointermove', handlePointerMove);

    let t = 0;
    const TOTAL_LINES = 32;
    const GAP = 8;

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);
      t += 0.0052;

      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      // Cursor Radial Ambient Glow
      if (mouseX > -500) {
        const broadGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 600);
        broadGlow.addColorStop(0, 'rgba(255, 255, 255, 0.07)');
        broadGlow.addColorStop(0.25, 'rgba(68, 114, 196, 0.05)');
        broadGlow.addColorStop(0.55, 'rgba(84, 130, 53, 0.025)');
        broadGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = broadGlow;
        ctx.fillRect(0, 0, width, height);
      }

      const centerY = height * 0.48;
      const setHeight = (TOTAL_LINES - 1) * GAP;
      const overlapOffset = (setHeight * 0.40) / 2;
      const greenCenterY = centerY - overlapOffset;
      const blueCenterY = centerY + overlapOffset;

      // SET 1: 32 GREEN LINES (#548235)
      for (let i = 0; i < TOTAL_LINES; i++) {
        const normI = (i - (TOTAL_LINES - 1) / 2) / (TOTAL_LINES / 2);
        const centerFactor = 1 - Math.abs(normI);
        const alpha = 0.12 + centerFactor * 0.30;
        ctx.strokeStyle = `rgba(84, 130, 53, ${alpha})`;
        ctx.lineWidth = 1.15;

        ctx.beginPath();
        const step = 6;
        for (let x = 0; x <= width + step; x += step) {
          const normX = x / width;
          const splay = 1 + 0.85 * Math.sin(normX * 3.5 + t * 0.8) + 0.4 * Math.cos(normX * 5.5 - t * 0.55);
          const lineOffset = normI * ((TOTAL_LINES / 2) * GAP) * splay;
          const phaseSplay = normI * 0.4;
          const ampSplay = 1 + normI * 0.28;

          const wave1 = Math.sin(normX * 4.2 + t * 0.85 + phaseSplay) * 58 * ampSplay;
          const wave2 = Math.cos(normX * 2.6 - t * 0.55 - phaseSplay * 0.4) * 36;
          const wave3 = Math.sin(normX * 6.5 + t * 1.1 + normI * 0.5) * 16;
          const y = greenCenterY + lineOffset + wave1 + wave2 + wave3;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        // Traveling Beam Lights
        const beamProgress = (t * 0.35 + (i / TOTAL_LINES) * 0.75) % 1.3 - 0.15;
        const beamCenter = beamProgress * width;
        const beamLength = 150;
        const beamStart = beamCenter - beamLength;
        const beamEnd = beamCenter + beamLength;

        if (beamEnd > 0 && beamStart < width) {
          ctx.beginPath();
          let beamStarted = false;
          for (let bx = Math.max(0, beamStart); bx <= Math.min(width, beamEnd) + step; bx += step) {
            const normX = bx / width;
            const splay = 1 + 0.85 * Math.sin(normX * 3.5 + t * 0.8) + 0.4 * Math.cos(normX * 5.5 - t * 0.55);
            const lineOffset = normI * ((TOTAL_LINES / 2) * GAP) * splay;
            const phaseSplay = normI * 0.4;
            const ampSplay = 1 + normI * 0.28;

            const wave1 = Math.sin(normX * 4.2 + t * 0.85 + phaseSplay) * 58 * ampSplay;
            const wave2 = Math.cos(normX * 2.6 - t * 0.55 - phaseSplay * 0.4) * 36;
            const wave3 = Math.sin(normX * 6.5 + t * 1.1 + normI * 0.5) * 16;
            const by = greenCenterY + lineOffset + wave1 + wave2 + wave3;

            if (!beamStarted) {
              ctx.moveTo(bx, by);
              beamStarted = true;
            } else {
              ctx.lineTo(bx, by);
            }
          }

          if (beamEnd > beamStart) {
            const beamGrad = ctx.createLinearGradient(beamStart, 0, beamEnd, 0);
            beamGrad.addColorStop(0, 'rgba(160, 240, 100, 0)');
            beamGrad.addColorStop(0.5, 'rgba(210, 255, 160, 0.09)');
            beamGrad.addColorStop(1, 'rgba(160, 240, 100, 0)');
            ctx.strokeStyle = beamGrad;
            ctx.lineWidth = 2.4;
            ctx.stroke();
          }
        }
      }

      // SET 2: 32 BLUE LINES (#4472C4)
      for (let i = 0; i < TOTAL_LINES; i++) {
        const normI = (i - (TOTAL_LINES - 1) / 2) / (TOTAL_LINES / 2);
        const centerFactor = 1 - Math.abs(normI);
        const alpha = 0.12 + centerFactor * 0.30;
        ctx.strokeStyle = `rgba(68, 114, 196, ${alpha})`;
        ctx.lineWidth = 1.15;

        ctx.beginPath();
        const step = 6;
        for (let x = 0; x <= width + step; x += step) {
          const normX = x / width;
          const splay = 1 + 0.85 * Math.sin(normX * 3.2 - t * 0.75) + 0.4 * Math.cos(normX * 5.2 + t * 0.6);
          const lineOffset = normI * ((TOTAL_LINES / 2) * GAP) * splay;
          const phaseSplay = normI * 0.4;
          const ampSplay = 1 + normI * 0.28;

          const wave1 = Math.sin(normX * 3.8 - t * 0.75 + phaseSplay) * 62 * ampSplay;
          const wave2 = Math.cos(normX * 2.9 + t * 0.65 - phaseSplay * 0.4) * 38;
          const wave3 = Math.sin(normX * 6.2 - t * 1.05 + normI * 0.5) * 16;
          const y = blueCenterY + lineOffset + wave1 + wave2 + wave3;

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();

        const beamProgress = 1 - ((t * 0.35 + (i / TOTAL_LINES) * 0.75) % 1.3 - 0.15);
        const beamCenter = beamProgress * width;
        const beamLength = 150;
        const beamStart = beamCenter - beamLength;
        const beamEnd = beamCenter + beamLength;

        if (beamEnd > 0 && beamStart < width) {
          ctx.beginPath();
          let beamStarted = false;
          for (let bx = Math.max(0, beamStart); bx <= Math.min(width, beamEnd) + step; bx += step) {
            const normX = bx / width;
            const splay = 1 + 0.85 * Math.sin(normX * 3.2 - t * 0.75) + 0.4 * Math.cos(normX * 5.2 + t * 0.6);
            const lineOffset = normI * ((TOTAL_LINES / 2) * GAP) * splay;
            const phaseSplay = normI * 0.4;
            const ampSplay = 1 + normI * 0.28;

            const wave1 = Math.sin(normX * 3.8 - t * 0.75 + phaseSplay) * 62 * ampSplay;
            const wave2 = Math.cos(normX * 2.9 + t * 0.65 - phaseSplay * 0.4) * 38;
            const wave3 = Math.sin(normX * 6.2 - t * 1.05 + normI * 0.5) * 16;
            const by = blueCenterY + lineOffset + wave1 + wave2 + wave3;

            if (!beamStarted) {
              ctx.moveTo(bx, by);
              beamStarted = true;
            } else {
              ctx.lineTo(bx, by);
            }
          }

          if (beamEnd > beamStart) {
            const beamGrad = ctx.createLinearGradient(beamStart, 0, beamEnd, 0);
            beamGrad.addColorStop(0, 'rgba(100, 180, 255, 0)');
            beamGrad.addColorStop(0.5, 'rgba(190, 230, 255, 0.09)');
            beamGrad.addColorStop(1, 'rgba(100, 180, 255, 0)');
            ctx.strokeStyle = beamGrad;
            ctx.lineWidth = 2.4;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

// Project Item Types
export type ProjectStatusType = 'live' | 'working' | 'hold' | 'planning';

export interface ProjectEntry {
  id: string;
  orderNumber: number;
  name: string;
  category: 'web' | 'mobile' | 'other';
  status: ProjectStatusType;
  statusLabel: string;
  isFirst?: boolean;
  isConnected?: boolean;
  linkUrl?: string;
}

interface TransvoltAllProjectsProps {
  onOpenMISDashboard: () => void;
}

const initialProjectsData: ProjectEntry[] = [
  // Web Applications (MIS Dashboard as VERY FIRST)
  {
    id: 'mis-dashboard',
    orderNumber: 1,
    name: 'MIS Dashbaord',
    category: 'web',
    status: 'live',
    statusLabel: 'Live Since 09 July 2026',
    isFirst: true,
    isConnected: true, // LIVE CONNECTED
  },
  {
    id: 'web-branding-portal',
    orderNumber: 2,
    name: 'Transvolt Branding Portal',
    category: 'web',
    status: 'working',
    statusLabel: 'Working',
    isConnected: false,
  },
  {
    id: 'web-corporate-site',
    orderNumber: 3,
    name: 'Transvolt Website 2027',
    category: 'web',
    status: 'hold',
    statusLabel: 'Hold',
    isConnected: false,
  },
  {
    id: 'web-eleverve',
    orderNumber: 4,
    name: 'ELEVERVE Green Portal',
    category: 'web',
    status: 'planning',
    statusLabel: 'Planning',
    isConnected: false,
  },
  {
    id: 'web-telematics-hub',
    orderNumber: 5,
    name: 'Fleet Analytics Hub',
    category: 'web',
    status: 'planning',
    statusLabel: 'Planning',
    isConnected: false,
  },

  // Mobile Applications
  {
    id: 'mob-driver-app',
    orderNumber: 1,
    name: 'MIS Dashbaord Mobile',
    category: 'mobile',
    status: 'live',
    statusLabel: 'Live Since 09 July 2026',
    isConnected: false,
  },
  {
    id: 'mob-fleet-maintenance',
    orderNumber: 2,
    name: 'Driver Logsheet & Trip App',
    category: 'mobile',
    status: 'working',
    statusLabel: 'Working',
    isConnected: false,
  },
  {
    id: 'mob-supervisor-dispatch',
    orderNumber: 3,
    name: 'Supervisor Dispatch App',
    category: 'mobile',
    status: 'hold',
    statusLabel: 'Hold',
    isConnected: false,
  },
  {
    id: 'mob-executive-suite',
    orderNumber: 4,
    name: 'Transvolt Executive Mobile',
    category: 'mobile',
    status: 'planning',
    statusLabel: 'Planning',
    isConnected: false,
  },
  {
    id: 'mob-tech-inspection',
    orderNumber: 5,
    name: 'Depot QR Inspection App',
    category: 'mobile',
    status: 'planning',
    statusLabel: 'Planning',
    isConnected: false,
  },

  // Other Projects
  {
    id: 'oth-website',
    orderNumber: 1,
    name: 'Transvolt Website',
    category: 'other',
    status: 'live',
    statusLabel: 'Live Since 09 July 2026',
    isConnected: false,
  },
  {
    id: 'oth-branding-portal',
    orderNumber: 2,
    name: 'Transvolt Branding Portal',
    category: 'other',
    status: 'live',
    statusLabel: 'Live Since 22 October 2026',
    isConnected: true,
    linkUrl: 'https://transvolt-branding-portal-v4-5h2z.vercel.app',
  },
  {
    id: 'oth-charging-cms',
    orderNumber: 3,
    name: 'OCPP Charger CMS',
    category: 'other',
    status: 'hold',
    statusLabel: 'Hold',
    isConnected: false,
  },
  {
    id: 'oth-battery-analytics',
    orderNumber: 4,
    name: 'Battery SOH AI Engine',
    category: 'other',
    status: 'planning',
    statusLabel: 'Planning',
    isConnected: false,
  },
  {
    id: 'oth-erp-bridge',
    orderNumber: 5,
    name: 'SAP & Tally Financial Bridge',
    category: 'other',
    status: 'planning',
    statusLabel: 'Planning',
    isConnected: false,
  },
];
export function TransvoltAllProjects({ onOpenMISDashboard }: TransvoltAllProjectsProps) {
  const [projectsData, setProjectsData] = useState<ProjectEntry[]>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('transvolt_all_projects_data') : null;
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback to default list
    }
    return initialProjectsData;
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('transvolt_all_projects_data', JSON.stringify(projectsData));
      }
    } catch {
      // Ignore storage errors
    }
  }, [projectsData]);
  const [globalSearch, setGlobalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatusType | 'all'>('all');

  // Column specific searches
  const [webSearch, setWebSearch] = useState('');
  const [mobileSearch, setMobileSearch] = useState('');
  const [otherSearch, setOtherSearch] = useState('');

  // Column specific filter state: 'all' | 'live' | 'working' | 'hold' | 'planning'
  const [webFilter, setWebFilter] = useState<string>('all');
  const [mobileFilter, setMobileFilter] = useState<string>('all');
  const [otherFilter, setOtherFilter] = useState<string>('all');

  // Move project to another category on drag & drop
  const handleMoveProject = (id: string, newCategory: 'web' | 'mobile' | 'other') => {
    setProjectsData(prev => {
      const itemIndex = prev.findIndex(p => p.id === id);
      if (itemIndex === -1) return prev;
      const current = prev[itemIndex];
      if (current.category === newCategory) return prev;
      const updated = { ...current, category: newCategory };
      const rest = prev.filter(p => p.id !== id);
      return [...rest, updated];
    });
  };

  // Reorder project within same category or across categories
  const handleReorderProject = (sourceId: string, targetId: string) => {
    if (sourceId === targetId) return;

    setProjectsData(prev => {
      const sourceIndex = prev.findIndex(p => p.id === sourceId);
      const targetIndex = prev.findIndex(p => p.id === targetId);

      if (sourceIndex === -1 || targetIndex === -1) return prev;

      const sourceItem = prev[sourceIndex];
      const targetItem = prev[targetIndex];

      // Update category to match target item if moved across columns
      const updatedSource = { ...sourceItem, category: targetItem.category };

      const newArray = [...prev];
      newArray.splice(sourceIndex, 1);
      const newTargetIndex = newArray.findIndex(p => p.id === targetId);
      newArray.splice(newTargetIndex, 0, updatedSource);

      return newArray;
    });
  };

  // Set Project Status
  const handleSetStatus = (id: string, newStatus: ProjectStatusType) => {
    setProjectsData(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        let label = 'Planning';
        if (newStatus === 'live') {
          const today = new Date().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          });
          label = `Live Since ${today}`;
        } else if (newStatus === 'working') {
          label = 'Working';
        } else if (newStatus === 'hold') {
          label = 'Hold';
        } else if (newStatus === 'planning') {
          label = 'Planning';
        }
        return { ...p, status: newStatus, statusLabel: label };
      })
    );
  };

  // Delete Project
  const handleDeleteProject = (id: string) => {
    setProjectsData(prev => prev.filter(p => p.id !== id));
  };

  // Rename Project
  const handleRenameProject = (id: string, newName: string) => {
    setProjectsData(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        return { ...p, name: newName.trim() };
      })
    );
  };

  // Add Project (with optional visit link)
  const handleAddProject = (
    name: string,
    status: ProjectStatusType,
    category: 'web' | 'mobile' | 'other',
    linkUrl?: string
  ) => {
    let label = 'Planning';
    if (status === 'live') {
      const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
      label = `Live Since ${today}`;
    } else if (status === 'working') {
      label = 'Working';
    } else if (status === 'hold') {
      label = 'Hold';
    } else if (status === 'planning') {
      label = 'Planning';
    }

    const hasLink = Boolean(linkUrl && linkUrl.trim());
    const newProject: ProjectEntry = {
      id: `project-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: name.trim(),
      category,
      status,
      statusLabel: label,
      linkUrl: hasLink ? linkUrl!.trim() : undefined,
      isConnected: hasLink,
    };

    setProjectsData(prev => [newProject, ...prev]);
  };

  // Update Project Visit Link
  const handleUpdateProjectLink = (id: string, newLink: string) => {
    setProjectsData(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const hasLink = Boolean(newLink && newLink.trim());
        return {
          ...p,
          linkUrl: hasLink ? newLink.trim() : undefined,
          isConnected: hasLink,
        };
      })
    );
  };

  // Compute status counts for top summary bar
  const counts = useMemo(() => {
    return {
      live: projectsData.filter(p => p.status === 'live').length,
      working: projectsData.filter(p => p.status === 'working').length,
      hold: projectsData.filter(p => p.status === 'hold').length,
      planning: projectsData.filter(p => p.status === 'planning').length,
    };
  }, [projectsData]);

  // Total counts for each column
  const webTotalCount = useMemo(() => projectsData.filter(p => p.category === 'web').length, [projectsData]);
  const mobileTotalCount = useMemo(() => projectsData.filter(p => p.category === 'mobile').length, [projectsData]);
  const otherTotalCount = useMemo(() => projectsData.filter(p => p.category === 'other').length, [projectsData]);

  // Filter helper
  const filterList = (items: ProjectEntry[], colSearch: string, colFilter: string) => {
    return items.filter(item => {
      const matchGlobal = !globalSearch || item.name.toLowerCase().includes(globalSearch.toLowerCase());
      const matchCol = !colSearch || item.name.toLowerCase().includes(colSearch.toLowerCase());
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchColFilter = colFilter === 'all' || item.status === colFilter;
      return matchGlobal && matchCol && matchStatus && matchColFilter;
    });
  };

  const webList = useMemo(() => filterList(projectsData.filter(p => p.category === 'web'), webSearch, webFilter), [projectsData, globalSearch, webSearch, statusFilter, webFilter]);
  const mobileList = useMemo(() => filterList(projectsData.filter(p => p.category === 'mobile'), mobileSearch, mobileFilter), [projectsData, globalSearch, mobileSearch, statusFilter, mobileFilter]);
  const otherList = useMemo(() => filterList(projectsData.filter(p => p.category === 'other'), otherSearch, otherFilter), [projectsData, globalSearch, otherSearch, statusFilter, otherFilter]);

  const handleVisit = (item: ProjectEntry) => {
    if (item.id === 'mis-dashboard') {
      onOpenMISDashboard();
    } else if (item.linkUrl) {
      window.open(item.linkUrl, '_blank', 'noopener,noreferrer');
    } else {
      alert(`Opening ${item.name} (${item.statusLabel})`);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#000000] text-white flex flex-col overflow-y-auto selection:bg-[#548235] selection:text-white">
      {/* Running Lines Waves Background in 1920x1080 fixed aspect ratio (no distortion) */}
      <AnimatedWaveBackground />

      {/* Main Page Scrollable Container */}
      <div className="relative z-10 flex flex-col flex-1 w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-5">
        {/* 1. Header Bar matching Image */}
        <header className="flex items-center justify-between pt-2 pb-5 mb-8 border-b border-white/[0.08]">
          {/* Left: Official Transvolt Logo */}
          <div className="flex items-center gap-3">
            <img
              src={LogoWhite}
              alt="Transvolt"
              className="h-7 sm:h-8 w-auto object-contain cursor-pointer"
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.8))' }}
            />
          </div>

          {/* Center Title */}
          <div className="text-center hidden md:block">
            <h1 className="text-sm sm:text-base font-semibold tracking-wide text-white">
              All Applications Master Page - Design Ready with Code
            </h1>
          </div>

          {/* Right: Search Box */}
          <div className="relative w-48 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search"
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
            />
          </div>
        </header>

        {/* 2. Top Status Cards Row (All Projects, Live Projects, Working, Hold, Under Planning) */}
        <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
          {/* Card 0: All Projects (10% Gray Glass + Purple Bottom Band) */}
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
              statusFilter === 'all'
                ? 'bg-white/[0.14] ring-2 ring-white/60 scale-[1.01]'
                : 'bg-white/[0.08] hover:bg-white/[0.12] hover:-translate-y-0.5'
            }`}
            style={{ minHeight: '118px' }}
          >
            {/* Top Gloss Reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-80" />

            {/* Tile Name (100% Larger) */}
            <div className="relative z-10 w-full">
              <span className="text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight drop-shadow-sm whitespace-nowrap">
                All Projects
              </span>
            </div>

            {/* Below Tile Name: 90% Large 3D Icon on Left & Bold Count on Right */}
            <div className="relative z-10 flex items-center justify-between w-full mt-2">
              {/* 3D Large Icon */}
              <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-purple-400/40 via-purple-600/30 to-[#2e1065]/80 border border-purple-400/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(0,0,0,0.7),0_8px_18px_rgba(168,85,247,0.45)] backdrop-blur-md transform group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-3 transition-all duration-300">
                <Boxes className="w-6 h-6 sm:w-7 sm:h-7 text-purple-100 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.85)]" />
              </div>

              {/* Count */}
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                {projectsData.length}
              </span>
            </div>

            {/* Bottom Color Band: Deep Vibrant Purple */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6b21a8] via-[#a855f7] to-[#7c3aed] shadow-[0_0_12px_rgba(168,85,247,0.7)]" />
          </button>

          {/* Card 1: Live Projects (10% Gray Glass + Green Bottom Band) */}
          <button
            type="button"
            onClick={() => setStatusFilter(statusFilter === 'live' ? 'all' : 'live')}
            className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
              statusFilter === 'live'
                ? 'bg-white/[0.14] ring-2 ring-white/60 scale-[1.01]'
                : 'bg-white/[0.08] hover:bg-white/[0.12] hover:-translate-y-0.5'
            }`}
            style={{ minHeight: '118px' }}
          >
            {/* Top Gloss Reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-80" />

            {/* Tile Name (100% Larger) */}
            <div className="relative z-10 w-full">
              <span className="text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight drop-shadow-sm whitespace-nowrap">
                Live Projects
              </span>
            </div>

            {/* Below Tile Name: 90% Large 3D Icon on Left & Bold Count on Right */}
            <div className="relative z-10 flex items-center justify-between w-full mt-2">
              {/* 3D Large Icon */}
              <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-emerald-400/40 via-emerald-600/30 to-[#064e3b]/80 border border-emerald-400/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(0,0,0,0.7),0_8px_18px_rgba(16,185,129,0.45)] backdrop-blur-md transform group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-3 transition-all duration-300">
                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-100 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.85)]" />
              </div>

              {/* Count */}
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                {counts.live || 12}
              </span>
            </div>

            {/* Bottom Color Band: Deep Transvolt Green */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1b4d1c] via-[#2e7d32] to-[#1b4d1c] shadow-[0_0_12px_rgba(46,125,50,0.6)]" />
          </button>

          {/* Card 2: Working (10% Gray Glass + Gold/Ochre Bottom Band) */}
          <button
            type="button"
            onClick={() => setStatusFilter(statusFilter === 'working' ? 'all' : 'working')}
            className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
              statusFilter === 'working'
                ? 'bg-white/[0.14] ring-2 ring-white/60 scale-[1.01]'
                : 'bg-white/[0.08] hover:bg-white/[0.12] hover:-translate-y-0.5'
            }`}
            style={{ minHeight: '118px' }}
          >
            {/* Top Gloss Reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-80" />

            {/* Tile Name (100% Larger) */}
            <div className="relative z-10 w-full">
              <span className="text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight drop-shadow-sm whitespace-nowrap">
                Working
              </span>
            </div>

            {/* Below Tile Name: 90% Large 3D Icon on Left & Bold Count on Right */}
            <div className="relative z-10 flex items-center justify-between w-full mt-2">
              {/* 3D Large Icon */}
              <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-amber-400/40 via-amber-600/30 to-[#78350f]/80 border border-amber-400/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(0,0,0,0.7),0_8px_18px_rgba(234,179,8,0.45)] backdrop-blur-md transform group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-3 transition-all duration-300">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-amber-100 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.85)]" />
              </div>

              {/* Count */}
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                {counts.working || 12}
              </span>
            </div>

            {/* Bottom Color Band: Gold / Ochre */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#866b19] via-[#ca8a04] to-[#866b19] shadow-[0_0_12px_rgba(202,138,4,0.6)]" />
          </button>

          {/* Card 3: Hold (10% Gray Glass + Rust/Orange-red Bottom Band) */}
          <button
            type="button"
            onClick={() => setStatusFilter(statusFilter === 'hold' ? 'all' : 'hold')}
            className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
              statusFilter === 'hold'
                ? 'bg-white/[0.14] ring-2 ring-white/60 scale-[1.01]'
                : 'bg-white/[0.08] hover:bg-white/[0.12] hover:-translate-y-0.5'
            }`}
            style={{ minHeight: '118px' }}
          >
            {/* Top Gloss Reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-80" />

            {/* Tile Name (100% Larger) */}
            <div className="relative z-10 w-full">
              <span className="text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight drop-shadow-sm whitespace-nowrap">
                Hold
              </span>
            </div>

            {/* Below Tile Name: 90% Large 3D Icon on Left & Bold Count on Right */}
            <div className="relative z-10 flex items-center justify-between w-full mt-2">
              {/* 3D Large Icon */}
              <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-orange-400/40 via-orange-600/30 to-[#7c2d12]/80 border border-orange-400/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(0,0,0,0.7),0_8px_18px_rgba(249,115,22,0.45)] backdrop-blur-md transform group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-3 transition-all duration-300">
                <PauseCircle className="w-6 h-6 sm:w-7 sm:h-7 text-orange-100 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.85)]" />
              </div>

              {/* Count */}
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                {counts.hold || 12}
              </span>
            </div>

            {/* Bottom Color Band: Rust / Orange-red */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#8c3513] via-[#ea580c] to-[#8c3513] shadow-[0_0_12px_rgba(234,88,12,0.6)]" />
          </button>

          {/* Card 4: Under Planning (10% Gray Glass + Navy/Blue Bottom Band) */}
          <button
            type="button"
            onClick={() => setStatusFilter(statusFilter === 'planning' ? 'all' : 'planning')}
            className={`group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer overflow-hidden backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${
              statusFilter === 'planning'
                ? 'bg-white/[0.14] ring-2 ring-white/60 scale-[1.01]'
                : 'bg-white/[0.08] hover:bg-white/[0.12] hover:-translate-y-0.5'
            }`}
            style={{ minHeight: '118px' }}
          >
            {/* Top Gloss Reflection */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.08] to-transparent opacity-80" />

            {/* Tile Name (100% Larger) */}
            <div className="relative z-10 w-full">
              <span className="text-base sm:text-lg md:text-xl font-extrabold text-white tracking-tight drop-shadow-sm whitespace-nowrap">
                Under Planning
              </span>
            </div>

            {/* Below Tile Name: 90% Large 3D Icon on Left & Bold Count on Right */}
            <div className="relative z-10 flex items-center justify-between w-full mt-2">
              {/* 3D Large Icon */}
              <div className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-400/40 via-blue-600/30 to-[#1e3a8a]/80 border border-blue-400/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(0,0,0,0.7),0_8px_18px_rgba(59,130,246,0.45)] backdrop-blur-md transform group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:rotate-3 transition-all duration-300">
                <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-blue-100 filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.85)]" />
              </div>

              {/* Count */}
              <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                {counts.planning || 12}
              </span>
            </div>

            {/* Bottom Color Band: Navy / Indigo / Blue */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#22284c] via-[#3b82f6] to-[#22284c] shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
          </button>
        </section>

        {/* 3. Main 3 Columns (All Web Application, All Mobile Application, Other Projects) */}
        {/* Important 1: Transparent and very less BG blur fill so background waves show through clearly */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start flex-1 mb-6">
          {/* Column 1: All Web Application */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData('text/plain');
              if (id) handleMoveProject(id, 'web');
            }}
            className="flex flex-col rounded-xl border border-white/[0.08] hover:border-emerald-500/30 bg-black/25 backdrop-blur-[2px] p-3 sm:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-colors min-h-[350px]"
          >
            {/* Column Header: Headline with Icon and Total Count Badge */}
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5 flex-nowrap min-w-0">
                <Monitor className="w-5 h-5 sm:w-6 sm:h-6 text-[#86efac] flex-shrink-0" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-wide whitespace-nowrap">
                  All Web Application
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex-shrink-0">
                  {webTotalCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ColumnFilterDropdown
                  currentFilter={webFilter}
                  onSelect={setWebFilter}
                />
                <AddProjectPopout
                  category="web"
                  categoryTitle="Web Application"
                  onAdd={(name, status, linkUrl) => handleAddProject(name, status, 'web', linkUrl)}
                />
                <div className="relative w-28 sm:w-32">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={webSearch}
                    onChange={(e) => setWebSearch(e.target.value)}
                    className="w-full pl-6 pr-2 py-1 rounded bg-black/50 border border-white/10 text-[11px] text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>
            </div>

            {/* Project Tiles List */}
            <div className="flex flex-col gap-2.5">
              {webList.map((item, idx) => (
                <SuperGlassProjectTile
                  key={item.id}
                  index={idx + 1}
                  item={item}
                  onVisit={() => handleVisit(item)}
                  onSetStatus={(status) => handleSetStatus(item.id, status)}
                  onDelete={() => handleDeleteProject(item.id)}
                  onRename={(newName) => handleRenameProject(item.id, newName)}
                  onReorder={handleReorderProject}
                  onUpdateLink={(newLink) => handleUpdateProjectLink(item.id, newLink)}
                />
              ))}
              {webList.length === 0 && (
                <div className="py-8 text-center text-xs text-gray-500 border border-dashed border-white/10 rounded-lg">
                  Drop projects here or adjust filters
                </div>
              )}
            </div>
          </div>

          {/* Column 2: All Mobile Application */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData('text/plain');
              if (id) handleMoveProject(id, 'mobile');
            }}
            className="flex flex-col rounded-xl border border-white/[0.08] hover:border-blue-500/30 bg-black/25 backdrop-blur-[2px] p-3 sm:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-colors min-h-[350px]"
          >
            {/* Column Header: Headline with Icon and Total Count Badge */}
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5 flex-nowrap min-w-0">
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-[#93c5fd] flex-shrink-0" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-wide whitespace-nowrap">
                  All Mobile Application
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30 flex-shrink-0">
                  {mobileTotalCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ColumnFilterDropdown
                  currentFilter={mobileFilter}
                  onSelect={setMobileFilter}
                />
                <AddProjectPopout
                  category="mobile"
                  categoryTitle="Mobile Application"
                  onAdd={(name, status, linkUrl) => handleAddProject(name, status, 'mobile', linkUrl)}
                />
                <div className="relative w-28 sm:w-32">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={mobileSearch}
                    onChange={(e) => setMobileSearch(e.target.value)}
                    className="w-full pl-6 pr-2 py-1 rounded bg-black/50 border border-white/10 text-[11px] text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>
            </div>

            {/* Project Tiles List */}
            <div className="flex flex-col gap-2.5">
              {mobileList.map((item, idx) => (
                <SuperGlassProjectTile
                  key={item.id}
                  index={idx + 1}
                  item={item}
                  onVisit={() => handleVisit(item)}
                  onSetStatus={(status) => handleSetStatus(item.id, status)}
                  onDelete={() => handleDeleteProject(item.id)}
                  onRename={(newName) => handleRenameProject(item.id, newName)}
                  onReorder={handleReorderProject}
                  onUpdateLink={(newLink) => handleUpdateProjectLink(item.id, newLink)}
                />
              ))}
              {mobileList.length === 0 && (
                <div className="py-8 text-center text-xs text-gray-500 border border-dashed border-white/10 rounded-lg">
                  Drop projects here or adjust filters
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Other Projects */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
            }}
            onDrop={(e) => {
              e.preventDefault();
              const id = e.dataTransfer.getData('text/plain');
              if (id) handleMoveProject(id, 'other');
            }}
            className="flex flex-col rounded-xl border border-white/[0.08] hover:border-purple-500/30 bg-black/25 backdrop-blur-[2px] p-3 sm:p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-colors min-h-[350px]"
          >
            {/* Column Header: Headline with Icon and Total Count Badge */}
            <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5 flex-nowrap min-w-0">
                <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 flex-shrink-0" />
                <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-wide whitespace-nowrap">
                  Other Projects
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 flex-shrink-0">
                  {otherTotalCount}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ColumnFilterDropdown
                  currentFilter={otherFilter}
                  onSelect={setOtherFilter}
                />
                <AddProjectPopout
                  category="other"
                  categoryTitle="Other Projects"
                  onAdd={(name, status, linkUrl) => handleAddProject(name, status, 'other', linkUrl)}
                />
                <div className="relative w-28 sm:w-32">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={otherSearch}
                    onChange={(e) => setOtherSearch(e.target.value)}
                    className="w-full pl-6 pr-2 py-1 rounded bg-black/50 border border-white/10 text-[11px] text-white placeholder-gray-500 focus:outline-none focus:border-white/30"
                  />
                </div>
              </div>
            </div>

            {/* Project Tiles List */}
            <div className="flex flex-col gap-2.5">
              {otherList.map((item, idx) => (
                <SuperGlassProjectTile
                  key={item.id}
                  index={idx + 1}
                  item={item}
                  onVisit={() => handleVisit(item)}
                  onSetStatus={(status) => handleSetStatus(item.id, status)}
                  onDelete={() => handleDeleteProject(item.id)}
                  onRename={(newName) => handleRenameProject(item.id, newName)}
                  onReorder={handleReorderProject}
                  onUpdateLink={(newLink) => handleUpdateProjectLink(item.id, newLink)}
                />
              ))}
              {otherList.length === 0 && (
                <div className="py-8 text-center text-xs text-gray-500 border border-dashed border-white/10 rounded-lg">
                  Drop projects here or adjust filters
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// 4. Column Filter Dropdown Component (Completed, Working, Hold, Planning)
interface ColumnFilterDropdownProps {
  currentFilter: string;
  onSelect: (filter: string) => void;
}

function ColumnFilterDropdown({ currentFilter, onSelect }: ColumnFilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const options = [
    { label: 'All', value: 'all', dot: 'bg-gray-400' },
    { label: 'Completed', value: 'live', dot: 'bg-[#10b981]' },
    { label: 'Working', value: 'working', dot: 'bg-[#eab308]' },
    { label: 'Hold', value: 'hold', dot: 'bg-[#f97316]' },
    { label: 'Planning', value: 'planning', dot: 'bg-[#3b82f6]' },
  ];

  const currentLabel = options.find((o) => o.value === currentFilter)?.label || 'Filter';

  return (
    <div className={`relative ${open ? 'z-50' : 'z-10'}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer border ${
          currentFilter !== 'all'
            ? 'bg-[#10b981]/25 border-[#10b981] text-white shadow-xs'
            : 'bg-[#1e293b]/70 hover:bg-[#334155] border-white/10 text-gray-300'
        }`}
      >
        <Filter className="w-3 h-3 text-gray-400" />
        <span>{currentFilter !== 'all' ? currentLabel : 'Filter'}</span>
        <ChevronDown className="w-3 h-3 text-gray-400" />
      </button>

      {open && (
        <div className="absolute right-0 top-8 z-[100] w-44 rounded-xl bg-[#1c1c20] border border-white/20 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.95)] text-left">
          <div className="px-2 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
            Filter Status
          </div>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onSelect(opt.value);
                setOpen(false);
              }}
              className={`flex items-center justify-between w-full px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                currentFilter === opt.value
                  ? 'bg-white/15 text-white'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${opt.dot}`} />
                <span>{opt.label}</span>
              </div>
              {currentFilter === opt.value && <Check className="w-3.5 h-3.5 text-[#10b981]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// 4b. Add Project Popout Component (Project Name, Project Status & Paste Link to Visit)
interface AddProjectPopoutProps {
  category: 'web' | 'mobile' | 'other';
  categoryTitle: string;
  onAdd: (name: string, status: ProjectStatusType, linkUrl?: string) => void;
}

function AddProjectPopout({ categoryTitle, onAdd }: AddProjectPopoutProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [status, setStatus] = useState<ProjectStatusType>('working');
  const popoutRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (popoutRef.current && !popoutRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [open]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim(), status, linkUrl.trim() || undefined);
    setName('');
    setLinkUrl('');
    setStatus('working');
    setOpen(false);
  };

  const statusOptions: { value: ProjectStatusType; label: string; dot: string; border: string }[] = [
    { value: 'live', label: 'Completed', dot: 'bg-[#10b981]', border: 'border-[#10b981]/50 text-[#86efac]' },
    { value: 'working', label: 'Working', dot: 'bg-[#eab308]', border: 'border-[#eab308]/50 text-[#fde047]' },
    { value: 'hold', label: 'Hold', dot: 'bg-[#f97316]', border: 'border-[#f97316]/50 text-[#fdba74]' },
    { value: 'planning', label: 'Planning', dot: 'bg-[#3b82f6]', border: 'border-[#3b82f6]/50 text-[#93c5fd]' },
  ];

  return (
    <div className={`relative ${open ? 'z-50' : 'z-10'}`} ref={popoutRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-semibold bg-[#10b981]/20 hover:bg-[#10b981]/30 border border-[#10b981]/40 text-[#86efac] transition-all cursor-pointer shadow-xs hover:scale-105 active:scale-95"
        title={`Add Project to ${categoryTitle}`}
      >
        <Plus className="w-3.5 h-3.5" />
        <span>Add</span>
      </button>

      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute right-0 top-8 z-[110] w-72 rounded-xl bg-[#1c1c20] border border-white/20 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.95)] backdrop-blur-xl text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
            <div>
              <h3 className="text-xs font-bold text-white tracking-wide">Add New Project</h3>
              <p className="text-[10px] text-gray-400">{categoryTitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {/* Field 1: Project Name */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                Project Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                autoFocus
                placeholder="Enter project name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
              />
            </div>

            {/* Field: Paste Link to Visit */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                Paste Link to Visit
              </label>
              <input
                type="url"
                placeholder="https://... (or leave blank if not connected)"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-black/60 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981] transition-colors"
              />
            </div>

            {/* Field 2: Project Status */}
            <div>
              <label className="block text-[11px] font-semibold text-gray-300 mb-1.5">
                Project Status
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {statusOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStatus(opt.value)}
                    className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] font-medium transition-all cursor-pointer border ${
                      status === opt.value
                        ? `bg-white/15 ${opt.border} font-semibold ring-1 ring-white/20`
                        : 'bg-white/[0.04] border-white/10 text-gray-400 hover:bg-white/[0.08] hover:text-gray-200'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${opt.dot}`} />
                    <span className="truncate">{opt.label}</span>
                    {status === opt.value && <Check className="w-3 h-3 ml-auto opacity-90" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/10 mt-1">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded-lg text-xs font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!name.trim()}
                className={`px-3 py-1 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  name.trim()
                    ? 'bg-[#10b981] hover:bg-[#059669] text-white cursor-pointer shadow-[0_2px_10px_rgba(16,185,129,0.35)]'
                    : 'bg-white/10 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// 5. Super Glassmorphism Project Tile Component with 25% Larger Text, Drag & Drop, and Inactive Visit state
interface SuperGlassProjectTileProps {
  item: ProjectEntry;
  index?: number;
  onVisit: () => void;
  onSetStatus: (status: ProjectStatusType) => void;
  onDelete: () => void;
  onRename: (newName: string) => void;
  onReorder?: (sourceId: string, targetId: string) => void;
  onUpdateLink?: (newLink: string) => void;
}

function SuperGlassProjectTile({ item, index = 1, onVisit, onSetStatus, onDelete, onRename, onReorder, onUpdateLink }: SuperGlassProjectTileProps) {
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isEditingLink, setIsEditingLink] = useState(false);
  const [tempName, setTempName] = useState(item.name);
  const [tempLink, setTempLink] = useState(item.linkUrl || '');
  const [isDragOver, setIsDragOver] = useState(false);
  const tileRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTempName(item.name);
  }, [item.name]);

  useEffect(() => {
    setTempLink(item.linkUrl || '');
  }, [item.linkUrl]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleOutside);
    }
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [menuOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tileRef.current) return;
    const rect = tileRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const getStatusColorClass = (status: ProjectStatusType) => {
    switch (status) {
      case 'live':
        return 'text-[#16a34a]'; // Green
      case 'working':
        return 'text-[#eab308]'; // Ochre Yellow
      case 'hold':
        return 'text-[#f97316]'; // Orange / Red
      case 'planning':
        return 'text-[#3b82f6]'; // Blue
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div
      ref={tileRef}
      draggable={!isRenaming}
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', item.id);
        e.dataTransfer.effectAllowed = 'move';
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'move';
        if (!isDragOver) setIsDragOver(true);
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        setIsDragOver(false);
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const sourceId = e.dataTransfer.getData('text/plain');
        if (sourceId && onReorder) {
          onReorder(sourceId, item.id);
        }
      }}
      onMouseMove={handleMouseMove}
      onClick={() => {
        if (!isRenaming && item.isConnected) onVisit();
      }}
      className={`group relative flex items-center justify-between px-3.5 sm:px-4 py-3 rounded-xl transition-all duration-200 overflow-visible border backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:-translate-y-0.5 select-none ${
        isDragOver
          ? 'border-emerald-400 ring-2 ring-emerald-400/50 bg-[#1c2c22]/90 scale-[1.01]'
          : 'border-white/[0.07] hover:border-white/25 bg-[#141416]/75 hover:bg-[#1a1a1e]/85'
      } ${
        menuOpen ? 'z-50' : 'z-0'
      } ${item.isConnected && !isRenaming ? 'cursor-pointer' : 'cursor-default'}`}
    >
      {/* Specular Radial Sheen on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden"
        style={{
          background: `radial-gradient(180px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.06), transparent 70%)`,
        }}
      />

      {/* Left Info: Drag Grip + Name (25% Larger) & Status */}
      <div className="relative z-10 flex items-center gap-2 text-left pr-2 min-w-0 flex-1">
        <GripVertical
          className="w-4 h-4 text-gray-500 group-hover:text-gray-300 cursor-grab active:cursor-grabbing flex-shrink-0"
          title="Drag to move across tiles"
        />
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          {isRenaming ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (tempName.trim()) {
                  onRename(tempName.trim());
                }
                setIsRenaming(false);
              }}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 py-0.5"
            >
              <input
                type="text"
                autoFocus
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setTempName(item.name);
                    setIsRenaming(false);
                  }
                }}
                className="px-2 py-0.5 rounded bg-black/90 border border-[#10b981] text-xs sm:text-sm text-white focus:outline-none ring-1 ring-[#10b981]/50 w-full max-w-[200px]"
              />
              <button
                type="submit"
                className="p-1 rounded bg-[#10b981] hover:bg-[#059669] text-white cursor-pointer transition-colors"
                title="Save Name"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setTempName(item.name);
                  setIsRenaming(false);
                }}
                className="p-1 rounded bg-white/10 hover:bg-white/20 text-gray-300 cursor-pointer transition-colors"
                title="Cancel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </form>
          ) : (
            <h3 className="text-[16px] sm:text-[17px] font-bold tracking-tight text-white group-hover:text-white transition-colors truncate">
              {index}. {item.name}
            </h3>
          )}
          <p className={`text-xs font-medium tracking-wide ${getStatusColorClass(item.status)}`}>
            Status: {item.statusLabel}
          </p>
        </div>
      </div>

      {/* Right Controls: Green Pill 'Visit' (or Inactive state) + 3-Dots Menu */}
      <div className={`relative flex items-center gap-1.5 flex-shrink-0 ${menuOpen ? 'z-50' : 'z-10'}`} ref={menuRef}>
        {item.isConnected ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onVisit();
            }}
            className="px-4 sm:px-5 py-1 sm:py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-sm bg-[#10b981] hover:bg-[#059669] text-white hover:scale-105 active:scale-95 shadow-[0_2px_10px_rgba(16,185,129,0.35)]"
          >
            Visit
          </button>
        ) : (
          <button
            type="button"
            disabled
            onClick={(e) => e.stopPropagation()}
            title="Project link not connected yet"
            className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-semibold tracking-wide cursor-not-allowed bg-white/[0.04] border border-white/10 text-gray-500 opacity-55 flex items-center gap-1"
          >
            <Link2Off className="w-3 h-3 text-gray-500" />
            <span>Visit</span>
          </button>
        )}

        {/* 3-Dots Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Project Options"
        >
          <MoreVertical size={16} />
        </button>

        {/* 3-Dots Dropdown Menu: Elevated z-[100] with solid dark glass background */}
        {menuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-10 z-[100] w-48 rounded-xl bg-[#1c1c20] border border-white/20 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.95)] text-left"
          >
            <div className="px-2 py-1 text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
              Set Tag / Status
            </div>

            <button
              type="button"
              onClick={() => {
                onSetStatus('live');
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span>Completed</span>
              {item.status === 'live' && <Check className="w-3.5 h-3.5 text-[#10b981] ml-auto" />}
            </button>

            <button
              type="button"
              onClick={() => {
                onSetStatus('working');
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#eab308]" />
              <span>Working</span>
              {item.status === 'working' && <Check className="w-3.5 h-3.5 text-[#eab308] ml-auto" />}
            </button>

            <button
              type="button"
              onClick={() => {
                onSetStatus('hold');
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#f97316]" />
              <span>Hold</span>
              {item.status === 'hold' && <Check className="w-3.5 h-3.5 text-[#f97316] ml-auto" />}
            </button>

            <button
              type="button"
              onClick={() => {
                onSetStatus('planning');
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#3b82f6]" />
              <span>Planning</span>
              {item.status === 'planning' && <Check className="w-3.5 h-3.5 text-[#3b82f6] ml-auto" />}
            </button>

            <div className="h-px bg-white/10 my-1.5" />

            <button
              type="button"
              onClick={() => {
                onDelete();
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/20 hover:text-red-300 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-400" />
              <span>Delete</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                setIsRenaming(true);
              }}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5 text-sky-400" />
              <span>Rename Project</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setIsEditingLink(!isEditingLink);
              }}
              className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-white cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#10b981]" />
              <span>Paste Link to Visit</span>
            </button>

            {isEditingLink && (
              <div className="p-2 bg-black/80 rounded-lg border border-white/20 mt-1 flex flex-col gap-1.5">
                <input
                  type="url"
                  placeholder="Paste URL (https://...)"
                  value={tempLink}
                  onChange={(e) => setTempLink(e.target.value)}
                  className="w-full px-2 py-1 rounded bg-black/90 border border-white/25 text-[11px] text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981]"
                />
                <div className="flex items-center justify-end gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsEditingLink(false)}
                    className="px-2 py-0.5 rounded text-[10px] text-gray-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onUpdateLink?.(tempLink.trim());
                      setIsEditingLink(false);
                      setMenuOpen(false);
                    }}
                    className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-[#10b981] hover:bg-[#059669] text-white cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
