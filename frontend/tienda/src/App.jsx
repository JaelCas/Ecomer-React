import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute.jsx';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminPanel from './components/pages/Admin';
import Home from './components/pages/Home';
import Producto from './components/pages/Producto.jsx';
import ForgotPassword from './components/pages/ForgotPassword.jsx';
import VerifyCode from './components/pages/VerifyCode.jsx';
import Contacto from './components/pages/Contacto.jsx';
import Perfil from './components/pages/Perfil.jsx';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/productos" element={<Producto/>} />
                  <Route path="/forgot-password" element={<ForgotPassword/>} />
                  <Route path="/verify-code" element={<VerifyCode/>} />
                  <Route path="/contacto" element={<Contacto/>} />
                  <Route 
                    path="/admin"
                    element={
                        <PrivateRoute rolRequerido="admin">
                            <AdminPanel />
                        </PrivateRoute>     
                    }
                  />
                  <Route 
                    path="/perfil"
                    element={
                      <PrivateRoute>
                        <Perfil />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;