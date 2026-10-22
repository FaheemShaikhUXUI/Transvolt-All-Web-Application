import { useState } from 'react';
import { 
  Users, 
  BatteryCharging, 
  TrendingUp, 
  Search, 
  Filter as FilterIcon, 
  Calendar as CalendarIcon, 
  Download, 
  MoreVertical, 
  ChevronRight, 
  ChevronDown,
  Navigation,
  Scale,
  MapPin,
  Maximize2
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// Radial progress circle component matching Figma design
interface RadialProgressProps {
  percentage: number;
  color?: string;
  trailColor?: string;
}

function RadialProgress({ percentage = 75, color = 'stroke-emerald-500', trailColor = 'stroke-red-400' }: RadialProgressProps) {
  const radius = 18;
  const stroke = 3;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-12 h-12">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
        <circle
          className={`${trailColor} opacity-20`}
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx="18"
          cy="18"
        />
        <circle
          className={`${color} transition-all duration-300`}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx="18"
          cy="18"
        />
      </svg>
      <span className="absolute text-[9px] font-bold text-gray-900">{percentage}%</span>
    </div>
  );
}

// Data mockups
const revenueData = [
  { name: 'Jan', target: 200, achieved: 190 },
  { name: 'Feb', target: 300, achieved: 240 },
  { name: 'Mar', target: 280, achieved: 290 },
  { name: 'Apr', target: 350, achieved: 320 },
  { name: 'May', target: 300, achieved: 280 },
  { name: 'Jun', target: 450, achieved: 410 },
  { name: 'Jul', target: 530, achieved: 480 }, // Highlights Jul: Target: 23.45L, Achieved: 21.05L
  { name: 'Aug', target: 480, achieved: 510 },
  { name: 'Sep', target: 420, achieved: 400 },
  { name: 'Oct', target: 510, achieved: 530 },
  { name: 'Nov', target: 620, achieved: 580 },
  { name: 'Dec', target: 580, achieved: 550 },
];

const materialPieData = [
  { name: 'LimeStone', value: 35, color: '#3b82f6' },
  { name: 'FlyAsh', value: 30, color: '#a855f7' },
  { name: 'Kinkara', value: 25, color: '#10b981' },
  { name: 'Other', value: 10, color: '#9ca3af' },
];

// Ledger data
const ledgerTransactions = [
  { sr: 1, date: '10-05-2026', vehicleNo: 'T75', tyNo: 'N/A', pilotName: 'Shubham Rai', pilotId: 'AM9568', shift: 'M1', pt: '06:16:00', performed: '08:30:00', travelTime: '00:32:00', containerNo: 'GM021915AC', moveType: 'MX', fromChd: 'N/A', toChd: 'N/A', age: 60, tcs: 20, startOdo: 2513, startSoc: '82%', endOdo: 3101, endSoc: 'N/A', totalSoc: 18.0, rate: '₹150.00', revenue: '₹3,000.00' },
  { sr: 2, date: '10-05-2026', vehicleNo: 'T75', tyNo: 'N/A', pilotName: 'Shubham Rai', pilotId: 'AM9568', shift: 'M1', pt: '06:16:00', performed: '08:30:00', travelTime: '00:32:00', containerNo: 'GM021915AC', moveType: 'MX', fromChd: 'N/A', toChd: 'N/A', age: 60, tcs: 20, startOdo: 2513, startSoc: '82%', endOdo: 3101, endSoc: 'N/A', totalSoc: 18.0, rate: '₹150.00', revenue: '₹5,000.00' },
  { sr: 3, date: '10-05-2026', vehicleNo: 'T75', tyNo: 'N/A', pilotName: 'Shubham Rai', pilotId: 'AM9568', shift: 'M1', pt: '06:16:00', performed: '08:30:00', travelTime: '00:32:00', containerNo: 'GM021915AC', moveType: 'MX', fromChd: 'N/A', toChd: 'N/A', age: 60, tcs: 20, startOdo: 2513, startSoc: '82%', endOdo: 3101, endSoc: 'N/A', totalSoc: 18.0, rate: '₹150.00', revenue: '₹5,000.00' },
  { sr: 4, date: '10-05-2026', vehicleNo: 'T75', tyNo: 'N/A', pilotName: 'Shubham Rai', pilotId: 'AM9568', shift: 'M1', pt: '06:16:00', performed: '08:30:00', travelTime: '00:32:00', containerNo: 'GM021915AC', moveType: 'MX', fromChd: 'N/A', toChd: 'N/A', age: 20, tcs: 20, startOdo: 3468, startSoc: '92%', endOdo: 3601, endSoc: 'N/A', totalSoc: 30.0, rate: '₹150.00', revenue: '₹5,000.00' },
  { sr: 5, date: '10-05-2026', vehicleNo: 'T75', tyNo: 'N/A', pilotName: 'Shubham Rai', pilotId: 'AM9568', shift: 'M1', pt: '06:16:00', performed: '08:30:00', travelTime: '00:32:00', containerNo: 'GM021915AC', moveType: 'MX', fromChd: 'N/A', toChd: 'N/A', age: 20, tcs: 20, startOdo: 3468, startSoc: '92%', endOdo: 3601, endSoc: 'N/A', totalSoc: 30.0, rate: '₹150.00', revenue: '₹5,000.00' },
  { sr: 6, date: '10-05-2026', vehicleNo: 'T75', tyNo: 'N/A', pilotName: 'Shubham Rai', pilotId: 'AM9568', shift: 'M1', pt: '06:16:00', performed: '08:30:00', travelTime: '00:32:00', containerNo: 'GM021915AC', moveType: 'MX', fromChd: 'N/A', toChd: 'N/A', age: 50, tcs: 40, startOdo: 3113, startSoc: '85%', endOdo: 3343, endSoc: 'N/A', totalSoc: 50.0, rate: '₹150.00', revenue: '₹5,000.00' },
  { sr: 7, date: '10-05-2026', vehicleNo: 'T75', tyNo: 'N/A', pilotName: 'Shubham Rai', pilotId: 'AM9568', shift: 'M1', pt: '06:16:00', performed: '08:30:00', travelTime: '00:32:00', containerNo: 'GM021915AC', moveType: 'MX', fromChd: 'N/A', toChd: 'N/A', age: 50, tcs: 40, startOdo: 3113, startSoc: '85%', endOdo: 3343, endSoc: 'N/A', totalSoc: 50.0, rate: '₹150.00', revenue: '₹5,000.00' },
  { sr: 8, date: '10-05-2026', vehicleNo: 'T75', tyNo: 'N/A', pilotName: 'Shubham Rai', pilotId: 'AM9568', shift: 'M1', pt: '06:16:00', performed: '08:30:00', travelTime: '00:32:00', containerNo: 'GM021915AC', moveType: 'MX', fromChd: 'N/A', toChd: 'N/A', age: 15, tcs: 40, startOdo: 3495, startSoc: '91%', endOdo: 3583, endSoc: 'N/A', totalSoc: 15.0, rate: '₹150.00', revenue: '₹5,000.00' },
  { sr: 9, date: '10-05-2026', vehicleNo: 'T75', tyNo: 'N/A', pilotName: 'Shubham Rai', pilotId: 'AM9568', shift: 'M1', pt: '06:16:00', performed: '08:30:00', travelTime: '00:32:00', containerNo: 'GM021915AC', moveType: 'MX', fromChd: 'N/A', toChd: 'N/A', age: 15, tcs: 40, startOdo: 3495, startSoc: '91%', endOdo: 3583, endSoc: 'N/A', totalSoc: 15.0, rate: '₹150.00', revenue: '₹5,000.00' },
  { sr: 10, date: '12-05-2026', vehicleNo: 'N/A', tyNo: 'T22', pilotName: 'N/A', pilotId: 'N/A', shift: 'N/A', pt: '03:46:00', performed: '03:53:00', travelTime: '00:07:00', containerNo: 'NYOU58307871', moveType: 'FO', fromChd: 'RTG27', toChd: 'RMGC12', age: 48, tcs: 2, startOdo: 'N/A', startSoc: 'N/A', endOdo: 'N/A', endSoc: 'N/A', totalSoc: 70.0, rate: '₹150.00', revenue: '₹300.00' }
];

export function MISReportDashboard() {
  const [activeSector, setActiveSector] = useState<'Depot' | 'Mine' | 'Port' | 'Cement'>('Mine');
  const [tripsShiftTab, setTripsShiftTab] = useState<'All' | 'A' | 'B' | 'C'>('All');
  const [pilotShiftTab, setPilotShiftTab] = useState<'All' | 'A' | 'B' | 'C'>('All');
  const [revenueShiftTab, setRevenueShiftTab] = useState<'All' | 'A' | 'B' | 'C'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Ledger filter states
  const [filters, setFilters] = useState({
    container: true,
    moveType: true,
    other: true,
    difference: true,
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header Filters & Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200">
        
        {/* Active Sector Switches (Depot, Mine, Port, Cement) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSector('Depot')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
              activeSector === 'Depot' 
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Depot: 4
          </button>
          <button
            onClick={() => setActiveSector('Mine')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
              activeSector === 'Mine' 
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Mine: 5
          </button>
          <button
            onClick={() => setActiveSector('Port')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
              activeSector === 'Port' 
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Port: 3
          </button>
          <button
            onClick={() => setActiveSector('Cement')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all ${
              activeSector === 'Cement' 
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-200' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
            }`}
          >
            Cement: 4
          </button>
        </div>

        {/* Right side filter controls */}
        <div className="flex flex-wrap items-center gap-3">
          
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Select Site</span>
            <select className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-700 outline-none focus:border-blue-500 cursor-pointer">
              <option>All Sites</option>
              <option>Site Alpha</option>
              <option>Site Beta</option>
            </select>
          </div>

          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
            <CalendarIcon className="w-3.5 h-3.5 text-gray-500" />
            <span>Date Filter</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          <button className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-medium text-gray-600 flex items-center gap-1.5 hover:bg-gray-50 transition-colors">
            <FilterIcon className="w-3.5 h-3.5 text-gray-500" />
            <span>Other Filter</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

        </div>
      </div>

      {/* SECTION 1: Trips / Kms / Tons */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Trips / Kms / Tons</h2>
          
          {/* Shift tabs */}
          <div className="bg-gray-100 p-0.5 rounded-lg flex items-center gap-0.5">
            {(['All', 'A', 'B', 'C'] as const).map((shift) => (
              <button
                key={shift}
                onClick={() => setTripsShiftTab(shift)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  tripsShiftTab === shift 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {shift === 'All' ? 'All Shift' : shift}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Trips Card */}
          <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-5 flex flex-col justify-between hover:shadow-sm transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-base font-bold text-gray-800">Trips</span>
              </div>
              <RadialProgress percentage={75} color="stroke-emerald-500" trailColor="stroke-red-400" />
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Assigned</span>
                <span className="text-gray-900 font-semibold">100</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2">
                <span className="text-gray-500 font-medium">Covered</span>
                <span className="text-blue-600 font-bold">90 | 90%</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2">
                <span className="text-gray-500 font-medium">Loss / Difference</span>
                <span className="text-red-500 font-bold">10 | 10%</span>
              </div>
            </div>
          </div>

          {/* Kms Card */}
          <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-5 flex flex-col justify-between hover:shadow-sm transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Navigation className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-base font-bold text-gray-800">Kms.</span>
              </div>
              <RadialProgress percentage={75} color="stroke-emerald-500" trailColor="stroke-red-400" />
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Assigned</span>
                <span className="text-gray-900 font-semibold">100</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2">
                <span className="text-gray-500 font-medium">Covered</span>
                <span className="text-blue-600 font-bold">90 | 90%</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2">
                <span className="text-gray-500 font-medium">Loss / Difference</span>
                <span className="text-red-500 font-bold">50 | 5%</span>
              </div>
            </div>
          </div>

          {/* Tons Card */}
          <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-5 flex flex-col justify-between hover:shadow-sm transition-all">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Scale className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-base font-bold text-gray-800">Tones</span>
              </div>
              <RadialProgress percentage={75} color="stroke-emerald-500" trailColor="stroke-red-400" />
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 font-medium">Assigned</span>
                <span className="text-gray-900 font-semibold">100</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2">
                <span className="text-gray-500 font-medium">Delivered</span>
                <span className="text-blue-600 font-bold">90 | 90%</span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2">
                <span className="text-gray-500 font-medium">Loss / Difference</span>
                <span className="text-red-500 font-bold">10 | 10%</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 2: Pilot / Charger */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Pilot / Charger</h2>
          
          {/* Shift tabs */}
          <div className="bg-gray-100 p-0.5 rounded-lg flex items-center gap-0.5">
            {(['All', 'A', 'B', 'C'] as const).map((shift) => (
              <button
                key={shift}
                onClick={() => setPilotShiftTab(shift)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  pilotShiftTab === shift 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {shift === 'All' ? 'All Shift' : shift}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          
          {/* Pilots card */}
          <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-5 flex flex-col justify-between hover:shadow-sm transition-all">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Users className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-base font-bold text-gray-800">Pilots</span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  ▲ 11.01%
                </span>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Total Pilots</span>
                  <span className="text-gray-900 font-semibold">100</span>
                </div>
                <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2">
                  <span className="text-gray-500 font-medium">Utilized</span>
                  <span className="text-emerald-600 font-bold">90 | 90%</span>
                </div>
                <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2">
                  <span className="text-gray-500 font-medium">Not Utilized</span>
                  <span className="text-red-500 font-bold">10 | 10%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Charger card */}
          <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-5 flex flex-col justify-between hover:shadow-sm transition-all">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
                    <BatteryCharging className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-base font-bold text-gray-800">Charger</span>
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-0.5">
                  ▲ 11.01%
                </span>
              </div>

              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 font-medium">Deployed</span>
                  <span className="text-gray-900 font-semibold">20 Nos.</span>
                </div>
                <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2">
                  <span className="text-gray-500 font-medium">Power Delivered</span>
                  <span className="text-emerald-600 font-bold">20,453.65 kWh</span>
                </div>
                <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-2">
                  <span className="text-gray-500 font-medium">Sessions Completed</span>
                  <span className="text-gray-900 font-semibold">23,453</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pilot with Most Tons Delivered card */}
          <div className="border border-gray-100 bg-gray-50/50 rounded-xl p-5 flex flex-col justify-between hover:shadow-sm transition-all">
            <div>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                Pilot with Most Tons Delivered
              </h3>

              <div className="space-y-3.5">
                {/* 1st */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                      1st
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">Sumit Kawalkar</h4>
                      <p className="text-xs text-gray-500">23045 Tons - of (Month)</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                    SK
                  </div>
                </div>

                {/* 2nd */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                      2nd
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">Prathamesh Shinde</h4>
                      <p className="text-xs text-gray-500">22045 Tons - of (Month)</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                    PS
                  </div>
                </div>

                {/* 3rd */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                      3rd
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-800">Saud Shaikh</h4>
                      <p className="text-xs text-gray-500">21045 Tons - of (Month)</p>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-xs">
                    SS
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700 mt-4">
              Show More
            </button>
          </div>

        </div>
      </div>

      {/* SECTION 3: Revenue Board */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900">Revenue Board</h2>
          
          {/* Shift tabs */}
          <div className="bg-gray-100 p-0.5 rounded-lg flex items-center gap-0.5">
            {(['All', 'A', 'B', 'C'] as const).map((shift) => (
              <button
                key={shift}
                onClick={() => setRevenueShiftTab(shift)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                  revenueShiftTab === shift 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {shift === 'All' ? 'All Shift' : shift}
              </button>
            ))}
          </div>
        </div>

        {/* 2 Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Target Vs Achieved Chart (2/3 width) */}
          <div className="lg:col-span-2 border border-gray-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Target Vs Achieved</h3>
                
                <div className="flex items-center gap-2">
                  <select className="px-2 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 outline-none cursor-pointer">
                    <option>Last 12 Months</option>
                    <option>Last 6 Months</option>
                  </select>
                  <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Chart container */}
              <div className="h-72 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorAchieved" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} domain={[0, 1000]} />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          // Highlighting July custom styles
                          const label = payload[0].payload.name;
                          const isJuly = label === 'Jul';
                          return (
                            <div className="bg-white p-3 border border-gray-200 rounded-xl shadow-lg space-y-1">
                              <p className="text-xs font-bold text-gray-700">{label}</p>
                              <div className="flex items-center gap-1.5 text-xs">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                <span className="text-gray-500">Target Revenue:</span>
                                <span className="font-bold text-purple-700">{isJuly ? '23.45 L' : `${payload[0].value} L`}</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs">
                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                <span className="text-gray-500">Target Achieved:</span>
                                <span className="font-bold text-emerald-700">{isJuly ? '21.05 L' : `${payload[1].value} L`}</span>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area type="monotone" dataKey="target" stroke="#a855f7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTarget)" />
                    <Area type="monotone" dataKey="achieved" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAchieved)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-4 mt-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                  <span>Target Revenue</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span>Target Achieved</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 text-xs text-gray-400">
              <span>Data updated 5 minutes ago</span>
              <a href="#" className="font-semibold text-blue-600 hover:underline flex items-center gap-0.5">
                <span>View Detailed Report</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Revenue by Materials (1/3 width) */}
          <div className="border border-gray-200 rounded-xl p-5 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Revenue by Materials in Lacs</h3>
              
              {/* Donut chart */}
              <div className="h-40 w-full relative flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={materialPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={65}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {materialPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center text */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Materials</span>
                </div>
              </div>

              {/* Table breakdown */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-[10px] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-400 uppercase tracking-wider font-semibold">
                      <th className="pb-1.5 font-semibold">Materials</th>
                      <th className="pb-1.5 text-center font-semibold">Target</th>
                      <th className="pb-1.5 text-center font-semibold">Achieved</th>
                      <th className="pb-1.5 text-center font-semibold">Difference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {/* Limestone */}
                    <tr className="text-gray-600">
                      <td className="py-2 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span>LimeStone</span>
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        <div>Tns: 100</div>
                        <div className="text-[9px] font-bold text-indigo-700">₹L: 5.50</div>
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        <div>Tns: 80</div>
                        <div className="text-[9px] font-bold text-emerald-600">₹L: 4.50</div>
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        <div>Tns: 10</div>
                        <div className="text-[9px] font-bold text-red-500">₹L: 01.00</div>
                      </td>
                    </tr>
                    {/* FlyAsh */}
                    <tr className="text-gray-600">
                      <td className="py-2 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                        <span>FlyAsh</span>
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        <div>Tns: 100</div>
                        <div className="text-[9px] font-bold text-indigo-700">₹L: 5.50</div>
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        <div>Tns: 100</div>
                        <div className="text-[9px] font-bold text-emerald-600">₹L: 5.50</div>
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        <div>Tns: 100</div>
                        <div className="text-[9px] font-bold text-red-500">₹L: 5.50</div>
                      </td>
                    </tr>
                    {/* Kinkara */}
                    <tr className="text-gray-600">
                      <td className="py-2 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span>Kinkara</span>
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        <div>Tns: 100</div>
                        <div className="text-[9px] font-bold text-indigo-700">₹L: 5.50</div>
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        <div>Tns: 100</div>
                        <div className="text-[9px] font-bold text-emerald-600">₹L: 5.50</div>
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        <div>Tns: 100</div>
                        <div className="text-[9px] font-bold text-red-500">₹L: 5.50</div>
                      </td>
                    </tr>
                    {/* Other */}
                    <tr className="text-gray-600">
                      <td className="py-2 flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                        <span>Other</span>
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        <div>Tns: 100</div>
                        <div className="text-[9px] font-bold text-indigo-700">₹L: 5.50</div>
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        <div>Tns: 100</div>
                        <div className="text-[9px] font-bold text-emerald-600">₹L: 5.50</div>
                      </td>
                      <td className="py-2 text-center text-gray-500">
                        <div>Tns: 100</div>
                        <div className="text-[9px] font-bold text-red-500">₹L: 5.50</div>
                      </td>
                    </tr>
                    {/* Total */}
                    <tr className="font-bold text-gray-900 bg-gray-50">
                      <td className="py-2 pl-1.5">Total</td>
                      <td className="py-2 text-center">
                        <div>Tns: 100</div>
                        <div className="text-[9px] text-indigo-700">₹L: 5.50</div>
                      </td>
                      <td className="py-2 text-center">
                        <div>Tns: 100</div>
                        <div className="text-[9px] text-emerald-600">₹L: 5.50</div>
                      </td>
                      <td className="py-2 text-center">
                        <div>Tns: 100</div>
                        <div className="text-[9px] text-red-500">₹L: 5.50</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 4: Detailed Transaction Ledger */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        
        {/* Section Header Controls */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-gray-900">Detailed Transaction Ledger</h2>
          
          {/* Checkboxes + Search + Buttons */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 xl:gap-3 flex-1 xl:justify-end">
            
            {/* Filter Checkboxes */}
            <div className="flex flex-wrap items-center gap-3.5">
              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-blue-600">
                <input 
                  type="checkbox" 
                  checked={filters.container} 
                  onChange={(e) => setFilters(prev => ({ ...prev, container: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                />
                <span>Container</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-emerald-600">
                <input 
                  type="checkbox" 
                  checked={filters.moveType} 
                  onChange={(e) => setFilters(prev => ({ ...prev, moveType: e.target.checked }))}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <span>Move Type</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-yellow-600">
                <input 
                  type="checkbox" 
                  checked={filters.other} 
                  onChange={(e) => setFilters(prev => ({ ...prev, other: e.target.checked }))}
                  className="rounded border-gray-300 text-yellow-600 focus:ring-yellow-500 w-3.5 h-3.5"
                />
                <span>Other</span>
              </label>

              <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-red-500">
                <input 
                  type="checkbox" 
                  checked={filters.difference} 
                  onChange={(e) => setFilters(prev => ({ ...prev, difference: e.target.checked }))}
                  className="rounded border-gray-300 text-red-500 focus:ring-red-500 w-3.5 h-3.5"
                />
                <span>Difference</span>
              </label>
            </div>

            {/* Search Input and action buttons */}
            <div className="flex flex-wrap items-center gap-2 flex-1 md:flex-initial md:justify-end">
              <div className="relative flex-1 md:w-48 max-w-xs">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs outline-none focus:border-blue-500 focus:bg-white transition-colors w-full"
                />
              </div>

              <button className="p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                <FilterIcon className="w-3.5 h-3.5 text-gray-500" />
                <span>Filter</span>
              </button>

              <button className="p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-gray-500" />
                <span>Date Filter</span>
              </button>

              <button className="p-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-gray-500" />
                <span>Download</span>
              </button>
            </div>

          </div>
        </div>

        {/* Ledger Table Container */}
        <div className="overflow-x-auto border border-gray-200 rounded-xl max-w-full shadow-sm">
          <table className="w-full text-left border-collapse min-w-[2000px]">
            <thead>
              <tr className="bg-gray-50 text-[10px] text-gray-500 uppercase tracking-wider border-b border-gray-200 font-bold">
                <th className="py-3 px-3.5 text-center font-bold">SR.</th>
                <th className="py-3 px-3.5 font-bold">DATE</th>
                <th className="py-3 px-3.5 font-bold">VEHICLE NO.</th>
                <th className="py-3 px-3.5 font-bold">TY-NO.</th>
                <th className="py-3 px-3.5 font-bold">PILOT NAME</th>
                <th className="py-3 px-3.5 font-bold">PILOT ID</th>
                <th className="py-3 px-3.5 text-center font-bold">SHIFT</th>
                <th className="py-3 px-3.5 text-center font-bold">F-T(HH:MM)</th>
                <th className="py-3 px-3.5 text-center font-bold">PERFORMED</th>
                <th className="py-3 px-3.5 text-center font-bold">TRAVEL TIME</th>
                <th className="py-3 px-3.5 font-bold">CONTAINER NO.</th>
                <th className="py-3 px-3.5 text-center font-bold">MOVE TYPE</th>
                <th className="py-3 px-3.5 font-bold">FROM C-D</th>
                <th className="py-3 px-3.5 font-bold">TO C-D</th>
                <th className="py-3 px-3.5 text-center font-bold">AGE</th>
                <th className="py-3 px-3.5 text-center font-bold">TCS</th>
                <th className="py-3 px-3.5 text-center font-bold">START ODO</th>
                <th className="py-3 px-3.5 text-center font-bold">START SOC</th>
                <th className="py-3 px-3.5 text-center font-bold">END ODO</th>
                <th className="py-3 px-3.5 text-center font-bold">END SOC</th>
                <th className="py-3 px-3.5 text-center font-bold">TOTAL SOC</th>
                <th className="py-3 px-3.5 text-right font-bold">RATE/KM (₹)</th>
                <th className="py-3 px-3.5 text-right font-bold">REVENUE (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-xs font-semibold text-gray-700">
              {ledgerTransactions.map((row) => (
                <tr key={row.sr} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-3.5 text-center font-bold text-gray-400">{row.sr}</td>
                  <td className="py-3 px-3.5 text-gray-500">{row.date}</td>
                  <td className="py-3 px-3.5 font-bold text-gray-950">{row.vehicleNo}</td>
                  <td className="py-3 px-3.5 text-gray-400">{row.tyNo}</td>
                  <td className="py-3 px-3.5 font-bold text-gray-900">{row.pilotName}</td>
                  <td className="py-3 px-3.5 text-gray-500">{row.pilotId}</td>
                  <td className="py-3 px-3.5 text-center">
                    <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded text-[10px] font-bold border border-amber-100">
                      {row.shift}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-center text-gray-500 font-mono">{row.pt}</td>
                  <td className="py-3 px-3.5 text-center text-gray-500 font-mono">{row.performed}</td>
                  <td className="py-3 px-3.5 text-center text-gray-900 font-mono font-bold">{row.travelTime}</td>
                  <td className="py-3 px-3.5 font-mono text-indigo-600 font-bold">{row.containerNo}</td>
                  <td className="py-3 px-3.5 text-center">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100">
                      {row.moveType}
                    </span>
                  </td>
                  <td className="py-3 px-3.5 text-gray-400">{row.fromChd}</td>
                  <td className="py-3 px-3.5 text-gray-400">{row.toChd}</td>
                  <td className="py-3 px-3.5 text-center text-gray-600">{row.age}</td>
                  <td className="py-3 px-3.5 text-center text-gray-600">{row.tcs}</td>
                  <td className="py-3 px-3.5 text-center font-mono">{row.startOdo}</td>
                  <td className="py-3 px-3.5 text-center text-indigo-600 font-bold">{row.startSoc}</td>
                  <td className="py-3 px-3.5 text-center font-mono">{row.endOdo}</td>
                  <td className="py-3 px-3.5 text-center text-gray-400 font-mono">{row.endSoc}</td>
                  <td className="py-3 px-3.5 text-center font-bold text-gray-900">{row.totalSoc}</td>
                  <td className="py-3 px-3.5 text-right font-mono text-gray-500">{row.rate}</td>
                  <td className="py-3 px-3.5 text-right font-mono font-bold text-emerald-600">{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Ledger Table Pagination Footer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-3 text-xs text-gray-500">
          <div>
            Showing 1 to 10 of 1276 entries
          </div>

          <div className="flex items-center gap-4">
            <span className="font-semibold text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-200">
              Count 3
            </span>
            
            {/* Pagination Controls */}
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500 disabled:opacity-50" disabled>
                &larr;
              </button>
              <button className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">
                1
              </button>
              <button className="w-7 h-7 rounded-lg hover:bg-gray-50 border border-transparent text-gray-600 flex items-center justify-center">
                2
              </button>
              <button className="w-7 h-7 rounded-lg hover:bg-gray-50 border border-transparent text-gray-600 flex items-center justify-center">
                3
              </button>
              <button className="w-7 h-7 rounded-lg hover:bg-gray-50 border border-transparent text-gray-600 flex items-center justify-center">
                4
              </button>
              <button className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-500">
                &rarr;
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
