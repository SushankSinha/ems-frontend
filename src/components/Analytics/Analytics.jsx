import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import api from "../../baseurl"
// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Analytics = () => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // For error handling

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await api.get('/reports', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
        });
        
        if (!res.ok) {
          throw new Error('Failed to fetch report data');
        }

        const data = await res.json();
        setReportData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const chartData = {
    labels: reportData.dates, // Assuming dates are an array of date strings like ['2024-01-01', '2024-01-02', ...]
    datasets: [
      {
        label: 'Hours Worked',
        data: reportData.hoursWorked, // Assuming hoursWorked is an array like [2, 3, 5, ...]
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        fill: false, // To prevent filling under the line
      },
    ],
  };

  return (
    <div style={{ width: '80%', margin: 'auto', paddingTop: 30 }}>
      <h2>Analytics</h2>
      <Line data={chartData} />
    </div>
  );
};

export default Analytics;
