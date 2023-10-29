// socket.js
import io from 'socket.io-client';

const Socket = (userId) => {
  // https://chat-app-backend-production-df83.up.railway.app/ 
  const socket = io("http://localhost:8082", {
    extraHeaders: {
      id: userId,
    },
  });


  return socket
}

export default Socket;



