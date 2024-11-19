import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Card, CardContent } from '@mui/material';
import { registerUser } from '../api';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.name) validationErrors.name = 'El nombre es obligatorio.';
    if (!formData.email) validationErrors.email = 'El correo electrónico es obligatorio.';
    if (!formData.password) validationErrors.password = 'La contraseña es obligatoria.';
    else if (formData.password.length < 6)
      validationErrors.password = 'La contraseña debe tener al menos 6 caracteres.';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await registerUser(formData);
        alert(response.data); // Mensaje del servidor
        setFormData({ name: '', email: '', password: '' }); // Limpia el formulario
      } catch (error) {
        alert(error.response?.data || 'Error al registrar usuario.');
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
            Crear Cuenta
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box mb={2}>
              <TextField
                fullWidth
                id="name"
                label="Nombre Completo"
                name="name"
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                id="password"
                label="Contraseña"
                name="password"
                type="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
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
              Registrarse
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateAccount;
