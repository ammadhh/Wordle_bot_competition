// static/chat.js

var socket = io.connect('http://' + document.domain + ':' + location.port);

document.getElementById('join-chat-btn').addEventListener('click', function() {
    document.getElementById('chat-box').style.display = 'block'; // Show the chatbox
    this.style.display = 'none'; // Optionally hide the 'Join Chat' button
});

socket.on('connect', function() {
    socket.send('User has connected!');
});

socket.on('message', function(msg) {
    console.log('Received message: ' + msg);
    document.getElementById('chat-box').innerHTML += '<div>' + msg + '</div>';
});

function sendMessage() {
    var input = document.getElementById('user-chat');
    socket.send(input.value);
    input.value = '';
}
