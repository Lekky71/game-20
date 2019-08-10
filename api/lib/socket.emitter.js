module.exports.roomEmit = (io, room, key, message) => {
  io.in(room).emit(key, {body: message});
};

module.exports.success = (socket, key, message) => {
  socket.emit(key, {body: message});
};

module.exports.failure = (socket, message) => {
  socket.emit('failure', {error: message});
};

