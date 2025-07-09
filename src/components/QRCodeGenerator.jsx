import React from 'react';
import QRCode from 'qrcode';
import { Box, Typography } from '@mui/material';

const QRCodeGenerator = () => {
  const canvasRef = React.useRef(null);
  const PUBLIC_IP = '125.160.227.163';
  const [error, setError] = React.useState('');

  // Use the fixed public IP address for QR code
  const url = `http://${PUBLIC_IP}:5174`;

  // Generate QR code when URL changes
  React.useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Generate QR code
        QRCode.toCanvas(canvas, url, {
          width: 200,
          margin: 2,
          color: {
            dark: '#1976d2',
            light: '#ffffff'
          },
          errorCorrectionLevel: 'H'
        }, (error) => {
          if (error) console.error('Error generating QR code:', error);
        });
      }
    }
  }, [url]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 2, 
      p: 3,
      width: '100%',
      maxWidth: 400,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 1,
      minHeight: '300px'
    }}>
      <Typography variant="h6" gutterBottom>
        Akses EmoBox
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        gap: 1,
        p: 2,
        flexGrow: 1,
        justifyContent: 'center'
      }}>
        <Typography variant="body1" gutterBottom>
          Scan kode QR ini dari perangkat lain untuk mengakses EmoBox
        </Typography>
        {error && (
          <Box sx={{ 
            bgcolor: 'error.light',
            color: 'error.main',
            p: 1,
            borderRadius: 1,
            width: '100%',
            textAlign: 'center'
          }}>
            {error}
          </Box>
        )}
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ 
            bgcolor: 'background.paper',
            p: 2,
            borderRadius: 1,
            boxShadow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}>
            {/* Generate QR code using canvas */}
            <canvas
              ref={canvasRef}
              style={{ 
                maxWidth: '100%',
                maxHeight: 200,
                width: '100%',
                height: 'auto'
              }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              `Alamat: ${url}`
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default QRCodeGenerator;
