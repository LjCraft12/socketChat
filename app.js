const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    socket = require('socket.io');


const server = app.listen(port, (err) => {
    err ? console.log(`Error connecting to port: ${port}`) : console.log(`Server is running on port: ${port}`)
});

// Set static path
app.use(express.static('public'));

// Socket IO setup and pass in the server
const io = socket(server);
io.on('connection', (socket) => {
    console.log(`Made connection to the socket ${socket.id}`);

// Listen for messages from the client
    socket.on('chat', data => {
        io.sockets.emit('chat', data);
    });
    socket.on('typing', function (data) {
        socket.broadcast.emit(
            'typing',
            data
        )
    })
});
