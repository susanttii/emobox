import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCodeGenerator from './QRCodeGenerator';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Container,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert
} from '@mui/material';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SportsIcon from '@mui/icons-material/Sports';
import InsightsIcon from '@mui/icons-material/Insights';
import DownloadIcon from '@mui/icons-material/Download';

import { Line, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import EmotionReportForm from './EmotionReportForm';

// Initialize Chart.js
const chartConfig = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Pie Chart',
    },
  },
};

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emotionData, setEmotionData] = useState({
    happy: 0,
    angry: 0,
    fear: 0,
    sad: 0,
    surprise: 0,
    disgust: 0,
    neutral: 0
  });
  const [downloadError, setDownloadError] = useState('');

  const downloadReport = () => {
    try {
      // Prepare data for CSV
      const csvContent = [
        ['Emosi', 'Jumlah'],
        ['Senang', emotionData.happy],
        ['Marah', emotionData.angry],
        ['Takut', emotionData.fear],
        ['Sedih', emotionData.sad],
        ['Terkejut', emotionData.surprise],
        ['Jijik', emotionData.disgust],
        ['Netral', emotionData.neutral]
      ].map(row => row.join(',')).join('\n');

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'laporan-emosi.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      setDownloadError('Gagal mengunduh laporan: ' + err.message);
      setTimeout(() => setDownloadError(''), 5000);
    }
  };
  const [emotionHistory, setEmotionHistory] = useState([]);
  const navigate = useNavigate();

  const handleEmotionReport = async (reportData) => {
    try {
      setLoading(true);
      
      // Update emotion data
      const newEmotionData = { ...emotionData };
      newEmotionData[reportData.emotion] += 1;
      setEmotionData(newEmotionData);
      
      // Add to emotion history
      setEmotionHistory(prev => [...prev, {
        emotion: reportData.emotion,
        intensity: reportData.intensity,
        timestamp: reportData.timestamp,
        description: reportData.description,
        anonymous: reportData.anonymous
      }]);
      
      // Show success message
      setError('');
      
    } catch (err) {
      setError('Gagal melaporkan emosi: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const chartStyles = {
    colors: {
      happy: '#4CAF50',
      angry: '#F44336',
      fear: '#FF9800',
      sad: '#2196F3',
      surprise: '#9C27B0',
      disgust: '#607D8B',
      neutral: '#9E9E9E'
    },
    labels: {
      happy: 'Senang',
      angry: 'Marah',
      fear: 'Takut',
      sad: 'Sedih',
      surprise: 'Terkejut',
      disgust: 'Jijik',
      neutral: 'Netral'
    }
  };

  const chartData = {
    labels: Object.values(chartStyles.labels),
    datasets: [{
      data: Object.values(emotionData),
      backgroundColor: Object.values(chartStyles.colors),
      hoverOffset: 4,
      borderRadius: 8,
      borderSkipped: false
    }]
  };

  // Get emotion history for the last 24 hours
  const recentEmotions = emotionHistory.filter(emotion => 
    new Date(emotion.timestamp) >= new Date(Date.now() - 24 * 60 * 60 * 1000)
  );

  // Group emotions by hour
  const hourlyEmotions = {};
  const now = new Date();
  for (let i = 0; i < 24; i++) {
    const hour = now.getHours() - i;
    hourlyEmotions[hour] = { happy: 0, angry: 0, fear: 0, sad: 0, surprise: 0, disgust: 0, neutral: 0 };
  }

  recentEmotions.forEach(emotion => {
    const hour = new Date(emotion.timestamp).getHours();
    hourlyEmotions[hour][emotion.emotion] += 1;
  });

  // Prepare line chart data
  const lineChartData = {
    labels: Array.from({ length: 24 }, (_, i) => `${now.getHours() - i}:00`),
    datasets: [
      {
        label: 'Senang',
        data: Array.from({ length: 24 }, (_, i) => hourlyEmotions[now.getHours() - i].happy),
        borderColor: chartStyles.colors.happy,
        tension: 0.4,
        fill: false
      },
      {
        label: 'Marah',
        data: Array.from({ length: 24 }, (_, i) => hourlyEmotions[now.getHours() - i].angry),
        borderColor: chartStyles.colors.angry,
        tension: 0.4,
        fill: false
      },
      {
        label: 'Takut',
        data: Array.from({ length: 24 }, (_, i) => hourlyEmotions[now.getHours() - i].fear),
        borderColor: chartStyles.colors.fear,
        tension: 0.4,
        fill: false
      },
      {
        label: 'Sedih',
        data: Array.from({ length: 24 }, (_, i) => hourlyEmotions[now.getHours() - i].sad),
        borderColor: chartStyles.colors.sad,
        tension: 0.4,
        fill: false
      },
      {
        label: 'Terkejut',
        data: Array.from({ length: 24 }, (_, i) => hourlyEmotions[now.getHours() - i].surprise),
        borderColor: chartStyles.colors.surprise,
        tension: 0.4,
        fill: false
      },
      {
        label: 'Jijik',
        data: Array.from({ length: 24 }, (_, i) => hourlyEmotions[now.getHours() - i].disgust),
        borderColor: chartStyles.colors.disgust,
        tension: 0.4,
        fill: false
      },
      {
        label: 'Netral',
        data: Array.from({ length: 24 }, (_, i) => hourlyEmotions[now.getHours() - i].neutral),
        borderColor: chartStyles.colors.neutral,
        tension: 0.4,
        fill: false
      }
    ]
  };
  
  // Chart configuration
  const lineChartConfig = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Perubahan Emosi dalam 24 Jam Terakhir',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Jumlah Emosi'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Waktu'
        }
      }
    }
  };
  
  // Chart configuration
  const pieChartConfig = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribusi Emosi',
      },
    }
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Box sx={{
      flexGrow: 1,
      p: 3,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 1
    }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2' }}>
              Selamat Datang di EmoBox
            </Typography>
            <Typography variant="body1" paragraph>
              EmoBox adalah pelengkap digital yang dapat diakses melalui QR code untuk membantu Anda dalam:
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SentimentSatisfiedIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Laporkan emosi Anda secara rutin untuk memahami pola emosi Anda. 
                    Dapatkan wawasan tentang emosi Anda dan bagaimana mereka mempengaruhi hidup Anda.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SportsIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h6">Challenge Mingguan</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Ikuti tantangan mingguan yang dirancang untuk membantu pengembangan diri Anda. 
                    Setiap minggu, Anda akan mendapatkan tantangan baru yang akan membantu Anda tumbuh.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <InsightsIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h6">Insight Pengembangan Diri</Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Dapatkan wawasan mendalam tentang kemajuan refleksi Anda. 
                    Analisis tren emosi dan tantangan yang telah Anda selesaikan.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{
            mt: 4,
            mb: 4,
            p: 4,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
            height: '100%'
          }}>
            <Typography variant="h6" gutterBottom>
              Akses EmoBox
            </Typography>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '300px',
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1
            }}>
              <QRCodeGenerator />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mb: 4, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" gutterBottom>
            </Typography>
            <EmotionReportForm onSubmit={handleEmotionReport} />
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Distribusi Emosi
            </Typography>
            <Box sx={{ height: 400 }}>
              <Pie
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        boxWidth: 12,
                        padding: 12,
                        font: {
                          size: 12
                        }
                      }
                    }
                  },
                  animation: {
                    duration: 1000,
                    easing: 'easeInOutQuad'
                  }
                }}
              />
            </Box>
          </Box>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Tren Emosi
            </Typography>
            <Box sx={{ height: 400 }}>
              <Line
                data={lineChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top',
                      labels: {
                        boxWidth: 12,
                        padding: 12,
                        font: {
                          size: 12
                        }
                      }
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        display: true,
                        drawBorder: false,
                        color: 'rgba(0,0,0,0.1)'
                      },
                      ticks: {
                        font: {
                          size: 12
                        }
                      }
                    },
                    y: {
                      grid: {
                        display: true,
                        drawBorder: false,
                        color: 'rgba(0,0,0,0.1)'
                      },
                      ticks: {
                        font: {
                          size: 12
                        }
                      }
                    }
                  },
                  animation: {
                    duration: 1000,
                    easing: 'easeInOutQuad'
                  }
                }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              Aksi Cepat
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={downloadReport}
                  startIcon={<DownloadIcon />}
                >
                  Download Laporan
                </Button>
                {downloadError && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {downloadError}
                  </Alert>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
