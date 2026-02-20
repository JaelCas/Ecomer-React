import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from "./context/AuthContext.jsx";
import PrivateRoute from './components/PivateRoute.jsx';
import Login from './components/Auth/Login.jsx';         //Login
import Register from './components/Auth/Register.jsx';
import AdminPanel from './components/Auth/Admin.jsx';   //AdminPanel (no "Login")
import Home from './components/pages/Home.jsx'
import Layout from './components/Layout/';

function App() {


  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/productos"element={
          <PrivateRoute rolRequerido="usuario">
            <Layout />
            <div>Página de Productos</div>
          </PrivateRoute>
          }
        />
        <Route path='/admin'element={
          <PrivateRoute rolRequerido="admin">
            <AdminPanel /> {/* Usa AdminPanel */}
          </PrivateRoute>
          } 
        />

        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App
