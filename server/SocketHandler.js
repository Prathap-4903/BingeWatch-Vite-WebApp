import mediasoup from 'mediasoup';
import UserModel from './models/UserModel.js';
// import dotenv from 'dotenv';
// dotenv.config();

// Mediasoup Implementation
let worker;

const createWorker = async () => {
  worker = await mediasoup.createWorker({
    rtcMinPort: 2000,
    rtcMaxPort: 2100,
  })
  console.log(`worker pid ${worker.pid}`);
  
  worker.on('died', error => {
    console.error('mediasoup worker has died');
    setTimeout(() => process.exit(1), 2000);
  });
  
  return worker;
};

(async () => {
  worker = await createWorker();
})();

const mediaCodecs = [
  {
    kind: 'audio',
    mimeType: 'audio/opus',
    clockRate: 48000,
    channels: 2,
  },
  {
    kind: 'video',
    mimeType: 'video/H264',
    clockRate: 90000,
    parameters: {
      'packetization-mode': 1,
      'level-asymmetry-allowed': 1,
      'profile-level-id': '42e01f',
      'x-google-start-bitrate': 1500,
    },
  },
  {
    kind: 'video',
    mimeType: 'video/VP8',
    clockRate: 90000,
    parameters: {
      'x-google-start-bitrate': 1500,
    },
  }
];

const createWebRtcTransport = async (router) => {
  const transportOptions = {
    listenIps: [
      {
        ip: '0.0.0.0',
        announcedIp: process.env.PUBLIC_IP,
      }
    ],
    enableUdp: true,
    enableTcp: true,
    preferUdp: true,
  }

  const transport = await router.createWebRtcTransport(transportOptions);
  console.log(`Created WebRTC Transport ID: ${transport.id}`);

  transport.on('dtlsstatechange', dtlsState => {
    if (dtlsState === 'closed') {
      console.log('DTLS State is closed. Closing transport...');
      transport.close();
    };
  });

  transport.on('close', () => {
    console.log('transport closed');
  });

  return transport;
};

const SocketHandler = (io) => {
  // Variables
  const rooms = new Map();
  const streamRooms = new Map();
  const users = new Map();

  const getSocketIdByUsername = (username) => {
    for (let [socketId, name] of users.entries()) {
      if (name === username) {
        return socketId;
      }
    }
    return null;
  }

  io.on('connection', (socket) => {
    console.log('Client Connected -', socket.id);

    // New User Socket
    socket.on('new-user', (username) => {
      console.log(`${username} Connected With ID - ${socket.id}`);
      users.set(socket.id, username);
    });

    // Create Room
    socket.on('create-room', (roomId, username) => {
      if (rooms.has(roomId)) {
        socket.emit('create-room-response', false);
      } else {
        socket.join(roomId);
        rooms.set(roomId, { host: username, hostSocketId: socket.id, participants: [] });
        console.log(rooms);
        socket.emit('create-room-response', true);
        // users.set(socket.id, username);
        console.log(`Room ${roomId} created by ${username}`);
      }
    });

    // Join Room
    socket.on('join-room', (roomId, username) => {
      console.log("Checking For Room -", rooms);
      console.log("Room ID -", roomId);
      if(!rooms.has(roomId)) {
        socket.emit('join-room-response', false);
      } else {
        console.log(`${username} requested to join room ${roomId}`);
        const hostSocketId = rooms.get(roomId).hostSocketId;
        io.to(hostSocketId).emit('join-request', { username, socketId: socket.id });
        socket.emit('join-room-pending');
      }
    });

    // Accept Join Request
    socket.on('approve-join', ({ roomId, socketId, username }) => {
      if (rooms.has(roomId)) {
        rooms.get(roomId).participants.push(username);
        console.log(rooms);
        // socket.join(roomId);
        // users.set(socketId, username);
        console.log("Users Map -", users);
        io.sockets.sockets.get(socketId).join(roomId);
        console.log("Rooms -", io.sockets.adapter.rooms);
        io.to(socketId).emit('join-room-approved');
        io.to(roomId).emit('users-in-room', Array.from(rooms.get(roomId).participants));
        io.to(socketId).emit('host-name', rooms.get(roomId).host);
      }
    });
    
    // Reject Join Request
    socket.on('reject-join', ({ socketId }) => {
      io.to(socketId).emit('join-room-rejected');
    });

    // Update Host Name in Stream
    socket.on('get-host-name', (roomId) => {
      io.to(roomId).emit('host-name', rooms.get(roomId).host);
    });

    // Chat Message
    socket.on('chat-message', ({ roomId, message }) => {
      io.to(roomId).emit('chat-message', { sender: socket.id, username: users.get(socket.id), message });
    });

    // Add Friend Request
    socket.on('friend-request', async ({ senderId, receiverId }) => {
      try {
        const sender = await UserModel.findById(senderId);
        const receiver = await UserModel.findById(receiverId);
        const senderUsername = sender.username;
        const receiverUsername = receiver.username;
        if (receiver.friendRequests == null || !receiver.friendRequests.includes(senderId)) {
          receiver.friendRequests.push(senderId);
          await receiver.save();
          console.log(`Friend request sent from ${senderId} to ${receiverId}`);
        }

        const senderSocketId = getSocketIdByUsername(senderUsername);
        const receiverSocketId = getSocketIdByUsername(receiverUsername);
        if (receiverSocketId) {
          io.to(receiverSocketId).emit('pending-friend-request', ({ senderId, senderUsername }));
        }
      } catch(err) {
        console.error('Friend Request Error:', err);
      }
    })

    // Accept Friend Request
    socket.on('accept-friend-request', async ({ senderId, receiverId }) => {
      try {
        const sender = await UserModel.findById(senderId);
        const receiver = await UserModel.findById(receiverId);
    
        if (!sender || !receiver) return;
    
        // Add each other to friends
        if (!receiver.friends.includes(senderId)) {
          receiver.friends.push(senderId);
        }
    
        if (!sender.friends.includes(receiverId)) {
          sender.friends.push(receiverId);
        }
    
        // Remove from friendRequests list
        receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== senderId);
    
        await receiver.save();
        await sender.save();
    
        console.log(`${receiver.username} accepted ${sender.username}'s friend request`);
    
        // Notify sender about acceptance
        const senderSocketId = getSocketIdByUsername(sender.username); // your helper
        if (senderSocketId) {
          io.to(senderSocketId).emit('friend-request-accepted', {
            username: receiver.username,
            userId: receiverId
          });
        }
      } catch (err) {
        console.error('Error in accepting friend request:', err);
      }
    });

    // Reject Friend Request
    socket.on('reject-friend-request', async ({ senderId, receiverId }) => {
      try {
        const receiver = await UserModel.findById(receiverId);
        if (!receiver) return;
      
        // Remove from friendRequests list
        receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== senderId);
        await receiver.save();
      
        console.log(`${receiver.username} rejected ${senderId}'s friend request`);
      
        // Optional: Notify sender
        const sender = await UserModel.findById(senderId);
        const senderSocketId = getSocketIdByUsername(sender.username);
        if (senderSocketId) {
          io.to(senderSocketId).emit('friend-request-rejected', {
            username: receiver.username,
            userId: receiverId
          });
        }
      
      } catch (err) {
        console.error('Error in rejecting friend request:', err);
      }
    });

    // Mediasoup Client Start
    socket.on('start-mc', async (roomId, callback) => {
      try {
        if (!streamRooms.has(roomId)) {
          const router = await worker.createRouter({ mediaCodecs });
          streamRooms.set(roomId, {
            router,
            peers: new Map()
          });
          console.log(`Router created for room ${roomId} with ID: ${router.id}`);
        }
        
        const room = streamRooms.get(roomId);
        room.peers.set(socket.id, {
          socket,
          producerTransport: null,
          consumerTransport: null,
          producers: new Map(), // key: track kind ('video', 'audio', 'screen'), value: producer
          consumers: []
        });
        
        // Store router inside closure (not global now!)
        const router = room.router;
        const rtpCapabilities = router.rtpCapabilities;

        // Check before calling
        if (typeof callback === 'function') {
          callback({ rtpCapabilities });
        } else {
          console.warn(`Expected callback not provided for 'roomId' by socket ${socket.id}`);
        }
        } catch(err) {
          console.error('Room ID error:', err);
        }
    });   

    // Create Transport
    socket.on('createWebRtcTransport', async ({ roomId, sender }, callback) => {
      try {
        const room = streamRooms.get(roomId);
        if (!room) return;
        
        const router = room.router;
        const transport = await createWebRtcTransport(router);
        
        const peer = room.peers.get(socket.id);
        if (sender) {
          peer.producerTransport = transport;
        } else {
          peer.consumerTransport = transport;
        }
        
        callback({
          params: {
            id: transport.id,
            iceParameters: transport.iceParameters,
            iceCandidates: transport.iceCandidates,
            dtlsParameters: transport.dtlsParameters,
          }
        });
      } catch (err) {
        console.error('Create WebRTC Transport error:', err);
        callback({ params: { error: 'Failed to create webrtc transport' } });
      }
    });

    // Connect Transport
    socket.on('transport-connect', async ({ roomId, dtlsParameters }) => {
      try {
        const room = streamRooms.get(roomId);
        const peer = room.peers.get(socket.id);
        await peer.producerTransport.connect({ dtlsParameters });
      } catch (err) {
        console.error('Transport Connect error:', err);
      }
    });

    // Transport Produce
    socket.on('transport-produce', async ({ roomId, kind, rtpParameters, type }, callback) => {
      try {
        const room = streamRooms.get(roomId);
        const peer = room.peers.get(socket.id);
        
        const producer = await peer.producerTransport.produce({ kind, rtpParameters });
        
        peer.producers.set(type || kind, producer); // type: 'mic', 'webcam', 'screen'
        
        console.log(`New Producer [${type || kind}] ID: ${producer.id}`);
        
        producer.on('transportclose', () => {
          console.log(`Producer [${type || kind}] transport closed`);
          producer.close();
        });
        
        callback({ id: producer.id });
        
        // Notify others
        for (let [otherId, otherPeer] of room.peers.entries()) {
          if (otherId !== socket.id) {
            otherPeer.socket.emit('new-producer', {
              producerId: producer.id,
              producerPeerId: socket.id,
              kind,
              type: type || kind
            });
          }
        }
      } catch(err) {
        console.error('Transport Produce error:', err);
        callback({ params: { error: 'Failed to Transport Produce' } });
      }
    });

    // Receive Transport Connect
    socket.on('transport-recv-connect', async ({ roomId, dtlsParameters }) => {
      try {
        const room = streamRooms.get(roomId);
        const peer = room.peers.get(socket.id);
        await peer.consumerTransport.connect({ dtlsParameters });
      } catch(err) {
        console.error('Transport Receive Connect error:', err);
      }
    });

    // Consume
    socket.on('consume', async ({ roomId, rtpCapabilities }, callback) => {
      try {
        const room = streamRooms.get(roomId);
        const peer = room.peers.get(socket.id);
        
        const consumers = [];
        
        for (let [otherPeerId, otherPeer] of room.peers.entries()) {
          if (otherPeerId === socket.id || otherPeer.producers.size === 0) continue;
        
          for (let [type, producer] of otherPeer.producers.entries()) {
            if (room.router.canConsume({ producerId: producer.id, rtpCapabilities })) {
              const consumer = await peer.consumerTransport.consume({
                producerId: producer.id,
                rtpCapabilities,
                paused: true,
              });
        
              consumer.on('transportclose', () => console.log(`Consumer for ${type} closed`));
              consumer.on('producerclose', () => console.log(`Producer for ${type} closed`));
        
              if (!peer.consumers) peer.consumers = [];
              peer.consumers.push(consumer);
        
              consumers.push({
                id: consumer.id,
                producerId: producer.id,
                kind: consumer.kind,
                type,
                rtpParameters: consumer.rtpParameters,
              });
            }
          }
        }      
        
        if (consumers.length === 0) {
          return callback({ params: { error: 'No consumable producers found' } });
        }
        
        callback({ consumers }); // send back an array of consumer params
      } catch(err) {
        console.error('Consume error:', err);
        callback({ params: { error: 'Failed to consume' } });
      }
    });

    // Consume Resume
    socket.on('consumer-resume', async ({ roomId }) => {
      try {
        const room = streamRooms.get(roomId);
        const peer = room.peers.get(socket.id);
        
        if (peer.consumers && peer.consumers.length > 0) {
          for (let consumer of peer.consumers) {
            await consumer.resume();
          }
        }
      } catch(err) {
        console.error('Consumer Resume error:', err);
      }
    });

    // Explicit Disconnect
    socket.on('explicit-disconnect', ({ roomId }) => {
      console.log(`Explicit disconnect from ${socket.id} in room ${roomId}`);

      // The cleanup logic is already in the 'disconnect' handler,
      // but we can trigger it explicitly here if needed
      const room = streamRooms.get(roomId);
      if (room) {
        const peer = room.peers.get(socket.id);
        if (peer) {
          // Close producer and transport
          for (let producer of peer.producers.values()) {
            producer.close();
          }
          if (peer.consumers) {
            for (let consumer of peer.consumers) {
              consumer.close();
            }
          }
        
          if (peer.producerTransport) {
            peer.producerTransport.close();
          }
        
          if (peer.consumerTransport) {
            peer.consumerTransport.close();
          }
        
          room.peers.delete(socket.id); // Remove peer from room
        
          console.log(`Peer explicitly removed from room ${roomId}`);
        
          // If room is empty, delete it
          if (room.peers.size === 0) {
            streamRooms.delete(roomId);
            console.log(`Room ${roomId} deleted (no more peers)`);
          }
        }
      }

      socket.leave(roomId);
    });

    // Socket Disconnect
    socket.on('disconnect', () => {
      console.log('Client Disconnected -', socket.id);

      // users.delete(socket.id);
      socket.rooms.forEach(room => socket.leave(room));

      // Remove user from rooms
      rooms.forEach((room, roomId) => {
        if (room.participants.includes(users.get(socket.id))) {
          room.participants = room.participants.filter((participant) => participant !== users.get(socket.id));
          io.to(roomId).emit('users-in-room', room.participants);
        }
      });

      // Loop through all rooms
      for (const [roomId, room] of streamRooms.entries()) {
        const peer = room.peers.get(socket.id);
        if (peer) {
          // Close producer and transport
          for (let producer of peer.producers.values()) {
            producer.close();
          }
          if (peer.consumers) {
            for (let consumer of peer.consumers) {
              consumer.close();
            }
          }

          if (peer.producerTransport) {
            peer.producerTransport.close();
          }
      
          if (peer.consumerTransport) {
            peer.consumerTransport.close();
          }
      
          room.peers.delete(socket.id); // Remove peer from room
      
          console.log(`Peer removed from room ${roomId}`);
      
          // If room is empty, delete it
          if (room.peers.size === 0) {
            streamRooms.delete(roomId);
            console.log(`Room ${roomId} deleted (no more peers)`);
          }
      
          break; // Done, exit loop
        }
      }
      
      socket.leaveAll(); // Leave all joined rooms (clean up socket.io side)
    });
  });
};

export default SocketHandler;