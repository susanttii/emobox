import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const EmotionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emotion: '',
    description: '',
    anonymous: false,
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Add Firebase submission logic here
      navigate('/');
    } catch (err) {
      setError('Gagal mengirim laporan. Silakan coba lagi.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Form Laporan Emosi
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Emosi Anda</InputLabel>
            <Select
              name="emotion"
              value={formData.emotion}
              onChange={handleInputChange}
              label="Emosi Anda"
              required
            >
              <MenuItem value="">Pilih...</MenuItem>
              <MenuItem value="senang">Senang</MenuItem>
              <MenuItem value="sedih">Sedih</MenuItem>
              <MenuItem value="marah">Marah</MenuItem>
              <MenuItem value="bingung">Bingung</MenuItem>
              <MenuItem value="cemas">Cemas</MenuItem>
              <MenuItem value="tenang">Tenang</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={4}
            name="description"
            label="Keterangan (opsional)"
            value={formData.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleInputChange}
              />
            }
            label="Laporkan secara anonim"
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={() => navigate('/')}>
              Kembali
            </Button>
            <Button variant="contained" type="submit">
              Kirim Laporan
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default EmotionForm;
