import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import user from "../models/usuario.js";

const trasnporte = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
//funcion de generar codigo de 6 digitos 

const generarCodigo = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
//Solicitar codigo de recuperacion 
export const solicitarCodigo = async (req, res) => {
    try {
        const { email } = req.body; 

        if(!email){
            return res.status(400).json({
                message: "El correo electrónico es obligatorio"
            });
        }
        //Buscar usuario 
        const usuario = await user.findOne({ email });

        if(!usuario){
            return res.status(400).json({
                message: "Correo electrónico no encontrado"
            });
        }
        //Generar codigo de 6 digitos
        const codigo = generarCodigo();

        //Guardar código con expiracion de 15 minutos
        usuario.codigoRecuperacion = codigo;
        usuario.codigoExpiracion = Date.now() + 900000; // 15 minutos 
        await usuario.save();
        
        const mailOptions = {
            from: 'juliocastillomendez572@gmail.com',
            to: usuario.email,
            subject: 'Codigo de Recuperacion - TechStore Pro',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;>
                <div style="text-aling: center; margin-bottom: 30px;">
                    <h2 style="color: #4F46E5; margin: 0;">TechStore Pro</h2>
                </div>
                
                <h3 style="color: #333;">Recuperacion de contraseña</h3>

                <p>Hola <strong>${usuario.nombre}</strong>,</p>

                <p>Recibimos una solicitud para restablecer tu contraseña.</p>

                <p>Tu código de verificacion es:</p>

                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                padding: 20px;
                border-radius: 10px;
                text-align: center;
                margin: 30px 0;">
                <h1 style="color: black;
                font-size: 36px;
                letter-spacing: 8px;
                margin: 0;
                font-family: monospace;">
                ${codigo}
                </h1>
                </div>

                <p style="color: #666; font-size: 14px;">⏱️ Este código expirará en <strong> 15 minutos</strong>.
                </p>

                <p style="color: #666; font-size: 14px;"> 🔒 Si no solicitaste este cambio, ignora este email y tu contraseña permanecerá segura.
                </p>

                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

                <p style="color: #999; font-size: 12px; text-align: center;"> Ⓒ 2025 TechStore Pro - Tu tienda de tecnología de confianza.
                </p>
            </div>
            `
        };
        //Enviar email
        await trasnporte.sendMail(mailOptions);

        console.log(`Codigo enviado a ${usuario.email}: ${codigo}`);

        res.status(200).json({
            message: "Si el correo esxiste, recibirás un código de verificación",
        });
    } catch (error) {
        console.error("Error al enviar el código:", error);
        res.status(500).json({
            message: "Error al procesar la solicitud",
            error: error.message
        });
    }
};

//Verificar código y cambiar contraseña
export const cambiarPassword = async (req, res) => {
    try {
        const { email, codigo, nuevaPassword } = req.body;

        //Validaciones 
        if(!email || !codigo || !nuevaPassword) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        if (nuevaPassword.length < 6) {
            return res.status(400).json({
                message: "La contraseña debe tenr al menos 6 caracteres"
            });
        }
        //Buscar usuario
        const usuario = await user.findOne({ email });

        if(!usuario){
            return res.status(400).json({
                message: "Correo electrónico no encontrado"
            });
        }
        //Encriptar nueva contraseña 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(nuevaPassword, salt);

        //Actualizar contraseña y limpiar codigo
        usuario.password = hashedPassword;
        usuario.codigoRecuperacion = undefined;
        usuario.codigoExpiracion = undefined;
        await usuario.save();        

        //Email de confirmacion 

        const mailOptions = {
            from: 'juliocastillomendez572@gmail.com',
            to: usuario.email,
            subject: 'Contraseña Actualizada - TechStore Pro',
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    width: 60px;
                    height: 60px;
                    brorder-radius: 50%;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;">
                    <span style="color: white; font-size; 30px;">✅</span>
                    </div>
                    <h2 style="color: #4f46E5; margin: 0";>Contraseña Actualizada</h2>
                </div>

                <p>Hola <strong>${usuario.nombre}</strong>,</p>

                <p>Tu contraseña ha sido actualizada exitosamente.</p>

                <div style="text-aling: center; margin: 30px 0;">
                    <a href="http://127.0.0.1:5500/src/pages/login.html"
                        style="background: linear-gradient(to right, #4F46E5, #7C3AED);
                        color: white;
                        padding: 12px 30px;
                        text-decoration: none;
                        norder-radius: 8px;
                        display: inline-block;">
                        Iniciar Sesión
                    </a>
                </div>

                <p style="color: #dc2626; font-size: 14px;">⚠️ Si no realizaste este cambio, contacta a soporte inmediatamente.
                </p>

                <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">

                <p style="color: #999; font-size: 12px; text-align: center;"> Ⓒ 2025 TechStore Pro - Tu tienda de tecnología de confianza.
                </p>
            </div>
            `
        };

        await trasnporte.sendMail(mailOptions);
        res.status(200).json({
            message: "Contraseña actualizada exitosamente"
        });
    } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        res.status(500).json({
            message: "Error al cambiar la contraseña",
            error: error.message
        });
    }
};