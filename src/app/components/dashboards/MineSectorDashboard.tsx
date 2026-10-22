import { KPICard } from '../KPICard';
import { ChartCard } from '../ChartCard';
import { StatusBadge } from '../StatusBadge';
import { Truck, BatteryCharging, User, Clock, TrendingUp, Package2 } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const shiftData = [
  { name: 'Shift A', assigned: 850, delivered: 820, pending: 30 },
  { name: 'Shift B', assigned: 920, delivered: 895, pending: 25 },
  { name: 'Shift C', assigned: 780, delivered: 765, pending: 15 },
];

const tonnesData = [
  { name: 'Delivered', value: 2480, color: '#10b981' },
  { name: 'Pending', value: 70, color: '#f59e0b' },
];

const efficiencyData = [
  { name: 'Mon', tonnes: 2200, trips: 145, efficiency: 92 },
  { name: 'Tue', tonnes: 2350, trips: 152, efficiency: 94 },
  { name: 'Wed', tonnes: 2480, trips: 158, efficiency: 95 },
  { name: 'Thu', tonnes: 2420, trips: 155, efficiency: 94 },
  { name: 'Fri', tonnes: 2550, trips: 162, efficiency: 96 },
  { name: 'Sat', tonnes: 2180, trips: 142, efficiency: 93 },
  { name: 'Sun', tonnes: 1850, trips: 125, efficiency: 90 },
];

const vehiclePerformanceData = [
  { vehicle: 'EV-001', tonnes: 185, hours: 18, breakdown: 0 },
  { vehicle: 'EV-002', tonnes: 178, hours: 17, breakdown: 1 },
  { vehicle: 'EV-003', tonnes: 192, hours: 19, breakdown: 0 },
  { vehicle: 'EV-004', tonnes: 165, hours: 16, breakdown: 2 },
  { vehicle: 'EV-005', tonnes: 188, hours: 18, breakdown: 0 },
];

export function MineSectorDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-4">
        <KPICard
          title="Total Vehicles"
          value="85"
          subtitle="Active: 78 (92%)"
          icon={Truck}
          color="blue"
          trend={{ value: '+3%', isPositive: true }}
        />
        <KPICard
          title="Total Chargers"
          value="32"
          subtitle="Utilized: 28 (88%)"
          icon={BatteryCharging}
          color="green"
        />
        <KPICard
          title="Active Pilots"
          value="68"
          subtitle="On Shift: 62 (91%)"
          icon={User}
          color="purple"
        />
        <KPICard
          title="Operating Hours"
          value="1,456"
          subtitle="This Week"
          icon={Clock}
          color="yellow"
        />
        <KPICard
          title="Fleet Utilization"
          value="91%"
          subtitle="Target: 85%"
          icon={TrendingUp}
          color="green"
          trend={{ value: '+6%', isPositive: true }}
        />
        <KPICard
          title="Shift Efficiency"
          value="94%"
          subtitle="All Shifts Avg"
          icon={Package2}
          color="blue"
          trend={{ value: '+4%', isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Shift-wise Tonnes */}
        <div className="col-span-8">
          <ChartCard title="Shift-wise Tonnes Performance">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shiftData} id="mine-shift-bar-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="assigned" name="Assigned (Tonnes)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delivered" name="Delivered (Tonnes)" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending (Tonnes)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Tonnes Overview */}
        <div className="col-span-4">
          <ChartCard title="Total Tonnes (Week)" height="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart id="mine-tonnes-pie-chart">
                <Pie
                  data={tonnesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}T`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tonnesData.map((entry, index) => (
                    <Cell key={`tonnes-${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Weekly Efficiency Trend */}
        <div className="col-span-12">
          <ChartCard title="Weekly Performance & Efficiency Trend">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={efficiencyData} id="mine-efficiency-line-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="tonnes" name="Tonnes Delivered" stroke="#10b981" strokeWidth={3} />
                <Line yAxisId="left" type="monotone" dataKey="trips" name="Trips Completed" stroke="#3b82f6" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Efficiency %" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Vehicle Performance Table */}
        <div className="col-span-8">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Top Vehicle Performance (This Week)</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Vehicle ID</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Tonnes Delivered</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Operating Hours</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">T/Hour</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Breakdowns</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiclePerformanceData.map((vehicle) => (
                    <tr key={vehicle.vehicle} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">{vehicle.vehicle}</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-700">{vehicle.tonnes}T</td>
                      <td className="py-3 px-4 text-sm text-right text-gray-700">{vehicle.hours}h</td>
                      <td className="py-3 px-4 text-sm text-right font-semibold text-blue-600">
                        {(vehicle.tonnes / vehicle.hours).toFixed(1)}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-gray-700">{vehicle.breakdown}</td>
                      <td className="py-3 px-4 text-center">
                        <StatusBadge
                          label={vehicle.breakdown === 0 ? 'Excellent' : vehicle.breakdown === 1 ? 'Good' : 'Attention'}
                          variant={vehicle.breakdown === 0 ? 'success' : vehicle.breakdown === 1 ? 'warning' : 'error'}
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
                <span className="text-sm text-gray-600">Avg Tonnes/Vehicle</span>
                <span className="text-sm font-semibold text-gray-900">181.6T</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Avg Tonnes/Hour</span>
                <span className="text-sm font-semibold text-blue-600">10.1T</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Total Idle Time</span>
                <span className="text-sm font-semibold text-yellow-600">142 hrs</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Breakdown Count</span>
                <span className="text-sm font-semibold text-red-600">3</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Maintenance Downtime</span>
                <span className="text-sm font-semibold text-gray-900">28 hrs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Safety Incidents</span>
                <span className="text-sm font-semibold text-green-600">0</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="col-span-12">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Weekly Performance Summary</h3>
            <div className="grid grid-cols-5 gap-6">
              <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <p className="text-2xl font-bold text-emerald-700">2,550T</p>
                <p className="text-sm text-gray-600 mt-1">Peak Day (Friday)</p>
                <StatusBadge label="Best Performance" variant="success" />
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-2xl font-bold text-blue-700">Shift B</p>
                <p className="text-sm text-gray-600 mt-1">Most Productive</p>
                <StatusBadge label="Top Shift" variant="info" />
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">97.3%</p>
                <p className="text-sm text-gray-600 mt-1">Delivery Success Rate</p>
                <StatusBadge label="Excellent" variant="success" />
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <p className="text-2xl font-bold text-yellow-700">3.8%</p>
                <p className="text-sm text-gray-600 mt-1">Avg Idle Time</p>
                <StatusBadge label="Optimal" variant="warning" />
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-2xl font-bold text-purple-700">EV-003</p>
                <p className="text-sm text-gray-600 mt-1">Star Performer</p>
                <StatusBadge label="192T Delivered" variant="info" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
