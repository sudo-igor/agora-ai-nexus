
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface UsageAnalyticsProps {
  priorityAreas: string[];
  chatHistory: string[];
}

const UsageAnalytics: React.FC<UsageAnalyticsProps> = ({ priorityAreas, chatHistory }) => {
  // Generate mock data based on priority areas
  const areaData = priorityAreas.slice(0, 5).map(area => ({
    area: area.charAt(0).toUpperCase() + area.slice(1),
    queries: Math.floor(Math.random() * 20) + 5
  }));

  // Generate mock time-based data
  const timeData = [
    { period: 'Week 1', queries: Math.floor(Math.random() * 15) + 5 },
    { period: 'Week 2', queries: Math.floor(Math.random() * 20) + 8 },
    { period: 'Week 3', queries: Math.floor(Math.random() * 25) + 12 },
    { period: 'Week 4', queries: chatHistory.length > 0 ? chatHistory.length : Math.floor(Math.random() * 18) + 10 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Usage Analytics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Queries by Area</CardTitle>
            <CardDescription>Distribution of queries by thematic area</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={areaData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="queries"
                  label={({ area, percent }) => `${area} ${(percent * 100).toFixed(0)}%`}
                >
                  {areaData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Usage by Period</CardTitle>
            <CardDescription>Query volume over time</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="queries" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UsageAnalytics;
