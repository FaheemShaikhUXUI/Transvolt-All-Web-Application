import { useRef, useEffect, useState } from 'react';
import { Search, Bell, Calendar, ChevronDown, Sun, Moon, Menu, X, Boxes } from 'lucide-react';

interface HeaderProps {
  onSectorChange?: (sector: string) => void;
  currentSector?: string;
  showFilters?: boolean;
  isDark?: boolean;
  onToggleDark?: () => void;
  onToggleSidebar?: () => void;
  onOpenProjectsHub?: () => void;
}

export function Header({
  onSectorChange,
  currentSector = 'Public Sector',
  showFilters = true,
  isDark = false,
  onToggleDark,
  onToggleSidebar,
  onOpenProjectsHub,
}: HeaderProps) {
  const sectors = ['Public Sector', 'Mine Sector', 'Port Sector', 'Cement Sector'];
  const projects = ['Project Alpha', 'Project Beta', 'Project Gamma'];
  const clients = ['Client A', 'Client B', 'Client C'];
  const shifts = ['All Shifts', 'Shift A', 'Shift B', 'Shift C'];

  const inputRef = useRef<HTMLInputElement>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-3 px-4 lg:px-6 h-[64px]">

        {/* Hamburger Toggle */}
        <button
          onClick={onToggleSidebar}
          className="flex items-center justify-center w-10 h-10 text-gray-500 dark:text-gray-400 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
          aria-label="Toggle Sidebar"
        >
          <Menu size={18} />
        </button>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-sm hidden lg:block">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search size={16} className="text-gray-400 dark:text-gray-500" />
          </span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search or type command..."
            className="
              h-10 w-full rounded-lg border border-gray-200 dark:border-gray-700
              bg-gray-50 dark:bg-gray-800 pl-10 pr-14
              text-sm text-gray-800 dark:text-white/90
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              focus:border-brand-300 dark:focus:border-brand-700
              focus:outline-none focus:ring-2 focus:ring-brand-500/10
              transition-colors
            "
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-1.5 py-0.5 text-xs text-gray-500 dark:text-gray-400">
            <span>⌘</span>
            <span>K</span>
          </kbd>
        </div>

        {/* Right Actions */}
        <div className="ml-auto flex items-center gap-2">
          {/* Back to All Projects Hub Button */}
          {onOpenProjectsHub && (
            <button
              onClick={onOpenProjectsHub}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r from-[#548235] to-[#4472C4] hover:from-[#60993d] hover:to-[#5084df] shadow-xs hover:shadow-md transition-all cursor-pointer"
              title="Return to Transvolt All Projects Portal"
            >
              <Boxes size={15} />
              <span className="hidden sm:inline">All Projects</span>
            </button>
          )}

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDark}
            className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setNotifOpen(!notifOpen); setUserOpen(false); }}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error-500 rounded-full border-2 border-white dark:border-gray-900" />
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="absolute right-0 top-12 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-theme-md z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  <button onClick={() => setNotifOpen(false)}>
                    <X size={14} className="text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
                <div className="py-2 px-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="py-3 border-b border-gray-100 dark:border-gray-800">
                    <p className="font-medium text-gray-800 dark:text-white text-xs">Fleet Alert</p>
                    <p className="text-xs mt-0.5 text-gray-500">Vehicle MH-04-LQ-5736 overdue for maintenance.</p>
                  </div>
                  <div className="py-3">
                    <p className="font-medium text-gray-800 dark:text-white text-xs">MIS Report Ready</p>
                    <p className="text-xs mt-0.5 text-gray-500">Monthly MIS report is now available.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Avatar */}
          <div className="relative">
            <button
              onClick={() => { setUserOpen(!userOpen); setNotifOpen(false); }}
              className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-semibold">AD</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">Admin</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">Fleet Manager</p>
              </div>
              <ChevronDown size={14} className="text-gray-400 dark:text-gray-500 hidden md:block" />
            </button>

            {/* User Dropdown */}
            {userOpen && (
              <div className="absolute right-0 top-12 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-theme-md z-50 py-1.5">
                <div className="px-4 py-2.5 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">admin@transvolt.com</p>
                </div>
                {['Profile', 'Settings', 'Sign Out'].map(item => (
                  <button
                    key={item}
                    onClick={() => setUserOpen(false)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors
                      ${item === 'Sign Out'
                        ? 'text-error-600 hover:bg-error-50 dark:text-error-400 dark:hover:bg-error-500/10'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      {showFilters && (
        <div className="flex flex-wrap items-center gap-2.5 px-4 lg:px-6 py-3 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
          {/* Sector Dropdown */}
          <select
            className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-brand-300 dark:focus:border-brand-700 transition-colors cursor-pointer"
            value={currentSector}
            onChange={e => onSectorChange?.(e.target.value)}
          >
            {sectors.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          {/* Project Dropdown */}
          <select className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-brand-300 transition-colors cursor-pointer">
            <option value="">All Projects</option>
            {projects.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          {/* Client Dropdown */}
          <select className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-brand-300 transition-colors cursor-pointer">
            <option value="">All Clients</option>
            {clients.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          {/* Date Range */}
          <button className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <Calendar size={14} className="text-gray-500 dark:text-gray-400" />
            <span>May 27 – Jun 2</span>
            <ChevronDown size={14} className="text-gray-400 dark:text-gray-500" />
          </button>

          {/* Shift Selector */}
          <select className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 outline-none focus:border-brand-300 transition-colors cursor-pointer">
            {shifts.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      )}
    </header>
  );
}
