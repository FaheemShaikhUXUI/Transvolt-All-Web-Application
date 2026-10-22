import { KPICard } from '../KPICard';
import { ChartCard } from '../ChartCard';
import { StatusBadge } from '../StatusBadge';
import { Truck, BatteryCharging, User, Clock, TrendingUp, Container } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const shiftData = [
  { name: 'Shift A', assigned: 420, delivered: 410, pending: 10 },
  { name: 'Shift B', assigned: 480, delivered: 465, pending: 15 },
  { name: 'Shift C', assigned: 390, delivered: 382, pending: 8 },
];

const containersData = [
  { name: 'Delivered', value: 1257, color: '#10b981' },
  { name: 'Pending', value: 33, color: '#f59e0b' },
];

const turnaroundData = [
  { name: 'Mon', avgTime: 42, containers: 185, efficiency: 88 },
  { name: 'Tue', avgTime: 38, containers: 198, efficiency: 92 },
  { name: 'Wed', avgTime: 35, containers: 210, efficiency: 94 },
  { name: 'Thu', avgTime: 37, containers: 205, efficiency: 93 },
  { name: 'Fri', avgTime: 36, containers: 215, efficiency: 94 },
  { name: 'Sat', avgTime: 40, containers: 178, efficiency: 90 },
  { name: 'Sun', avgTime: 44, containers: 165, efficiency: 86 },
];

const delayReasonsData = [
  { reason: 'Queue Time', count: 12, avgDelay: 25 },
  { reason: 'Loading Delay', count: 8, avgDelay: 18 },
  { reason: 'Equipment Issue', count: 5, avgDelay: 35 },
  { reason: 'Documentation', count: 4, avgDelay: 15 },
  { reason: 'Weather', count: 2, avgDelay: 40 },
];

export function PortSectorDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-6 gap-4">
        <KPICard
          title="Total Vehicles"
          value="95"
          subtitle="Active: 88 (93%)"
          icon={Truck}
          color="blue"
          trend={{ value: '+4%', isPositive: true }}
        />
        <KPICard
          title="Total Chargers"
          value="38"
          subtitle="Utilized: 34 (89%)"
          icon={BatteryCharging}
          color="green"
        />
        <KPICard
          title="Active Pilots"
          value="72"
          subtitle="On Duty: 68 (94%)"
          icon={User}
          color="purple"
        />
        <KPICard
          title="Operating Hours"
          value="1,624"
          subtitle="This Week"
          icon={Clock}
          color="yellow"
        />
        <KPICard
          title="Fleet Utilization"
          value="92%"
          subtitle="Target: 88%"
          icon={TrendingUp}
          color="green"
          trend={{ value: '+5%', isPositive: true }}
        />
        <KPICard
          title="Turnaround Efficiency"
          value="91%"
          subtitle="Target: 85%"
          icon={Container}
          color="blue"
          trend={{ value: '+6%', isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Shift-wise Containers */}
        <div className="col-span-8">
          <ChartCard title="Shift-wise Container Movement">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shiftData} id="port-shift-bar-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="assigned" name="Assigned" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="delivered" name="Delivered" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Pending" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Containers Overview */}
        <div className="col-span-4">
          <ChartCard title="Total Containers (Week)" height="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart id="port-containers-pie-chart">
                <Pie
                  data={containersData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {containersData.map((entry, index) => (
                    <Cell key={`containers-${entry.name}-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Turnaround Time Trend */}
        <div className="col-span-12">
          <ChartCard title="Turnaround Time & Efficiency Analysis">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={turnaroundData} id="port-turnaround-line-chart">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="avgTime" name="Avg Turnaround (min)" stroke="#ef4444" strokeWidth={3} />
                <Line yAxisId="left" type="monotone" dataKey="containers" name="Containers Moved" stroke="#10b981" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="efficiency" name="Efficiency %" stroke="#3b82f6" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Delay Reasons */}
        <div className="col-span-7">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Delay Analysis by Reason</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Delay Reason</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Count</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Avg Delay (min)</th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Impact</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {delayReasonsData.map((item) => {
                    const impact = item.count * item.avgDelay;
                    return (
                      <tr key={item.reason} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">{item.reason}</td>
                        <td className="py-3 px-4 text-sm text-right text-gray-700">{item.count}</td>
                        <td className="py-3 px-4 text-sm text-right text-gray-700">{item.avgDelay} min</td>
                        <td className="py-3 px-4 text-sm text-right font-semibold text-red-600">{impact} min</td>
                        <td className="py-3 px-4 text-center">
                          <StatusBadge
                            label={impact > 200 ? 'High' : impact > 100 ? 'Medium' : 'Low'}
                            variant={impact > 200 ? 'error' : impact > 100 ? 'warning' : 'success'}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="col-span-5">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Avg Containers/Vehicle</span>
                <span className="text-sm font-semibold text-gray-900">14.3</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Avg Turnaround Time</span>
                <span className="text-sm font-semibold text-blue-600">38.2 min</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Queue Time (Avg)</span>
                <span className="text-sm font-semibold text-yellow-600">12.5 min</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Loading/Unloading Time</span>
                <span className="text-sm font-semibold text-gray-900">18.4 min</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">Transit Time</span>
                <span className="text-sm font-semibold text-gray-900">7.3 min</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">SLA Breach Count</span>
                <span className="text-sm font-semibold text-red-600">8</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">On-Time Delivery Rate</span>
                <span className="text-sm font-semibold text-green-600">97.4%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="col-span-12">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Weekly Performance Highlights</h3>
            <div className="grid grid-cols-5 gap-6">
              <div className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                <p className="text-2xl font-bold text-emerald-700">215</p>
                <p className="text-sm text-gray-600 mt-1">Best Day (Friday)</p>
                <StatusBadge label="Peak Performance" variant="success" />
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-2xl font-bold text-blue-700">35 min</p>
                <p className="text-sm text-gray-600 mt-1">Fastest Turnaround</p>
                <StatusBadge label="Wednesday" variant="info" />
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-2xl font-bold text-gray-900">97.4%</p>
                <p className="text-sm text-gray-600 mt-1">Delivery Success</p>
                <StatusBadge label="Excellent" variant="success" />
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                <p className="text-2xl font-bold text-yellow-700">31</p>
                <p className="text-sm text-gray-600 mt-1">Total Delays</p>
                <StatusBadge label="Action Needed" variant="warning" />
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-100">
                <p className="text-2xl font-bold text-purple-700">Shift B</p>
                <p className="text-sm text-gray-600 mt-1">Top Performing Shift</p>
                <StatusBadge label="480 Containers" variant="info" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
