import { io } from "socket.io-client";

const Socket = io("http://localhost:5000"); // Only create once
export default Socket;