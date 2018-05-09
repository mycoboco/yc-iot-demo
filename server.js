var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var datas = []


server.listen(8080, function () {
    console.log('server listening');
});

app.get('/', function (req, res) {
    res.sendFile(__dirname+'/view.html');
});

app.get('/data', function (req, res) {
    res.send(datas);
});

app.get('/sensor', function (req, res) {
    res.sendFile(__dirname+'/light.html');
});

io.on('connection', function (socket) {
    var count = 0;
    console.log('sensor connected');
    socket.on('light', function (data) {
        datas.push({ x: count++, y: +data });
        datas = datas.slice(Math.max(datas.length - 100, 0));
    })
});
