import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  LinearProgress,
} from '@mui/material';
import { Line } from 'react-chartjs-2';
import { 
  Pie, 
  Bar 
} from 'react-chartjs-2';
import { 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [emotionData, setEmotionData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch emotion data from Firebase
    const fetchEmotionData = async () => {
      try {
        // Add your Firebase data fetching logic here
        setLoading(false);
      } catch (error) {
        console.error('Error fetching emotion data:', error);
        setLoading(false);
      }
    };

    fetchEmotionData();
  }, []);

  const emotions = [
    'Senang',
    'Sedih',
    'Marah',
    'Bingung',
    'Cemas',
    'Tenang'
  ];

  const emotionColors = [
    '#4CAF50',
    '#F44336',
    '#FF9800',
    '#2196F3',
    '#9C27B0',
    '#8BC34A'
  ];

  const pieChartData = {
    labels: emotions,
    datasets: [
      {
        data: emotions.map(emotion => emotionData[emotion] || 0),
        backgroundColor: emotionColors,
        hoverBackgroundColor: emotionColors.map(color => color + '80')
      }
    ]
  };

  const lineChartData = {
    labels: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
    datasets: [
      {
        label: 'Total Emosi Dilaporkan',
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: '#1976d2',
        backgroundColor: '#1976d220',
        tension: 0.1
      }
    ]
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard EmoBox
          </Typography>
        </Grid>

        {/* Overview Cards */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Ringkasan Emosi
            </Typography>
            <Pie data={pieChartData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Statistik Mingguan
            </Typography>
            <Line data={lineChartData} />
          </Paper>
        </Grid>

        {/* Recent Reports */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Laporan Terbaru
            </Typography>
            <Grid container spacing={2}>
              {emotions.map((emotion, index) => (
                <Grid item xs={12} sm={6} md={4} key={emotion}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        {emotion}
                      </Typography>
                      <Typography variant="h4" component="div">
                        {emotionData[emotion] || 0}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        Detail
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
              Aksi Cepat
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  href="/form"
                >
                  Laporkan Emosi
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Download Laporan
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
