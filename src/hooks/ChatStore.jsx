import { useDispatch, useSelector } from "react-redux";
import {
  onCloseChat,
  onGetAmigos,
  onGetSolicitudes,
  onGetSugerencias,
  onLogoutChat,
  onSearchAmigo,
  onSearchSugerencias,
} from "../store/chatSlice";
import {
  getAmigos,
  getSolicitudes,
  getSugerenciasApi,
} from "../api/chatProvider";

export const ChatStore = () => {
  const {
    sugerencias,
    solicitud,
    amigos,
    isLoadingAgregarAmigo,
    isLoadinDeleteSolicitud,
    notificacionSolicitud,
    isLoadinAceptSolicitud,
    isLoadingEliminarAmigo,
    chatActivo,
    mensajes,
    isLoadingEscribiendo,
    amigosChat,
    sugerenciasChat
  } = useSelector((state) => state.chat);
  const dispatch = useDispatch();


  const startGetSugerencias = async (userId) => {
    const { ok, data } = await getSugerenciasApi(userId);
    if (!ok) {
      // Retornar mensajes de Error
      return;
    }
    dispatch(onGetSugerencias(data));
  };


  const startGetSolicitudes = async (userId) => {
    const { ok, data } = await getSolicitudes(userId);
    if (!ok) {
      // Retornar mensajes de Error
      return;
    }
    dispatch(onGetSolicitudes(data));
  };


  const startAmigos = async (userId) => {
    const { ok, data } = await getAmigos(userId);
    if (!ok) {
      // Retornar mensajes de Error
      return;
    }
    dispatch(onGetAmigos(data));
  };


  const startCloseChat = () => {
    dispatch(onCloseChat());
  };
  

  const startSearchAmigo = (payload) => {
    dispatch(onSearchAmigo(payload));
  }

   const startSearchSugerencia = (payload) => {
    dispatch(onSearchSugerencias(payload));
  }

  const startLogoutChat = ()  => {
    dispatch(onLogoutChat());
  }
  
  return {
    sugerencias,
    solicitud,
    amigos,
    isLoadingAgregarAmigo,
    isLoadinDeleteSolicitud,
    isLoadinAceptSolicitud,
    notificacionSolicitud,
    isLoadingEliminarAmigo,
    isLoadingEscribiendo,
    chatActivo,
    mensajes,
    amigosChat,
    sugerenciasChat,

    startGetSugerencias,
    startGetSolicitudes,
    startAmigos,
    startCloseChat,
    startSearchAmigo,
    startSearchSugerencia,
    startLogoutChat
  };
};
