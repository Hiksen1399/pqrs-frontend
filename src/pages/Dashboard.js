import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [trend, setTrend] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Solicitud para estadísticas generales
        const statsResponse = await axios.get('http://localhost:5000/api/pqrs/stats');
        setStats(statsResponse.data);

        // Solicitud para la tendencia
        const trendResponse = await axios.get('http://localhost:5000/api/pqrs/trend');
        setTrend(trendResponse.data);
      } catch (error) {
        console.error('Error al obtener estadísticas:', error);
      }
    };

    fetchStats();
  }, []);

  if (!stats || !trend.length) {
    return <Typography variant="h6">No hay datos para mostrar.</Typography>;
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Dashboard de PQRS
      </Typography>
      <Grid container spacing={4}>
        {/* Gráfica de PQRS por Tipo */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              PQRS por Tipo
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.pqrsPorTipo}
                  dataKey="total"
                  nameKey="tipo_requerimiento"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {stats.pqrsPorTipo.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Gráfica de PQRS por Estado */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              PQRS por Estado
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.pqrsPorEstado}
                  dataKey="total"
                  nameKey="estado"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {stats.pqrsPorEstado.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Gráfica de tendencia */}
        <Grid item xs={12}>
          <Paper sx={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Tendencia de PQRS (Últimos 7 días)
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trend}>
                <XAxis dataKey="fecha" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Tiempo promedio de respuesta */}
        <Grid item xs={12}>
          <Paper sx={{ padding: '20px' }}>
            <Typography variant="h6">
              Tiempo Promedio de Respuesta: {stats.promedioRespuesta.toFixed(2)} días
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
