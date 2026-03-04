import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const enviarConfirmacionPedido = async ({ email, nombre, pedido }) => {
    const productosHTML = pedido.productos
        .map(
            (p) => `
            <tr>
                <td style="padding: 10px; border-bottom: 1px solid #f0f0f0;">${p.nombre}</td>
                <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; text-align:center;">${p.cantidad}</td>
                <td style="padding: 10px; border-bottom: 1px solid #f0f0f0; text-align:right;">
                    ${new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", minimumFractionDigits: 0 }).format(p.precio * p.cantidad)}
                </td>
            </tr>`
        )
        .join("");

    const totalFormateado = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
    }).format(pedido.total);

    const mailOptions = {
        from: `"TechStore Pro" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "✅ Confirmación de tu pedido - TechStore Pro",
        html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; padding: 20px;">
            
            <div style="background: linear-gradient(to right, #2563eb, #9333ea); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">TechStore Pro</h1>
                <p style="color: #e0e7ff; margin: 8px 0 0;">Confirmación de pedido</p>
            </div>

            <div style="background: white; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                
                <h2 style="color: #111827;">¡Hola, ${nombre}! 🎉</h2>
                <p style="color: #6b7280;">Tu pedido ha sido recibido exitosamente. Aquí tienes el resumen:</p>

                <div style="background: #f3f4f6; border-radius: 8px; padding: 16px; margin: 20px 0;">
                    <p style="margin: 4px 0; color: #374151;"><strong>📦 ID Pedido:</strong> ${pedido.pedidoId}</p>
                    <p style="margin: 4px 0; color: #374151;"><strong>📍 Dirección:</strong> ${pedido.direccion}, ${pedido.ciudad}</p>
                    <p style="margin: 4px 0; color: #374151;"><strong>💳 Método de pago:</strong> ${pedido.metodo_pago}</p>
                    <p style="margin: 4px 0; color: #374151;"><strong>📅 Fecha:</strong> ${new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}</p>
                </div>

                <h3 style="color: #111827; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">Productos</h3>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="background: #f9fafb;">
                            <th style="padding: 10px; text-align:left; color: #6b7280; font-size: 13px;">Producto</th>
                            <th style="padding: 10px; text-align:center; color: #6b7280; font-size: 13px;">Cant.</th>
                            <th style="padding: 10px; text-align:right; color: #6b7280; font-size: 13px;">Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${productosHTML}
                    </tbody>
                </table>

                <div style="background: #eff6ff; border-radius: 8px; padding: 16px; margin-top: 20px; display: flex; justify-content: space-between;">
                    <span style="font-weight: bold; color: #1e40af; font-size: 18px;">Total</span>
                    <span style="font-weight: bold; color: #1e40af; font-size: 18px;">${totalFormateado}</span>
                </div>

                <p style="color: #6b7280; margin-top: 24px; font-size: 14px;">
                    Pronto nos pondremos en contacto contigo para coordinar la entrega. 
                    Si tienes alguna pregunta, responde a este correo.
                </p>

                <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                    <p style="color: #9ca3af; font-size: 12px;">© 2025 TechStore Pro · Todos los derechos reservados</p>
                </div>
            </div>
        </div>
        `,
    };

    await transporter.sendMail(mailOptions);
};