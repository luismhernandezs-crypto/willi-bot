const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

// ── CONFIGURACIÓN ──────────────────────────────────────────────
const VERIFY_TOKEN = 'willi2024';          // Cambia esto si quieres
const PHONE_NUMBER_ID = 'TU_PHONE_NUMBER_ID';  // Lo obtienes en Meta
const ACCESS_TOKEN = 'TU_ACCESS_TOKEN';        // Lo obtienes en Meta

// ── CATÁLOGO WILLI IMPORTACIONES ───────────────────────────────
const catalogo = [
  { codigo: 'M333', descripcion: 'LIN ID 13A', aplicacion: 'FORD EXPLORER, RANGER, TRANSIT 150, 250, 350', cantidad: 2, precio: 134000 },
  { codigo: 'M341', descripcion: 'LIN ID 5', aplicacion: 'SUBARU FORESTER', cantidad: 2, precio: 134000 },
  { codigo: 'M403', descripcion: 'IM843', aplicacion: 'CATERPILLAR 24V', cantidad: 2, precio: 62000 },
  { codigo: 'M406', descripcion: 'IY020', aplicacion: 'HYUNDAI, CANTER 24V', cantidad: 2, precio: 63000 },
  { codigo: 'M407', descripcion: 'VR-MD14B', aplicacion: 'HYUNDAI KIA 24V', cantidad: 1, precio: 63000 },
  { codigo: 'M410', descripcion: 'IM848', aplicacion: 'MITSUBISHI CANTER 24V', cantidad: 1, precio: 63000 },
  { codigo: 'M413', descripcion: 'IM691', aplicacion: 'VOLVO 24V A004TA8191', cantidad: 1, precio: 128000 },
  { codigo: 'N063', descripcion: 'DENSO HONDA 126600-0140', aplicacion: 'HONDA', cantidad: 1, precio: 88000 },
  { codigo: 'N071', descripcion: 'IN6302', aplicacion: 'TOYOTA RAV4, CAMRY, COROLLA, LEXUS RX350', cantidad: 1, precio: 108000 },
  { codigo: 'N083', descripcion: 'IN6385', aplicacion: 'ISUZU D-MAX 2.5 2002-2016', cantidad: 2, precio: 93000 },
  { codigo: 'N085', descripcion: 'ND1214', aplicacion: 'ISUZU D-MAX 3.0 CC DIESEL 2002-2018', cantidad: 2, precio: 93000 },
  { codigo: 'N091', descripcion: 'REGULADOR', aplicacion: 'HYUNDAI TUCSON 2.4L 2018-2021 / KIA SPORTAGE 2017-2020', cantidad: 2, precio: 115000 },
  { codigo: 'N302', descripcion: 'IN7700', aplicacion: 'TOYOTA COROLLA', cantidad: 2, precio: 128000 },
  { codigo: 'N323', descripcion: 'LIN ID 41', aplicacion: 'TOYOTA TACOMA V6 3.5L DENSO', cantidad: 2, precio: 115000 },
  { codigo: 'N346', descripcion: 'LIN ID 224', aplicacion: 'SUZUKI S-CROSS VITARA 1.6', cantidad: 1, precio: 125000 },
  { codigo: 'N351', descripcion: 'LIN ID 9', aplicacion: 'TOYOTA RAV4, TOYOTA COROLLA', cantidad: 2, precio: 134000 },
  { codigo: 'N352', descripcion: 'LIN ID 9A', aplicacion: 'TOYOTA YARIS, TOYOTA COROLLA', cantidad: 2, precio: 134000 },
  { codigo: 'N353', descripcion: 'LIN ID 1', aplicacion: 'TOYOTA RAV4', cantidad: 2, precio: 134000 },
  { codigo: 'N354', descripcion: 'LIN ID 98', aplicacion: 'SUBARU IMPREZA XV GT2-GT3, IMPREZA SPORT', cantidad: 2, precio: 134000 },
  { codigo: 'N371', descripcion: 'LIN ID 244', aplicacion: 'HONDA ACCORD, ACURA', cantidad: 2, precio: 123000 },
  { codigo: 'N408', descripcion: 'REGULADOR 24V', aplicacion: 'HINO 300, HINO 500, HINO DUTRO', cantidad: 2, precio: 88000 },
  { codigo: 'V001', descripcion: 'M535', aplicacion: 'HYUNDAI TUCSON, VERNA, ACCENT / KIA RIO, SPORTAGE', cantidad: 1, precio: 105000 },
  { codigo: 'V003', descripcion: 'REGULADOR', aplicacion: 'KIA SORENTO 4 PINES, OPIRUS', cantidad: 2, precio: 92000 },
  { codigo: 'V011', descripcion: 'REGULADOR', aplicacion: 'HYUNDAI i30, AVANTE HD 1.6 / KIA SOUL 1.6', cantidad: 2, precio: 92000 },
  { codigo: 'V012', descripcion: 'M612', aplicacion: 'HYUNDAI Y KIA AVANTE, VELOSTER, ACCENT, SOUL 2.0', cantidad: 1, precio: 94000 },
  { codigo: 'V015', descripcion: 'M549', aplicacion: 'DUSTER, LOGAN, SANDERO, PEUGEOT, CITROEN', cantidad: 2, precio: 94000 },
  { codigo: 'V203', descripcion: 'ARE3121 / BSS ID 40', aplicacion: 'MINI COOPER, PEUGEOT 207, 208', cantidad: 2, precio: 128000 },
  { codigo: 'V221', descripcion: 'BSS ID 48', aplicacion: 'BMW 520, 525, 530 / AUDI A6', cantidad: 2, precio: 128000 },
  { codigo: 'V233', descripcion: 'BSS ID 56', aplicacion: 'RENAULT KANGOO, MEGANE, TWINGO, WIND', cantidad: 1, precio: 128000 },
  { codigo: 'V333', descripcion: 'LIN ID 121', aplicacion: 'RENAULT KWID, CLIO, SANDERO, LOGAN 1.0', cantidad: 2, precio: 118000 },
  { codigo: 'V401', descripcion: 'HCANTER 24V', aplicacion: 'CANTER 24V', cantidad: 1, precio: 73000 },
  { codigo: 'DDRH602', descripcion: 'PORTADIODO Y REGULADOR', aplicacion: 'SANTAFE, TUCSON, MURANO', cantidad: 2, precio: 178000 },
  { codigo: 'DDN504', descripcion: 'RECTIFICADOR', aplicacion: 'TOYOTA LEXUS', cantidad: 1, precio: 109000 },
  { codigo: 'DDN531', descripcion: 'INR438 PORTADIODOS', aplicacion: 'TOYOTA HILUX VIGO DIESEL', cantidad: 2, precio: 88000 },
  { codigo: 'P2302', descripcion: 'AUTOMATICO 860', aplicacion: 'AVEO', cantidad: 2, precio: 88000 },
  { codigo: 'P2327', descripcion: 'AUTOMATICO', aplicacion: 'HYUNDAI ACCENT DIESEL, i20, iX20 1.4-1.6', cantidad: 2, precio: 98000 },
];

// ── ESTADO DE CONVERSACIONES ───────────────────────────────────
const sesiones = {};

function formatPrecio(n) {
  return '$' + n.toLocaleString('es-CO');
}

// ── LÓGICA DEL CHATBOT ─────────────────────────────────────────
function procesarMensaje(from, texto) {
  const msg = texto.trim().toUpperCase();
  const sesion = sesiones[from] || { estado: 'menu' };

  let respuesta = '';

  // Buscar por código directamente
  if (sesion.estado === 'esperando_codigo') {
    const producto = catalogo.find(p => p.codigo === msg);
    if (producto) {
      respuesta =
        `✅ *Producto encontrado*\n\n` +
        `🔖 Código: *${producto.codigo}*\n` +
        `📋 Descripción: ${producto.descripcion}\n` +
        `🚗 Aplicación: ${producto.aplicacion}\n` +
        `📦 Disponible: ${producto.cantidad} unidad(es)\n` +
        `💰 Precio: *${formatPrecio(producto.precio)}*\n\n` +
        `Para más información escribe *MENU* o comunícate con un asesor.`;
    } else {
      respuesta =
        `❌ No encontré el código *${msg}* en nuestro inventario.\n\n` +
        `Verifica el código e intenta de nuevo, o escribe *MENU* para ver otras opciones.`;
    }
    sesiones[from] = { estado: 'menu' };
    return respuesta;
  }

  // Buscar por marca
  if (sesion.estado === 'esperando_marca') {
    const resultados = catalogo.filter(p =>
      p.aplicacion.toUpperCase().includes(msg)
    );
    if (resultados.length > 0) {
      respuesta = `🚗 *Reguladores disponibles para ${msg}:*\n\n`;
      resultados.slice(0, 5).forEach(p => {
        respuesta += `🔖 *${p.codigo}* — ${p.descripcion}\n`;
        respuesta += `   ${p.aplicacion}\n`;
        respuesta += `   💰 ${formatPrecio(p.precio)} | 📦 ${p.cantidad} und\n\n`;
      });
      if (resultados.length > 5) {
        respuesta += `_...y ${resultados.length - 5} más. Escribe el código exacto para ver detalles._\n\n`;
      }
      respuesta += `Para cotizar por código escribe *CODIGO* o escribe *MENU*.`;
    } else {
      respuesta =
        `😕 No encontré reguladores para *${msg}* en este momento.\n\n` +
        `Escribe *ASESOR* para hablar con un agente o *MENU* para volver al inicio.`;
    }
    sesiones[from] = { estado: 'menu' };
    return respuesta;
  }

  // Menú principal
  if (msg === 'MENU' || msg === 'HOLA' || msg === 'BUENAS' || msg === 'INICIO' || msg === 'START' || msg === '1') {
    sesiones[from] = { estado: 'menu' };
    respuesta =
      `👋 ¡Bienvenido a *Willi Importaciones S.A.S.*!\n` +
      `Somos especialistas en reguladores y repuestos eléctricos para tu vehículo. ⚡\n\n` +
      `¿En qué te puedo ayudar?\n\n` +
      `1️⃣ *INVENTARIO* — Ver catálogo completo\n` +
      `2️⃣ *CODIGO* — Cotizar por código de repuesto\n` +
      `3️⃣ *MARCA* — Buscar por marca de vehículo\n` +
      `4️⃣ *ASESOR* — Hablar con un asesor\n\n` +
      `_Escribe el número o la palabra clave_`;
    return respuesta;
  }

  if (msg === 'INVENTARIO' || msg === '2' || msg === 'VER INVENTARIO') {
    respuesta = `📦 *Catálogo Willi Importaciones*\n\n`;
    catalogo.forEach(p => {
      respuesta += `🔖 *${p.codigo}* — ${formatPrecio(p.precio)}\n`;
      respuesta += `   ${p.aplicacion}\n\n`;
    });
    respuesta += `Para ver detalles de un producto escribe *CODIGO* y luego el código del repuesto.`;
    sesiones[from] = { estado: 'menu' };
    return respuesta;
  }

  if (msg === 'CODIGO' || msg === '2') {
    sesiones[from] = { estado: 'esperando_codigo' };
    respuesta =
      `🔍 *Cotizar por código*\n\n` +
      `Escribe el código del repuesto que buscas.\n` +
      `Ejemplo: *N091*, *V015*, *M333*`;
    return respuesta;
  }

  if (msg === 'MARCA' || msg === '3') {
    sesiones[from] = { estado: 'esperando_marca' };
    respuesta =
      `🚗 *Buscar por marca*\n\n` +
      `Escribe la marca de tu vehículo.\n` +
      `Ejemplo: *TOYOTA*, *HYUNDAI*, *KIA*, *FORD*, *RENAULT*`;
    return respuesta;
  }

  if (msg === 'ASESOR' || msg === '4') {
    sesiones[from] = { estado: 'menu' };
    respuesta =
      `📞 *Contacto con asesor*\n\n` +
      `Un asesor de *Willi Importaciones* te atenderá en breve.\n\n` +
      `🕐 Horario de atención:\n` +
      `Lunes a Viernes: 8:00am — 6:00pm\n` +
      `Sábados: 8:00am — 1:00pm\n\n` +
      `Escribe *MENU* para volver al inicio.`;
    return respuesta;
  }

  // Respuesta por defecto
  sesiones[from] = { estado: 'menu' };
  respuesta =
    `No entendí tu mensaje 😅\n\n` +
    `Escribe *MENU* para ver las opciones disponibles.`;
  return respuesta;
}

// ── WEBHOOK VERIFICACIÓN ───────────────────────────────────────
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ── RECIBIR MENSAJES ───────────────────────────────────────────
app.post('/webhook', async (req, res) => {
  res.sendStatus(200);
  try {
    const entry = req.body.entry?.[0];
    const changes = entry?.changes?.[0];
    const message = changes?.value?.messages?.[0];
    if (!message || message.type !== 'text') return;

    const from = message.from;
    const texto = message.text.body;
    const respuesta = procesarMensaje(from, texto);

    await axios.post(
      `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: 'whatsapp',
        to: from,
        type: 'text',
        text: { body: respuesta },
      },
      { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
    );
  } catch (err) {
    console.error('Error:', err.message);
  }
});

app.get('/', (req, res) => res.send('Willi Importaciones Bot activo ✅'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Bot corriendo en puerto ${PORT}`));
