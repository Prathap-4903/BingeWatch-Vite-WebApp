import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
    reconnect: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10,
});  

socket.on('reconnect', () => {
    console.log('Reconnected -', socket.id);
});

export default socket;