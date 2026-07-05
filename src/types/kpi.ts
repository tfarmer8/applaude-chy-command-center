export interface MetricValue {
  current: number;
  previous: number;
}

export interface RevenueMetric extends MetricValue {
  currency: string;
}

export interface VelocityMetric extends MetricValue {
  unit: string;
}

export interface KPIData {
  revenue: RevenueMetric;
  activeUsers: MetricValue;
  tasksCompleted: MetricValue;
  teamVelocity: VelocityMetric;
}

export interface KPIMetric {
  id: string;
  name: string;
  value: number;
  previousValue: number;
  changePercentage: number;
  trend: 'up' | 'down' | 'stable';
}