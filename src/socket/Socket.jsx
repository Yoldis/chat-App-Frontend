// socket.js
import io from 'socket.io-client';

const Socket = (userId) => {
  // http://localhost:8082
  const socket = io("https://chat-app-backend-production-df83.up.railway.app/", {
    extraHeaders: {
      id: userId,
    },
  });


  return socket
}

export default Socket;



