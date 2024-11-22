import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const PqrsDetail = () => {
  const { id } = useParams();
  const [pqrs, setPqrs] = useState(null);
  const [estado, setEstado] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchPqrsDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pqrs/${id}`);
        setPqrs(response.data);
        setEstado(response.data.estado || 'Pendiente'); // Valor predeterminado
        setComentarios(response.data.comentarios || '');
      } catch (error) {
        console.error('Error al obtener los detalles de la PQRS:', error);
      }
    };

    const fetchHistorial = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/pqrs/${id}/historial`);
        setHistorial(response.data);
      } catch (error) {
        console.error('Error al obtener el historial de la PQRS:', error);
      }
    };

    fetchPqrsDetail();
    fetchHistorial();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/pqrs/${id}`, {
        estado,
        comentarios,
      });
      alert('PQRS actualizada con éxito.');

      // Recargar historial después de actualizar
      const response = await axios.get(`http://localhost:5000/api/pqrs/${id}/historial`);
      setHistorial(response.data);
    } catch (error) {
      console.error('Error al actualizar la PQRS:', error);
      alert('Error al actualizar la PQRS.');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {pqrs ? (
        <Paper sx={{ padding: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Detalles de la PQRS
          </Typography>
          <Typography variant="body1"><strong>Radicado:</strong> {pqrs.radicado}</Typography>
          <Typography variant="body1"><strong>Asunto:</strong> {pqrs.asunto}</Typography>
          <Typography variant="body1"><strong>Nombre:</strong> {pqrs.nombre}</Typography>
          <Typography variant="body1"><strong>Fecha de Radicación:</strong> {pqrs.fecha_radicacion}</Typography>
          <Typography variant="body1"><strong>Tipo de Requerimiento:</strong> {pqrs.tipo_requerimiento}</Typography>
          <Typography variant="body1" sx={{ marginTop: '20px' }}>
            <strong>Estado:</strong>
          </Typography>
          <TextField
            select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            fullWidth
            sx={{ marginBottom: '20px' }}
          >
            <MenuItem value="Pendiente">Pendiente</MenuItem>
            <MenuItem value="En Proceso">En Proceso</MenuItem>
            <MenuItem value="Resuelta">Resuelta</MenuItem>
          </TextField>
          <Typography variant="body1"><strong>Comentarios:</strong></Typography>
          <TextField
            value={comentarios}
            onChange={(e) => setComentarios(e.target.value)}
            multiline
            rows={4}
            fullWidth
            sx={{ marginBottom: '20px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            fullWidth
          >
            Actualizar PQRS
          </Button>
          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            Historial de Cambios
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Fecha de Cambio</TableCell>
                  <TableCell>Estado Anterior</TableCell>
                  <TableCell>Estado Nuevo</TableCell>
                  <TableCell>Comentarios</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historial.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.fecha_cambio}</TableCell>
                    <TableCell>{item.estado_anterior}</TableCell>
                    <TableCell>{item.estado_nuevo}</TableCell>
                    <TableCell>{item.comentarios}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <Typography variant="body1">Cargando detalles...</Typography>
      )}
    </Box>
  );
};

export default PqrsDetail;
