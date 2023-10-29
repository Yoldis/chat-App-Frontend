import { useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { onAceptarSolicitud, onAgregarSolicitud, onEliminarAmigo, onEnviarSolicitud, onGetMensajes, onGetSugerencias, onLoadingDataChat, onLogoutChat, onOpenChat, onSetNotificacionSolicitud, onUpdateNotificacionMsg, onUpdateUltimoMsg } from "../store/chatSlice";
import Socket from "./Socket";
import { onLoadingDeleteAccount, onLogoutAuth } from "../store/authSlice";


export const SocketController = (userId) => {

  const dispatch = useDispatch();
  const [socketServer, setSocketServer] = useState(null);

  useEffect(() => {
    const socket = Socket(userId);
    setSocketServer(socket);
    
  }, [])

  // Enviar Solicitud
  const startAgregarAmigo = (amigoId, usuarioId ) => {

    dispatch(onLoadingDataChat({type:'agregarAmigo', id:amigoId}));
    socketServer.emit('agregar-amigo', {usuario:usuarioId, amigo:amigoId}, (payload) => {
      // console.log(payload)
      if(!payload.ok){
        // Retornar Error en la interfaz
        return;
      }

      dispatch(onEnviarSolicitud({...payload.data.amigo, id:payload.data.amigo._id, solicitud:payload.data.solicitud, aceptado:payload.data.aceptado}));
    });
  }

  // Eliminar Solicitud
  const startDeleteSolicitud = async(amigoId, usuarioId) => {

    dispatch(onLoadingDataChat({type:'eliminarSolicitud', id:amigoId}));
    socketServer.emit('eliminar-solicitud', {usuario:usuarioId, amigo:amigoId}, (payload) => {
      if(!payload.ok){
        // Retornar Error en la interfaz
        return;
      }

      dispatch(onAgregarSolicitud({...payload.data.usuario, id:payload.data.usuario._id, solicitud:payload.data.solicitud, aceptado:payload.data.aceptado}));
      dispatch(onGetSugerencias(payload.usuarios));
    });
  };


  // Aceptar Solicitud
  const startAceptarSolicitud = async(amigoId, usuarioId) => {

    dispatch(onLoadingDataChat({type:'aceptarSolicitud', id:amigoId}));
    socketServer.emit('aceptar-solicitud', {usuario:usuarioId, amigo:amigoId}, (payload) => {
      if(!payload.ok){
        // Retornar Error en la interfaz
        return;
      }

      // console.log(payload)
      dispatch(onAceptarSolicitud({...payload.data.usuario, id:payload.data.usuario._id, solicitud:payload.data.solicitud, aceptado:payload.data.aceptado}));

      dispatch(onAgregarSolicitud({...payload.data.usuario, id:payload.data.usuario._id, solicitud:payload.data.solicitud, aceptado:payload.data.aceptado}));
    })
  }


  // Eliminar Amigo
  const startDeleteAmigo = (amigoId, userId) => {
    
    dispatch(onLoadingDataChat({type:'eliminarAmigo', id:amigoId}));
    socketServer.emit('eliminar-amigo', {amigo:amigoId, usuario:userId}, async(payload) => {
      if(!payload.ok){
        // Retornar Error en la interfaz
        return;
      }

      // console.log(payload)
      dispatch(onEliminarAmigo({...payload.data.usuario, id:payload.data.usuario._id, solicitud:false, aceptado:false,amigo:{...payload.data.usuario, id:payload.data.usuario._id, solicitud:false, aceptado:false}}));

    });
  }


  // Restablecer Notificaciones a Cero
  const startResetNotificacion = async(id) => {
    socketServer.emit('reset-notificacion', {id}, (payload) => {
      if(!payload.ok){
        // Retornar Error en la interfaz
        return;
      }

      dispatch(onSetNotificacionSolicitud(payload.data));
    });
  }

  // Enviar Mensaje
  const startSendMensaje = (data) => {
    socketServer.emit('enviar-mensaje', data, (payload) => {
      // console.log(payload)
      if(!payload.ok){
        // Retornar Error en la interfaz
        return;
      }
      
      dispatch(onUpdateUltimoMsg({...payload.data.amigo, id:payload.data.amigo._id, ultimoMsg:payload.data.ultimoMsg, ultimoUserEnChat:payload.data.ultimoUserEnChat}));
      dispatch(onGetMensajes(payload.data.mensajesUsuario));
      dispatch(onUpdateNotificacionMsg({id:payload.id}));

    });
  };

  const startEliminarChat = (data) => {
    socketServer.emit('eliminar-chat', data, (payload) => {
      // console.log(payload)
      if(!payload.ok){
        // Retornar Error en la interfaz
        return;
      }

      dispatch(onGetMensajes(payload.data));
    });
  }


  const startOpenChat = (data, userId) => {
    socketServer.emit('obtener-mensajes', {usuario:userId, amigo:data.id}, (payload) => {
      // console.log(payload)
      if(!payload.ok){
        // Retornar Error en la interfaz
        return;
      }
      dispatch(onGetMensajes(payload.data.mensajesUsuario));
      dispatch(onOpenChat(data));
      dispatch(onUpdateNotificacionMsg({id:payload.id}));
    });
  };


  const startEscribiendo = (usuario, amigo) => {
    socketServer.emit('escribiendo', {usuario, amigo}, (payload) => {
      // console.log(payload)
      if(!payload.ok){
        // Retornar Error en la interfaz
        return;
      }
      
    });
  };
 

  const startEliminarCuenta = (usuario) => {

    dispatch(onLoadingDeleteAccount());
    socketServer.emit('eliminar-cuenta', {usuario}, (payload) => {
      // console.log(payload)
      if(!payload.ok){
        // Retornar Error en la interfaz
        return;
      }
    });
    
    dispatch(onLogoutChat());
    dispatch(onLogoutAuth());
    localStorage.clear();
  };

  return {
    startAgregarAmigo,
    startDeleteSolicitud,
    startResetNotificacion,
    startAceptarSolicitud,
    startDeleteAmigo,
    startSendMensaje,
    startEliminarChat,
    startOpenChat,
    startEscribiendo,
    startEliminarCuenta
  }
}
