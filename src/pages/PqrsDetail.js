import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box, Paper } from '@mui/material';

const PqrsDetail = () => {
  const { id } = useParams();
  const [pqrs, setPqrs] = useState(null);

  useEffect(() => {
    const fetchPqrsDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pqrs/${id}`);
        setPqrs(response.data);
      } catch (error) {
        console.error('Error al obtener detalles de la PQRS:', error);
      }
    };

    fetchPqrsDetail();
  }, [id]);

  return (
    <Box sx={{ padding: '20px' }}>
      {pqrs ? (
        <Paper sx={{ padding: '20px' }}>
          <Typography variant="h5">Detalles de la PQRS</Typography>
          <Typography variant="body1"><strong>Radicado:</strong> {pqrs.radicado}</Typography>
          <Typography variant="body1"><strong>Asunto:</strong> {pqrs.asunto}</Typography>
          {/* Agrega más detalles según los campos */}
        </Paper>
      ) : (
        <Typography variant="body1">Cargando detalles...</Typography>
      )}
    </Box>
  );
};

export default PqrsDetail;
