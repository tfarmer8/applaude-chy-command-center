import React from 'react';
import { MetricCard } from './MetricCard';
import { TrendingUp, Users, CheckCircle, Zap } from 'lucide-react';

interface KPIData {
  revenue: { current: number; previous: number; currency: string };
  activeUsers: { current: number; previous: number };
  tasksCompleted: { current: number; previous: number };
  teamVelocity: { current: number; previous: number; unit: string };
}

interface KPIDashboardProps {
  data?: KPIData;
}

const defaultData: KPIData = {
  revenue: { current: 248650, previous: 215420, currency: 'USD' },
  activeUsers: { current: 12847, previous: 11203 },
  tasksCompleted: { current: 1547, previous: 1389 },
  teamVelocity: { current: 87, previous: 79, unit: 'points/sprint' }
};

export const KPIDashboard: React.FC<KPIDashboardProps> = ({ data = defaultData }) => {
  const calculateChange = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const formatCurrency = (value: number, currency: string): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatNumber = (value: number): string => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">KPI Dashboard</h1>
        <p className="text-gray-600 mt-2">Monitor your key performance indicators in real-time</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Revenue"
          value={formatCurrency(data.revenue.current, data.revenue.currency)}
          change={calculateChange(data.revenue.current, data.revenue.previous)}
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBgColor="bg-green-100"
        />
        
        <MetricCard
          title="Active Users"
          value={formatNumber(data.activeUsers.current)}
          change={calculateChange(data.activeUsers.current, data.activeUsers.previous)}
          icon={Users}
          iconColor="text-blue-600"
          iconBgColor="bg-blue-100"
        />
        
        <MetricCard
          title="Tasks Completed"
          value={formatNumber(data.tasksCompleted.current)}
          change={calculateChange(data.tasksCompleted.current, data.tasksCompleted.previous)}
          icon={CheckCircle}
          iconColor="text-purple-600"
          iconBgColor="bg-purple-100"
        />
        
        <MetricCard
          title="Team Velocity"
          value={`${data.teamVelocity.current} ${data.teamVelocity.unit}`}
          change={calculateChange(data.teamVelocity.current, data.teamVelocity.previous)}
          icon={Zap}
          iconColor="text-orange-600"
          iconBgColor="bg-orange-100"
        />
      </div>
    </div>
  );
};