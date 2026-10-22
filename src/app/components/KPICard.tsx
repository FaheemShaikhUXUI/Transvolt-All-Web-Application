import { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  color?: 'green' | 'blue' | 'yellow' | 'purple' | 'gray';
}

const colorClasses = {
  green: 'text-emerald-600',
  blue: 'text-blue-600',
  yellow: 'text-yellow-600',
  purple: 'text-purple-600',
  gray: 'text-gray-600',
};

const bgColorClasses = {
  green: 'bg-emerald-50',
  blue: 'bg-blue-50',
  yellow: 'bg-yellow-50',
  purple: 'bg-purple-50',
  gray: 'bg-gray-50',
};

export function KPICard({ title, value, subtitle, icon: Icon, trend, color = 'blue' }: KPICardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 ${bgColorClasses[color]} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${colorClasses[color]}`} />
        </div>
        {trend && (
          <span className={`text-xs font-medium px-2 py-1 rounded-md flex items-center gap-1 ${
            trend.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
          }`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </span>
        )}
      </div>
      <div>
        <p className="text-gray-600 text-sm mb-1.5">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
