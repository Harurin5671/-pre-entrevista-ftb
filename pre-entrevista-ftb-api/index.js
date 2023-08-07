const express = require('express')
const axios = require('axios')
const app = express()
const PORT = 3000

const token = 'apis-token-5145.6AoBs1koRsVKgvQGZ7xF1YEQ7Dz4CfnH'

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // Cambia esto al dominio real de tu frontend
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/tipo-cambio-fecha/:fecha', (req, res) => {
  const fecha = req.params.fecha;

  axios({
    method: 'GET',
    url: `https://api.apis.net.pe/v2/sunat/tipo-cambio?date=${fecha}`,
    headers: {
      Referer: 'https://apis.net.pe/tipo-de-cambio-sunat-api',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      const tipoCambioSunat = response.data;
      res.json(tipoCambioSunat);
    })
    .catch((error) => {
      console.error('Error fetching tipo de cambio:', error.stack);
      res.status(500).json({ error: 'Error fetching tipo de cambio' });
    });
});

app.get('/tipo-cambio', (req, res) => {
  axios({
    method: 'GET',
    url: 'https://api.apis.net.pe/v1/tipo-cambio-sunat',
    headers: {
      Referer: 'https://apis.net.pe/tipo-de-cambio-sunat-api',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      const tipoCambioSunat = response.data
      res.json(tipoCambioSunat)
    })
    .catch((error) => {
      console.error('Error al obtener los tipos de cambio:', error.message)
      res.status(500).json({ error: 'Error al obtener los tipos de cambio' })
    })
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
