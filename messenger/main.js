const socket = require('socket.io'),
      http = require('http'),
      path = require('path'),
      fs = require('fs'),
      port = 3000,
      colors = require('colors');

const appServer = http.createServer((req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

const io = socket(appServer);
let users = [];

io.on('connection', (socket) => {
    
    socket.on('new-connection', (data) => {
        users[socket.id] = data.username;

        socket.emit('welcome-message', {
            user: 'server',
            message: `Welcome to the chat ${data.username}! They are ${Object.keys(users).length} users connected.`
        });
        socket.broadcast.emit('new-connection-event', {
            user: 'server',
            message: `${data.username}  is connected!`
        });

        socket.on('disconnect', () => {
            socket.broadcast.emit('disconnected', {
                user: 'server',
                message: `${data.username}  disconnected!`
            });
        });
    });

    socket.on('new-message', (data) => {
        socket.broadcast.emit('broadcast-message', {
            user: users[data.user],
            message: data.message
        });
    });
});

appServer.listen(port, () => {
    console.log(colors.blue(`Server running at localhost:${port}`));
});

