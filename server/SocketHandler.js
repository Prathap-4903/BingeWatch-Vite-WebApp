const SocketHandler = (io) => {
  // Variables
  const rooms = new Map();
  const users = new Map();

    io.on('connection', (socket) => {
        console.log('Client Connected -', socket.id);
    
        socket.on('set-username', (username) => {
            console.log(`${username} Connected With ID - ${socket.id}`);
        });
    
        socket.on('create-room', (roomId, username) => {
          if (rooms.has(roomId)) {
            socket.emit('create-room-response', false);
          } else {
            rooms.set(roomId, { host: username, participants: [] });
            console.log(rooms);
            socket.emit('create-room-response', true);
            socket.join(roomId);
            users.set(socket.id, username);
            console.log(`Room ${roomId} created by ${username}`);
          }
        });
    
        socket.on('join-room', (roomId, username) => {
          if(!rooms.has(roomId)) {
            socket.emit('join-room-response', false);
          } else {
            console.log(`${username} requested to join room ${roomId}`);
            io.to(roomId).emit('join-request', { username, socketId: socket.id });
            socket.emit('join-room-pending'); // Inform the participant the request is sent
          }
        });
    
        socket.on('approve-join', ({ roomId, socketId, username }) => {
            if (rooms.has(roomId)) {
              // Add the participant to the room
              rooms.get(roomId).participants.push(username);
              console.log(rooms);
              // socket.join(roomId);
              users.set(socketId, username);
              console.log("Users Map -", users);
              io.sockets.sockets.get(socketId).join(roomId);
              console.log("Rooms -", io.sockets.adapter.rooms);
              io.to(socketId).emit('join-room-approved'); // Notify participant
              // io.to(roomId).emit('users-in-room', rooms.get(roomId).participants);
              io.to(roomId).emit('users-in-room', Array.from(rooms.get(roomId).participants));
              // io.to(socketId).emit('users-in-room', rooms.get(roomId).participants); // Update room users
              io.to(socketId).emit('host-name', rooms.get(roomId).host); // Update host
            }
        });
        
        socket.on('reject-join', ({ socketId }) => {
          io.to(socketId).emit('join-room-rejected'); // Notify participant
        });
    
        // Update Users in Stream
        socket.on('get-host-name', (roomId) => {
          io.to(roomId).emit('host-name', rooms.get(roomId).host);
        });
    
        socket.on('disconnect', () => {
          console.log('Client Disconnected -', socket.id);
    
          socket.rooms.forEach(room => socket.leave(room));
    
          // Remove user from rooms
          rooms.forEach((room, roomId) => {
            if (room.participants.includes(users.get(socket.id))) {
              room.participants = room.participants.filter((participant) => participant !== users.get(socket.id));
              io.to(roomId).emit('users-in-room', room.participants);
            }
          });
        });
    });
};

export default SocketHandler;

// OLD CODE

/*
io.on('connection', (socket) => {
    console.log('Client Connected -', socket.id);

    socket.on('set-username', (username) => {
        console.log(`${username} Connected With ID - ${socket.id}`);
    });

    socket.on('create-room', (roomId, username) => {
      if (rooms.has(roomId)) {
        socket.emit('create-room-response', false);
      } else {
        rooms.set(roomId, { host: username, participants: [] });
        console.log(rooms);
        socket.emit('create-room-response', true);
        socket.join(roomId);
        users.set(socket.id, username);
        console.log(`Room ${roomId} created by ${username}`);
      }
    });

    socket.on('join-room', (roomId, username) => {
      if(!rooms.has(roomId)) {
        socket.emit('join-room-response', false);
      } else {
        console.log(`${username} requested to join room ${roomId}`);
        io.to(roomId).emit('join-request', { username, socketId: socket.id });
        socket.emit('join-room-pending'); // Inform the participant the request is sent
      }
    });

    socket.on('approve-join', ({ roomId, socketId, username }) => {
        if (rooms.has(roomId)) {
          // Add the participant to the room
          rooms.get(roomId).participants.push(username);
          console.log(rooms);
          // socket.join(roomId);
          users.set(socketId, username);
          console.log("Users Map -", users);
          io.sockets.sockets.get(socketId).join(roomId);
          console.log("Rooms -", io.sockets.adapter.rooms);
          io.to(socketId).emit('join-room-approved'); // Notify participant
          // io.to(roomId).emit('users-in-room', rooms.get(roomId).participants);
          io.to(roomId).emit('users-in-room', Array.from(rooms.get(roomId).participants));
          // io.to(socketId).emit('users-in-room', rooms.get(roomId).participants); // Update room users
          io.to(socketId).emit('host-name', rooms.get(roomId).host); // Update host
        }
    });
    
    socket.on('reject-join', ({ socketId }) => {
      io.to(socketId).emit('join-room-rejected'); // Notify participant
    });

    // Update Users in Stream
    socket.on('get-host-name', (roomId) => {
      io.to(roomId).emit('host-name', rooms.get(roomId).host);
    });

    socket.on('disconnect', () => {
      console.log('Client Disconnected -', socket.id);

      socket.rooms.forEach(room => socket.leave(room));

      // Remove user from rooms
      rooms.forEach((room, roomId) => {
        if (room.participants.includes(users.get(socket.id))) {
          room.participants = room.participants.filter((participant) => participant !== users.get(socket.id));
          io.to(roomId).emit('users-in-room', room.participants);
        }
      });
    });
});
*/