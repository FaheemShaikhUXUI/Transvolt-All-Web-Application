import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { PublicSectorDashboard } from './components/dashboards/PublicSectorDashboard';
import { MineSectorDashboard } from './components/dashboards/MineSectorDashboard';
import { PortSectorDashboard } from './components/dashboards/PortSectorDashboard';
import { CementSectorDashboard } from './components/dashboards/CementSectorDashboard';
import { MISReportDashboard } from './components/dashboards/MISReportDashboard';
import { ChevronRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('MIS Report');
  const [currentSector, setCurrentSector] = useState('Public Sector');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const sidebarWidth = isSidebarCollapsed ? 72 : 260;

  const renderDashboard = () => {
    if (activeTab === 'MIS Report') {
      return <MISReportDashboard />;
    }

    // Sector-level from sidebar sub-items
    const sectorMap: Record<string, string> = {
      'Public Sector': 'Public Sector',
      'Mine Sector': 'Mine Sector',
      'Port Sector': 'Port Sector',
      'Cement Sector': 'Cement Sector',
    };

    const sector = sectorMap[activeTab] || currentSector;

    switch (sector) {
      case 'Public Sector':
        return <PublicSectorDashboard />;
      case 'Mine Sector':
        return <MineSectorDashboard />;
      case 'Port Sector':
        return <PortSectorDashboard />;
      case 'Cement Sector':
        return <CementSectorDashboard />;
      default:
        return <PublicSectorDashboard />;
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const sectorMap: Record<string, string> = {
      'Public Sector': 'Public Sector',
      'Mine Sector': 'Mine Sector',
      'Port Sector': 'Port Sector',
      'Cement Sector': 'Cement Sector',
    };
    if (sectorMap[tab]) {
      setCurrentSector(sectorMap[tab]);
    }
  };

  return (
    <div className={`flex h-screen bg-gray-50 ${isDark ? 'dark' : ''}`}>
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isDark={isDark}
      />

      {/* Main Content — offset by sidebar width */}
      <div
        className="flex flex-col flex-1 overflow-hidden transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        {/* Header */}
        <Header
          currentSector={currentSector}
          onSectorChange={setCurrentSector}
          showFilters={activeTab !== 'MIS Report'}
          isDark={isDark}
          onToggleDark={() => setIsDark(!isDark)}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-950">
          <div className="p-6">
            {/* Page Title */}
            {activeTab === 'MIS Report' ? (
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">MIS Dashboard</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    Real-time operational MIS reporting for Transvolt Mobility
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer transition-all">
                  <span>MIS Reports</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {activeTab} Dashboard
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                  Real-time operational MIS reporting for Transvolt Mobility
                </p>
              </div>
            )}

            {/* Dashboard Content */}
            {renderDashboard()}
          </div>
        </div>
      </div>

      {/* Dark mode overlay for correct background */}
      {isDark && (
        <style>{`
          .dark {
            color-scheme: dark;
          }
        `}</style>
      )}
    </div>
  );
}
