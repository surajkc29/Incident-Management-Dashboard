import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export const Statistics = ({ incidents }) => {
  const severityData = incidents.reduce((acc, incident) => {
    acc[incident.severity] = (acc[incident.severity] || 0) + 1;
    return acc;
  }, {});

  const statusData = incidents.reduce((acc, incident) => {
    acc[incident.status] = (acc[incident.status] || 0) + 1;
    return acc;
  }, {});

  const SEVERITY_COLORS = {
    Low: '#059669',
    Medium: '#D97706',
    High: '#DC2626',
    Critical: '#7C3AED'
  };

  const STATUS_COLORS = {
    Open: '#DC2626',
    'In Progress': '#D97706',
    Resolved: '#059669'
  };

  const severityChartData = Object.entries(severityData).map(([name, value]) => ({
    name,
    value
  }));

  const statusChartData = Object.entries(statusData).map(([name, value]) => ({
    name,
    value
  }));

  const StatCard = ({ title, value, className }) => (
    <div className={`bg-gray-800 rounded-xl p-4 border border-gray-700 ${className}`}>
      <h4 className="text-sm font-medium text-gray-400">{title}</h4>
      <p className="text-2xl font-semibold text-gray-100 mt-1">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-gray-100 mb-6">Overview</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard 
            title="Total Incidents" 
            value={incidents.length}
          />
          <StatCard 
            title="Open Incidents" 
            value={incidents.filter(i => i.status === 'Open').length}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">By Severity</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {severityChartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={SEVERITY_COLORS[entry.name]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400 mb-4">By Status</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                    label
                  >
                    {statusChartData.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={STATUS_COLORS[entry.name]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};