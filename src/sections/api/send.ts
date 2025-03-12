import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  const RESEND_API_KEY = "re_QyijZ3QX_FuWVZ9E4AfBBdxoqQE2qvRqJ"
  try {
    const { email, subject, message } = await request.json();

    if (!email || !subject || !message) {
      return new Response(JSON.stringify({ error: "Todos los campos son obligatorios" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const respuesta = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'rolando.casapaico@tecsup.edu.pe',
        to: [email],
        subject,
        html: `<p>${message}</p>`
      })
    });

    if (!respuesta.ok) {
      return new Response(JSON.stringify({ error: "Error al enviar el correo" }), {
        status: respuesta.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true, message: "Correo enviado correctamente" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
