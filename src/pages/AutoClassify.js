import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';

const AutoClassify = () => {
  const [formData, setFormData] = useState({
    radicado: '',
    fecha_radicacion: '',
    medios_llegada: '',
    asunto: '',
    nombre: '',
    entidad: '',
  });
  const [classification, setClassification] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auto-classify-pqrs', formData);
      setClassification(response.data.category);
      alert('PQRS clasificada y almacenada con éxito.');
    } catch (error) {
      console.error('Error al clasificar la PQRS:', error);
      alert('Error al clasificar la PQRS.');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Paper sx={{ padding: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Clasificación Automática de PQRS
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Radicado"
            name="radicado"
            fullWidth
            value={formData.radicado}
            onChange={handleChange}
            required
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Fecha de Radicación"
            name="fecha_radicacion"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.fecha_radicacion}
            onChange={handleChange}
            required
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Medios de Llegada"
            name="medios_llegada"
            fullWidth
            value={formData.medios_llegada}
            onChange={handleChange}
            required
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Asunto"
            name="asunto"
            fullWidth
            value={formData.asunto}
            onChange={handleChange}
            required
            multiline
            rows={3}
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Nombre"
            name="nombre"
            fullWidth
            value={formData.nombre}
            onChange={handleChange}
            required
            sx={{ marginBottom: '10px' }}
          />
          <TextField
            label="Entidad"
            name="entidad"
            fullWidth
            value={formData.entidad}
            onChange={handleChange}
            required
            sx={{ marginBottom: '10px' }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Clasificar y Guardar
          </Button>
        </form>
        {classification && (
          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Categoría Clasificada: {classification}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default AutoClassify;
