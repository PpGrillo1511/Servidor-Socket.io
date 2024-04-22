const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: { origin: '*' }
});

// Manejar la conexión de clientes
io.on('connection', (socket) => {
    console.log('Se ha conectado un cliente');

    // Manejar la desconexión de clientes
    socket.on('disconnect', () => {
        console.log('Se ha desconectado un cliente');
    });
});

// Manejar las solicitudes de actualización del nivel de agua
app.get('/update_water_level', (req, res) => {
    const waterLevel = req.query.level;

    // Emitir el nivel de agua a todos los clientes conectados
    io.emit('water_level', waterLevel);

    console.log('Nivel de agua actualizado:', waterLevel);
    res.send('OK');
});

// Manejar las solicitudes de actualización del potenciómetro
app.get('/update_pot', (req, res) => {
    const potValue = req.query.value;

    // Emitir el valor del potenciómetro a todos los clientes conectados
    io.emit('pot_value', potValue);

    console.log('Valor del potenciómetro actualizado:', potValue);
    res.send('OK');
});

// Manejar las solicitudes de actualización de la distancia
app.get('/update_distance', (req, res) => {
    const distance = req.query.distance;

    // Emitir la distancia a todos los clientes conectados
    io.emit('distance', distance);

    console.log('Distancia actualizada:', distance);
    res.send('OK');
});

// Iniciar el servidor
server.listen(PORT, () => {
    console.log(`Servidor HTTP y Socket.IO en línea en el puerto ${PORT}`);
});
