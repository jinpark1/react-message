
//Export a function
module.exports = (io, Channel) => {
    const channel = new Channel();
    //Connect to socket.io
    io.sockets.on('connection', (err, socket) => {
        if(err) console.log('Connection Error---------', err);
        console.log("Socket id-----------", socket.id);
        socket.on('channelRoom', () => {
            channel.addChannelData(socket.id, id, messages, users);
            //have the socket emit the CONNECT_ROOM emiiter in the frontend.
            io.emit('connectRoom');
        });
        socket.on('disconnect', () => {
            console.log('Socket disconnected!!!!!!!!');
        })
    })
}