import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import { recoverPassword } from '../api';

const RecoverPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await recoverPassword(email);
      setSubmitted(true);
    } catch (error) {
      alert(error.response?.data || 'Error al procesar la solicitud.');
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
            Recuperar Contraseña
          </Typography>
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  id="email"
                  label="Correo Electrónico"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingrese su correo electrónico"
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
                Enviar
              </Button>
            </form>
          ) : (
            <Typography variant="body1" textAlign="center" mt={2}>
              Si el correo está registrado, recibirás instrucciones para restablecer tu contraseña.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecoverPassword;
