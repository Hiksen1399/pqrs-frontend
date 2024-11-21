import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/reset-password', {
        token,
        password,
      });
      setMessage(response.data);
    } catch (error) {
      setMessage(error.response?.data || 'Error al restablecer la contraseña.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
      }}
    >
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h5" component="h2" textAlign="center" mb={3}>
            Restablecer Contraseña
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                id="password"
                label="Nueva Contraseña"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ padding: '10px 0', fontSize: '16px' }}
            >
              Restablecer Contraseña
            </Button>
          </form>
          {message && (
            <Typography variant="body1" textAlign="center" mt={2}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ResetPassword;
