import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Paper,
  Stack,
  Grid,
  Chip,
  Divider,
  Rating,
  Tooltip
} from '@mui/material';
import {
  SentimentNeutralOutlined,
  SentimentVerySatisfiedOutlined,
  SentimentVeryDissatisfiedOutlined,
  SentimentDissatisfiedOutlined,
  MoodOutlined,
  HelpOutline
} from '@mui/icons-material';
import { useState } from 'react';

const EmotionReportForm = ({ onSubmit }) => {
  const [emotion, setEmotion] = useState('');
  const [description, setDescription] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [intensity, setIntensity] = useState(0);
  const [location, setLocation] = useState('');
  const [activity, setActivity] = useState('');

  const emotions = [
    { value: 'happy', label: 'Senang', icon: '😊' },
    { value: 'sad', label: 'Sedih', icon: '😔' },
    { value: 'angry', label: 'Marah', icon: '😡' },
    { value: 'fear', label: 'Takut', icon: '😨' },
    { value: 'surprise', label: 'Terkejut', icon: '😲' },
    { value: 'disgust', label: 'Jijik', icon: '🤢' },
    { value: 'neutral', label: 'Netral', icon: '😐' }
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      emotion,
      description,
      anonymous
    });
  };

  return (
    <Paper sx={{ 
      p: 4, 
      mb: 4,
      borderRadius: 3,
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      backgroundColor: '#f8f9fa'
    }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3, color: '#1976d2' }}>
        <MoodOutlined sx={{ mr: 1, color: '#1976d2' }} />
        Laporan Emosi Anda
      </Typography>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="body2" color="text.secondary" paragraph>
        Bagikan bagaimana Anda merasa hari ini. Informasi ini akan membantu kami memahami dan membantu Anda lebih baik.
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                <SentimentNeutralOutlined sx={{ mr: 1, fontSize: 20 }} />
                Pilih Emosi Anda
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Pilih emosi yang paling menggambarkan perasaan Anda saat ini
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="emotion-label">Emosi Anda</InputLabel>
                <Select
                  labelId="emotion-label"
                  value={emotion}
                  label="Emosi Anda"
                  onChange={(e) => setEmotion(e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '& fieldset': {
                        borderColor: '#1976d2',
                      },
                      '&:hover fieldset': {
                        borderColor: '#1976d2',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#1976d2',
                      },
                    },
                  }}
                >
                  {emotions.map((emotion) => (
                    <MenuItem key={emotion.value} value={emotion.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: emotion.value === 'happy' ? '#4CAF50' :
                                  emotion.value === 'sad' ? '#2196F3' :
                                  emotion.value === 'angry' ? '#F44336' :
                                  emotion.value === 'fear' ? '#FF9800' :
                                  emotion.value === 'surprise' ? '#9C27B0' :
                                  emotion.value === 'disgust' ? '#607D8B' :
                                  '#9E9E9E',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff'
                        }}>
                          {emotion.value === 'happy' && <SentimentVerySatisfiedOutlined sx={{ fontSize: 16 }} />}
                          {emotion.value === 'sad' && <SentimentVeryDissatisfiedOutlined sx={{ fontSize: 16 }} />}
                          {emotion.value === 'angry' && <SentimentDissatisfiedOutlined sx={{ fontSize: 16 }} />}
                          {emotion.value === 'fear' && <SentimentNeutralOutlined sx={{ fontSize: 16 }} />}
                          {emotion.value === 'surprise' && <MoodOutlined sx={{ fontSize: 16 }} />}
                          {emotion.value === 'disgust' && <SentimentDissatisfiedOutlined sx={{ fontSize: 16 }} />}
                          {emotion.value === 'neutral' && <SentimentNeutralOutlined sx={{ fontSize: 16 }} />}
                        </Box>
                        <Typography>{emotion.label}</Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormHelperText>Emosi yang Anda rasakan saat ini</FormHelperText>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                <MoodOutlined sx={{ mr: 1, fontSize: 20 }} />
                Tingkat Intensitas Emosi
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Bagaimana intensitas emosi Anda saat ini?
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Rating
                  name="simple-controlled"
                  value={intensity}
                  onChange={(event, newValue) => setIntensity(newValue)}
                  size="large"
                  sx={{ color: '#1976d2' }}
                />
                <Typography>
                  {intensity ? `${intensity}/5` : 'Pilih tingkat intensitas'}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                <MoodOutlined sx={{ mr: 1, fontSize: 20 }} />
                Keterangan (opsional)
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Ceritakan lebih detail tentang emosi Anda
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Keterangan (opsional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Contoh: Saya merasa sedih karena..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Lokasi (opsional)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Contoh: Kantor, Rumah, dll."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Aktivitas (opsional)"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                placeholder="Contoh: Bekerja, Belajar, dll."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&:hover fieldset': {
                      borderColor: '#1976d2',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1976d2',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 'bold',
                  bgcolor: '#1976d2',
                  '&:hover': {
                    bgcolor: '#1565c0',
                  },
                }}
              >
                <MoodOutlined sx={{ mr: 1 }} />
                Laporkan Emosi
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                fullWidth
                onClick={() => setAnonymous(!anonymous)}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  border: '2px solid #1976d2',
                  color: '#1976d2',
                  '&:hover': {
                    bgcolor: '#e3f2fd',
                  },
                }}
              >
                {anonymous ? 'Laporkan dengan Nama' : 'Laporkan Secara Anonim'}
              </Button>
            </Grid>
          </Grid>
        </Stack>
      </form>

      <Box sx={{ mt: 4, p: 3, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          <HelpOutline sx={{ mr: 1, fontSize: 20 }} />
          Mengapa Laporan Emosi Penting?
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          1. Membantu memahami pola emosi Anda
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          2. Mendapatkan rekomendasi untuk mengelola emosi
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          3. Membantu tim kami memberikan dukungan yang lebih baik
        </Typography>
      </Box>
    </Paper>
  );
};

export default EmotionReportForm;
