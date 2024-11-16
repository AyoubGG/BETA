import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { 
  Box, 
  Card, 
  CardContent, 
  Grid, 
  Typography
} from '@mui/material';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Metrics {
  timestamp: number;
  cpuLoad: number;
  memoryUsage: number;
  uptime: number;
}

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics[]>([]);

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const newMetric: Metrics = {
        timestamp: Date.now(),
        cpuLoad: Math.random() * 100,
        memoryUsage: Math.random() * 100,
        uptime: Date.now() - 1000 * 60 * 60 * 24 // 24 hours ago
      };
      
      setMetrics(prev => [...prev, newMetric].slice(-20));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: metrics.map((_, index) => index.toString()),
    datasets: [
      {
        label: 'CPU Load',
        data: metrics.map(m => m.cpuLoad),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Memory Usage',
        data: metrics.map(m => m.memoryUsage),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Network Performance (Demo)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Network Performance Monitor (Demo)
              </Typography>
              <Line data={chartData} options={chartOptions} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Current CPU Load
              </Typography>
              <Typography variant="h4">
                {metrics[metrics.length - 1]?.cpuLoad.toFixed(1) || 0}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Memory Usage
              </Typography>
              <Typography variant="h4">
                {metrics[metrics.length - 1]?.memoryUsage.toFixed(1) || 0}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Uptime
              </Typography>
              <Typography variant="h4">
                {Math.floor(((metrics[metrics.length - 1]?.uptime || 0) / (1000 * 60 * 60)) % 24)}h
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;