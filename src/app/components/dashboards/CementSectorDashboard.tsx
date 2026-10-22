import { KPICard } from '../KPICard';
import { ChartCard } from '../ChartCard';
import { StatusBadge } from '../StatusBadge';
import { Truck, BatteryCharging, User, Clock, TrendingUp, Package } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const shiftData = [
  { name: 'Shift A', assigned: 680, dispatched: 665, pending: 15 },
  { name: 'Shift B', assigned: 750, dispatched: 735, pending: 15 },
  { name: 'Shift C', assigned: 620, dispatched: 608, pending: 12 },
];

const dispatchData = [
  { name: 'Dispatched', value: 2008, color: '#10b981' },
  { name: 'Pending', value: 42, color: '#f59e0b' },
];

const efficiencyData = [
  { name: 'Mon', dispatch: 1850, trips: 128, efficiency: 91 },
  { name: 'Tue', dispatch: 1920, trips: 132, efficiency: 93 },
  { name: 'Wed', dispatch: 2050, trips: 138, efficiency: 94 },
  { name: 'Thu', dispatch: 1980, trips: 135, efficiency: 93 },
  { name: 'Fri', dispatch: 2100, trips: 142, efficiency: 95 },
  { name: 'Sat', dispatch: 1780, trips: 125, efficiency: 92 },
  { name: 'Sun', dispatch: 1520, trips: 108, efficiency: 89 },
];

const routePerformanceData = [
  { route: 'Route A - Plant to Site 1', trips: 45, avgTime: 32, dispatch: 675, status: 'Good' },
  { route: 'Route B - Plant to Site 2', trips: 38, avgTime: 28, dispatch: 570, status: 'Excellent' },
  { route: 'Route C - Plant to Site 3', trips: 52, avgTime: 42, dispatch: 780, status: 'Good' },
  { route: 'Route D - Plant to Depot', trips: 28, avgTime: 25, dispatch: 420, status: 'Excellent' },
  { route: 'Route E - Plant to Site 4', trips: 35, avgTime: 38, dispatch: 525, status: 'Good' },
];

export function CementSectorDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-4">
        <KPICard
          title="Total Vehicles"
          value="72"
          subtitle="Active: 68 (94%)"
          icon={Truck}
          color="blue"
          trend={{ value: '+5%', isPositive: true }}
        />
        <KPICard
          title="Total Chargers"
          value="28"
          subtitle="Utilized: 25 (89%)"
          icon={BatteryCharging}
          color="green"
        />
        <KPICard
          title="Active Pilots"
          value="58"
          subtitle="On Shift: 54 (93%)"
          icon={User}
          color="purple"
        />
        <KPICard
          title="Operating Hours"
          value="1,248"
          subtitle="This Week"
          icon={Clock}
          color="yellow"
        />
        <KPICard
          title="Fleet Utilization"
          value="93%"
          subtitle="Target: 87%"
          icon={TrendingUp}
          color="green"
          trend={{ value: '+6%', isPositive: true }}
        />
        <KPICard
          title="Dispatch Efficiency"
          value="95%"
          subtitle="Target: 90%"
          icon={Package}
          color="blue"
          trend={{ value: '+5%', isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Shift-wise Dispatch */}
        <div className="col-span-8">
          <ChartCard title="Shift-wise Cement Dispatch (Tonnes)">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shiftData} id="cement-shift-bar-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="assigned" name="Assigned (T)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dispatched" name="Dispatched (T)" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending (T)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Dispatch Overview */}
        <div className="col-span-4">
          <ChartCard title="Total Dispatch (Week)" height="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart id="cement-dispatch-pie-chart">
                <Pie
                  data={dispatchData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}T`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dispatchData.map((entry, index) => (
                    <Cell key={`dispatch-${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Weekly Efficiency Trend */}
        <div className="col-span-12">
          <ChartCard title="Weekly Dispatch Performance & Efficiency">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData} id="cement-efficiency-line-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="dispatch" name="Cement Dispatched (T)" stroke="#10b981" strokeWidth={3} />
                <Line yAxisId="left" type="monotone" dataKey="trips" name="Trips Completed" stroke="#3b82f6" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Efficiency %" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Route Performance */}
        <div className="col-span-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Route Performance Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Route</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Trips</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Avg Time (min)</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Dispatch (T)</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">T/Trip</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {routePerformanceData.map((route) => (
                    <tr key={route.route} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{route.route}</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-700">{route.trips}</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-700">{route.avgTime} min</td>
                      <td className="py-3 px-4 text-sm text-right font-semibold text-blue-600">{route.dispatch}T</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-700">
                        {(route.dispatch / route.trips).toFixed(1)}T
                      </td>
                      <td className="py-3 px-4 text-center">
                        <StatusBadge
                          label={route.status}
                          variant={route.status === 'Excellent' ? 'success' : 'info'}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="col-span-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Additional Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Avg Dispatch/Vehicle</span>
                <span className="text-sm font-semibold text-gray-900">29.5T</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Plant Loading Time</span>
                <span className="text-sm font-semibold text-blue-600">14.2 min</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Avg Trip Time</span>
                <span className="text-sm font-semibold text-gray-900">33 min</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Total Idle Time</span>
                <span className="text-sm font-semibold text-yellow-600">98 hrs</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Delay Incidents</span>
                <span className="text-sm font-semibold text-red-600">6</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">On-Time Dispatch</span>
                <span className="text-sm font-semibold text-green-600">97.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Route Optimization Score</span>
                <span className="text-sm font-semibold text-blue-600">92/100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="col-span-12">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Weekly Performance Summary</h3>
            <div className="grid grid-cols-5 gap-6">
              <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <p className="text-2xl font-bold text-emerald-700">2,100T</p>
                <p className="text-sm text-gray-600 mt-1">Peak Day (Friday)</p>
                <StatusBadge label="Best Performance" variant="success" />
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-2xl font-bold text-blue-700">Route B</p>
                <p className="text-sm text-gray-600 mt-1">Fastest Route</p>
                <StatusBadge label="28 min avg" variant="info" />
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">97.9%</p>
                <p className="text-sm text-gray-600 mt-1">Dispatch Success</p>
                <StatusBadge label="Excellent" variant="success" />
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <p className="text-2xl font-bold text-yellow-700">14.2 min</p>
                <p className="text-sm text-gray-600 mt-1">Plant Loading Time</p>
                <StatusBadge label="Optimal" variant="warning" />
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-2xl font-bold text-purple-700">Shift B</p>
                <p className="text-sm text-gray-600 mt-1">Top Shift</p>
                <StatusBadge label="750T Assigned" variant="info" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
