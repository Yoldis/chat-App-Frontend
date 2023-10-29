// import io from 'socket.io-client';
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { SideBarChat, Sugerencias, Chat, NavBarChat, Amigos } from "./index";
import Socket from '../../socket/Socket';
import { SocketOn } from "../../socket/SocketOn";
import { useDispatch } from "react-redux";
import { AuthStore } from "../../hooks";


export const Home = () => {
  const dispatch = useDispatch();
  const{userId} = AuthStore();
  useEffect(() => {
    const socket = Socket(userId);
    socket.on('connect', () => {
      console.log('Conectado');
    });

    SocketOn(socket, dispatch);
   
    return () => {
      socket.disconnect();
      console.log('Desconectado');
    };

  }, []);
  
  

  return (
    <section className="animate__animated animate__fadeIn">
      <NavBarChat />
      <Routes>
        <Route
          path="/chat"
          element={
            <div className={`flex  animate__animated animate__fadeIn`}>
              <SideBarChat />
              <Chat />
            </div>
          }
        />
        <Route path="/chat/sugerencias" element={<Sugerencias />} />
        <Route path="/chat/amigos" element={<Amigos />} />
        <Route path="/*" element={<Navigate to="/chat" />} />
      </Routes>
    </section>
  );
}
