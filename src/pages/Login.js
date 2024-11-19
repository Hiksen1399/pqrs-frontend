import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent, Link } from '@mui/material';
import { loginUser } from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    // Validar correo electrónico
    if (!email) {
      validationErrors.email = 'El correo electrónico es obligatorio.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = 'El correo electrónico no es válido.';
    }

    // Validar contraseña
    if (!password) {
      validationErrors.password = 'La contraseña es obligatoria.';
    } else if (password.length < 6) {
      validationErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await loginUser({ email, password });
        alert('Inicio de sesión exitoso!');
        console.log('Token recibido:', response.data.token);
        // Aquí puedes redirigir al usuario al dashboard
      } catch (error) {
        alert(error.response?.data || 'Error al iniciar sesión.');
      }
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
            Iniciar Sesión
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                id="email"
                label="Correo Electrónico"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="password"
                label="Contraseña"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Box>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ padding: '10px 0', fontSize: '16px' }}
            >
              Ingresar
            </Button>
          </form>
          {/* Enlaces debajo del botón */}
          <Box mt={3} textAlign="center">
            <Link href="/recover-password" underline="hover" color="primary" sx={{ display: 'block', mb: 1 }}>
              ¿Olvidaste tu contraseña?
            </Link>
            <Link href="/create-account" underline="hover" color="secondary">
              Crear cuenta nueva
            </Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
