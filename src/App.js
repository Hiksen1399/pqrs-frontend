import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import PqrsList from './pages/PqrsList';
import PqrsDetail from './pages/PqrsDetail';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Páginas adicionales
import RecoverPassword from './pages/RecoverPassword';
import CreateAccount from './pages/CreateAccount';
import ResetPassword from './pages/ResetPassword';


// Configuración del tema
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#ff4081' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/pqrs-list" element={<PqrsList />} />
            <Route path="/pqrs-detail/:id" element={<PqrsDetail />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
