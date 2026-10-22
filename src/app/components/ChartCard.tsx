import { MoreVertical } from 'lucide-react';

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
  height?: string;
}

export function ChartCard({ title, children, action, height = 'h-80' }: ChartCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-all">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        {action || (
          <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="w-4 h-4 text-gray-500" />
          </button>
        )}
      </div>
      <div className={`${height} w-full min-h-[320px]`}>
        {children}
      </div>
    </div>
  );
}
