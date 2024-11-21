import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  TablePagination,
  TextField,
  MenuItem,
} from '@mui/material';
import { Link } from 'react-router-dom';

const PqrsList = () => {
  const [pqrsData, setPqrsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchPqrs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/pqrs');
        setPqrsData(response.data);
      } catch (error) {
        console.error('Error al obtener las PQRS:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPqrs();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(0); // Reinicia la paginación al aplicar el filtro
  };

  const filteredData = pqrsData.filter((pqrs) =>
    filter ? pqrs.tipo_requerimiento === filter : true
  );

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Lista de PQRS
      </Typography>
      <Box sx={{ marginBottom: '20px' }}>
        <TextField
          select
          label="Filtrar por Tipo de Requerimiento"
          value={filter}
          onChange={handleFilterChange}
          fullWidth
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="DENUNCIA">Denuncia</MenuItem>
          <MenuItem value="QUEJA">Queja</MenuItem>
          <MenuItem value="PETICIÓN">Petición</MenuItem>
        </TextField>
      </Box>
      {loading ? (
        <Typography variant="body1">Cargando datos...</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Radicado</strong></TableCell>
                <TableCell><strong>Fecha de Radicación</strong></TableCell>
                <TableCell><strong>Medios de Llegada</strong></TableCell>
                <TableCell><strong>Tipo de Requerimiento</strong></TableCell>
                <TableCell><strong>Asunto</strong></TableCell>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Entidad</strong></TableCell>
                <TableCell><strong>Dependencia</strong></TableCell>
                <TableCell><strong>Sector</strong></TableCell>
                <TableCell><strong>Fecha Limite</strong></TableCell>
                <TableCell><strong>Fecha Respuesta</strong></TableCell>
                <TableCell><strong>Trazabilidad</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((pqrs) => (
                  <TableRow key={pqrs.id}>
                    <TableCell>
                      <Link
                        to={`/pqrs-detail/${pqrs.id}`}
                        style={{ textDecoration: 'none', color: 'blue' }}
                      >
                        {pqrs.radicado}
                      </Link>
                    </TableCell>
                    <TableCell>{pqrs.fecha_radicacion}</TableCell>
                    <TableCell>{pqrs.medios_llegada}</TableCell>
                    <TableCell>{pqrs.tipo_requerimiento}</TableCell>
                    <TableCell>{pqrs.asunto}</TableCell>
                    <TableCell>{pqrs.nombre}</TableCell>
                    <TableCell>{pqrs.entidad}</TableCell>
                    <TableCell>{pqrs.dependencia}</TableCell>
                    <TableCell>{pqrs.sector}</TableCell>
                    <TableCell>{pqrs.fecha_limite}</TableCell>
                    <TableCell>{pqrs.fecha_respuesta}</TableCell>
                    <TableCell>{pqrs.trazabilidad}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={filteredData.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </Box>
  );
};

export default PqrsList;
