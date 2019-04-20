// Make connection to IO on frontend
const port = 3000;
const socket = io.connect(`http://localhost:${port}`),
    handle = document.getElementById('handle'),
    message = document.getElementById('message'),
    sendButton = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emmit event on send
sendButton.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});
message.addEventListener('keypress', () => {
   socket.emit('typing', handle.value);
});

// Listen for events on front end
socket.on('chat', data => {
    feedback.innerHTML = '';
    output.innerHTML += `<p><strong>${data.handle}</strong> ${data.message}</p>`
});
socket.on('typing', function(data)  {
    feedback.innerHTML = `<p class="feedback"><em>${data}</em> is typing a message...</p>`;
    console.log(data)
});
