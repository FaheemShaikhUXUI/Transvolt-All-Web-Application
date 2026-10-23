import { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  Activity,
  ShieldCheck,
  AlertTriangle,
  Wrench,
  Briefcase,
  Bell,
  FileText,
  Layers,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Boxes,
} from 'lucide-react';
import TransvoltLogo from '../../imports/Transvolt_logo_Black.svg';
import LogoIcon from '../../imports/Logo_Icon.svg';

type NavItem = {
  icon: React.ReactNode;
  label: string;
  expandable?: boolean;
  subItems?: string[];
};

const navItems: NavItem[] = [
  { icon: <LayoutDashboard size={20} />, label: 'Dashboard', expandable: true, subItems: ['Public Sector', 'Mine Sector', 'Port Sector', 'Cement Sector'] },
  { icon: <Activity size={20} />, label: 'Operations', expandable: true, subItems: ['Incident / Accident', 'Vehicle Cleaning', 'Driver Logsheet'] },
  { icon: <ShieldCheck size={20} />, label: 'Insurance', expandable: true, subItems: ['Policy Management', 'Claims'] },
  { icon: <AlertTriangle size={20} />, label: 'Alerts' },
  { icon: <Wrench size={20} />, label: 'Maintenance' },
  { icon: <Briefcase size={20} />, label: 'Incorporate' },
  { icon: <Bell size={20} />, label: 'DMS Events' },
  { icon: <FileText size={20} />, label: 'MIS Report' },
  { icon: <Layers size={20} />, label: 'Master' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  isDark?: boolean;
  onOpenProjectsHub?: () => void;
}

export function Sidebar({ isCollapsed, onToggle, activeTab, onTabChange, isDark, onOpenProjectsHub }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [subMenuHeights, setSubMenuHeights] = useState<Record<number, number>>({});
  const subMenuRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const isExpanded = !isCollapsed || isHovered;

  // Auto-open submenu for active tab
  useEffect(() => {
    navItems.forEach((item, index) => {
      if (item.subItems?.includes(activeTab)) {
        setOpenSubmenu(index);
      }
    });
  }, [activeTab]);

  useEffect(() => {
    if (openSubmenu !== null && subMenuRefs.current[openSubmenu]) {
      setSubMenuHeights(prev => ({
        ...prev,
        [openSubmenu]: subMenuRefs.current[openSubmenu]?.scrollHeight || 0,
      }));
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number) => {
    setOpenSubmenu(prev => (prev === index ? null : index));
  };

  const handleNavClick = (item: NavItem, index: number) => {
    if (item.expandable && item.subItems) {
      handleSubmenuToggle(index);
    } else {
      onTabChange(item.label);
    }
  };

  const isItemActive = (item: NavItem) => {
    if (item.subItems) return item.subItems.includes(activeTab);
    return activeTab === item.label;
  };

  return (
    <aside
      className={`
        fixed top-0 left-0 h-screen z-50 flex flex-col
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-[260px]' : 'w-[72px]'}
      `}
      onMouseEnter={() => isCollapsed && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-800 min-h-[64px]">
        <div className="flex items-center gap-3 overflow-hidden">
          {isExpanded ? (
            <img
              src={TransvoltLogo}
              alt="Transvolt"
              className="h-7 object-contain transition-all duration-300"
              style={{ filter: isDark ? 'invert(1) brightness(2)' : 'none' }}
            />
          ) : (
            <img src={LogoIcon} alt="Transvolt" className="h-8 w-8 object-contain mx-auto" />
          )}
        </div>
        {isExpanded && (
          <button
            onClick={onToggle}
            className="w-7 h-7 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex-shrink-0"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        )}
      </div>

      {/* Collapsed toggle */}
      {!isExpanded && (
        <button
          onClick={onToggle}
          className="absolute top-[72px] -right-3 w-6 h-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full flex items-center justify-center shadow-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors z-10"
        >
          <ChevronRight size={12} />
        </button>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-3 py-4">
        {isExpanded && (
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Menu
          </p>
        )}

        <ul className="flex flex-col gap-1">
          {onOpenProjectsHub && (
            <li className="mb-2">
              <button
                onClick={onOpenProjectsHub}
                title={!isExpanded ? 'Transvolt All Projects' : undefined}
                className={`
                  menu-item group w-full text-left bg-gradient-to-r from-[#548235]/15 to-[#4472C4]/15 hover:from-[#548235]/25 hover:to-[#4472C4]/25 border border-[#548235]/40 text-gray-800 dark:text-gray-100 font-semibold shadow-xs
                  ${!isExpanded ? 'justify-center px-2' : ''}
                `}
              >
                <span className="menu-item-icon-size flex-shrink-0 text-[#548235]">
                  <Boxes size={20} />
                </span>
                {isExpanded && (
                  <div className="flex items-center justify-between flex-1">
                    <span className="text-sm font-semibold tracking-tight">All Projects</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#548235] text-white font-mono font-bold shadow-xs">
                      Hub
                    </span>
                  </div>
                )}
              </button>
            </li>
          )}
          {navItems.map((item, index) => (
            <li key={item.label}>
              <button
                onClick={() => handleNavClick(item, index)}
                title={!isExpanded ? item.label : undefined}
                className={`
                  menu-item group w-full text-left
                  ${isItemActive(item) ? 'menu-item-active' : 'menu-item-inactive'}
                  ${!isExpanded ? 'justify-center px-2' : ''}
                `}
              >
                <span className={`menu-item-icon-size flex-shrink-0 ${isItemActive(item) ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}`}>
                  {item.icon}
                </span>
                {isExpanded && (
                  <span className="flex-1 truncate text-sm">{item.label}</span>
                )}
                {isExpanded && item.expandable && item.subItems && (
                  <ChevronDown
                    size={16}
                    className={`flex-shrink-0 transition-transform duration-200 ${
                      openSubmenu === index
                        ? 'rotate-180 text-brand-500 dark:text-brand-400'
                        : 'text-gray-400 dark:text-gray-500'
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.subItems && isExpanded && (
                <div
                  ref={el => { subMenuRefs.current[index] = el; }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height: openSubmenu === index ? `${subMenuHeights[index] || 0}px` : '0px',
                  }}
                >
                  <ul className="mt-1 ml-9 space-y-0.5 pb-1">
                    {item.subItems.map(subItem => (
                      <li key={subItem}>
                        <button
                          onClick={() => onTabChange(subItem)}
                          className={`
                            menu-dropdown-item w-full text-left
                            ${activeTab === subItem ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}
                          `}
                        >
                          {subItem}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User Section */}
      <div className={`border-t border-gray-200 dark:border-gray-800 p-3 ${!isExpanded ? 'flex justify-center' : ''}`}>
        {isExpanded ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-sm text-white font-semibold">AG</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Abai Godara</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">abai.godara@transvolt.com</p>
            </div>
          </div>
        ) : (
          <div
            title="Abai Godara"
            className="w-9 h-9 bg-gradient-to-br from-brand-400 to-brand-600 rounded-full flex items-center justify-center cursor-pointer"
          >
            <span className="text-sm text-white font-semibold">AG</span>
          </div>
        )}
      </div>
    </aside>
  );
}
