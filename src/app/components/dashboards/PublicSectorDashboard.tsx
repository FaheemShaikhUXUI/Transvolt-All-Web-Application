import { KPICard } from '../KPICard';
import { ChartCard } from '../ChartCard';
import { StatusBadge } from '../StatusBadge';
import { Truck, BatteryCharging, User, Clock, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const operationsData = [
  { name: 'Mon', assigned: 45, covered: 42, missed: 3 },
  { name: 'Tue', assigned: 48, covered: 46, missed: 2 },
  { name: 'Wed', assigned: 50, covered: 47, missed: 3 },
  { name: 'Thu', assigned: 52, covered: 50, missed: 2 },
  { name: 'Fri', assigned: 55, covered: 53, missed: 2 },
  { name: 'Sat', assigned: 40, covered: 38, missed: 2 },
  { name: 'Sun', assigned: 35, covered: 34, missed: 1 },
];

const tripsData = [
  { name: 'Assigned', value: 320, color: '#3b82f6' },
  { name: 'Completed', value: 298, color: '#10b981' },
  { name: 'Missed', value: 22, color: '#ef4444' },
];

const cleaningData = [
  { name: 'Cleaned', value: 85, color: '#10b981' },
  { name: 'Uncleaned', value: 15, color: '#f59e0b' },
];

const energyData = [
  { name: 'Mon', charger: 450, vehicle: 380, efficiency: 84 },
  { name: 'Tue', charger: 480, vehicle: 410, efficiency: 85 },
  { name: 'Wed', charger: 520, vehicle: 445, efficiency: 86 },
  { name: 'Thu', charger: 510, vehicle: 435, efficiency: 85 },
  { name: 'Fri', charger: 550, vehicle: 475, efficiency: 86 },
  { name: 'Sat', charger: 420, vehicle: 360, efficiency: 86 },
  { name: 'Sun', charger: 380, vehicle: 320, efficiency: 84 },
];

const incidentsData = [
  { name: 'Blameworthy', value: 12, color: '#ef4444' },
  { name: 'Non-Blameworthy', value: 28, color: '#3b82f6' },
];

export function PublicSectorDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-4">
        <KPICard
          title="Total Vehicles"
          value="120"
          subtitle="Utilized: 98 (82%)"
          icon={Truck}
          color="blue"
          trend={{ value: '+5%', isPositive: true }}
        />
        <KPICard
          title="Total Chargers"
          value="45"
          subtitle="Active: 38 (84%)"
          icon={BatteryCharging}
          color="green"
          trend={{ value: '+2%', isPositive: true }}
        />
        <KPICard
          title="Active Pilots"
          value="85"
          subtitle="On Duty: 72 (85%)"
          icon={User}
          color="purple"
        />
        <KPICard
          title="Operating Hours"
          value="1,845"
          subtitle="This Week"
          icon={Clock}
          color="yellow"
        />
        <KPICard
          title="Fleet Availability"
          value="94%"
          subtitle="Target: 90%"
          icon={TrendingUp}
          color="green"
          trend={{ value: '+4%', isPositive: true }}
        />
        <KPICard
          title="Schedule Adherence"
          value="92%"
          subtitle="Target: 90%"
          icon={Calendar}
          color="blue"
          trend={{ value: '+2%', isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Operations Schedule */}
        <div className="col-span-8">
          <ChartCard title="Operations Schedule - Weekly Overview">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={operationsData} id="operations-bar-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="assigned" name="Assigned" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="covered" name="Covered" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="missed" name="Missed" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Trips Overview */}
        <div className="col-span-4">
          <ChartCard title="Trips Overview" height="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart id="trips-pie-chart">
                <Pie
                  data={tripsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tripsData.map((entry, index) => (
                    <Cell key={`trips-${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Energy Consumption */}
        <div className="col-span-8">
          <ChartCard title="Energy Consumption & Efficiency">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={energyData} id="energy-line-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="charger" name="Charger (kWh)" stroke="#3b82f6" strokeWidth={2} />
                <Line yAxisId="left" type="monotone" dataKey="vehicle" name="Vehicle (kWh)" stroke="#10b981" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Efficiency (%)" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Cleaning Status */}
        <div className="col-span-4">
          <ChartCard title="Cleaning Status" height="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart id="cleaning-pie-chart">
                <Pie
                  data={cleaningData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cleaningData.map((entry, index) => (
                    <Cell key={`cleaning-${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Financial Overview */}
        <div className="col-span-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Financial Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Repair Cost</span>
                <span className="text-sm font-semibold text-red-600">₹2,45,000</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Claim Received</span>
                <span className="text-sm font-semibold text-green-600">₹3,10,000</span>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold text-gray-900">Net Difference</span>
                <span className="text-lg font-bold text-green-600">+₹65,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory */}
        <div className="col-span-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Inventory Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Total Stock Value</span>
                <span className="text-sm font-semibold text-gray-900">₹18,50,000</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Utilized</span>
                <span className="text-sm font-semibold text-blue-600">₹12,30,000</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Available</span>
                <span className="text-sm font-semibold text-green-600">₹5,80,000</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Damaged</span>
                <span className="text-sm font-semibold text-red-600">₹40,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Incidents */}
        <div className="col-span-4">
          <ChartCard title="Incidents Breakdown" height="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart id="incidents-pie-chart">
                <Pie
                  data={incidentsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {incidentsData.map((entry, index) => (
                    <Cell key={`incidents-${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Additional Insights */}
        <div className="col-span-12">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Key Performance Insights</h3>
            <div className="grid grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">4.2 hrs</p>
                <p className="text-sm text-gray-600 mt-1">Avg Vehicle Downtime</p>
                <StatusBadge label="Good" variant="success" />
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">2.8 hrs</p>
                <p className="text-sm text-gray-600 mt-1">Avg Charger Downtime</p>
                <StatusBadge label="Excellent" variant="success" />
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">96%</p>
                <p className="text-sm text-gray-600 mt-1">SLA Compliance</p>
                <StatusBadge label="On Target" variant="success" />
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">42.5 T</p>
                <p className="text-sm text-gray-600 mt-1">CO2 Savings (This Month)</p>
                <StatusBadge label="Impact High" variant="info" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
