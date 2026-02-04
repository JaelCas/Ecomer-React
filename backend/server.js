import express from 'express';
import cors from 'cors';
import "./db/db.js";
import productosRoutes from './routes/productos.js';
import usuarioRoutes from './routes/usuario.js';
import { loginusuario } from './controllers/login.js';
import obtenerPerfil from './routes/perfil.js'; 
import registrarusuario from './routes/usuario.js';
import RecuperarPassword from './routes/recuperar.js';
import pedidosRoutes from './routes/pedidos.js'

const app = express();

// Habilitar todas las rutas
app.use(cors());
app.use(express.json());

// Primera ruta
app.get('/', (req, res) => {
    res.send('Bienvennido al curso de node express');
});
app.use("/api/producto", productosRoutes);
app.use("/api/usuario", usuarioRoutes);
app.use("/api/login", loginusuario); 
app.use("/api/perfil", obtenerPerfil);
app.use("/api/register", registrarusuario )
app.use('/api/Recuperar', RecuperarPassword);
app.use('/api/pedidos', pedidosRoutes)

app.listen(8081, () => console.log('Servidor corriendo en http://localhost:8081'));

