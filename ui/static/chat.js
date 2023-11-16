// static/chat.js

var socket = io.connect('http://' + document.domain + ':' + location.port);

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
