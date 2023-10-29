import { createSlice } from "@reduxjs/toolkit";
export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    sugerencias: [],
    solicitud: [],
    amigos: [],
    isLoadingAgregarAmigo: null,
    isLoadinDeleteSolicitud: null,
    isLoadinAceptSolicitud: null,
    isLoadingEliminarAmigo: null,
    notificacionSolicitud: 0,
    chatActivo: null,
    mensajes:[],
    isLoadingEscribiendo:null,
    amigosChat:[],
    sugerenciasChat:[]
  },

  reducers: {
    onLoadingDataChat: (state, { payload }) => {
      if (payload.type === "agregarAmigo")
        state.isLoadingAgregarAmigo = payload;
      if (payload.type === "eliminarSolicitud")
        state.isLoadinDeleteSolicitud = payload;
      if (payload.type === "aceptarSolicitud")
        state.isLoadinAceptSolicitud = payload;
      if (payload.type === "eliminarAmigo")
        state.isLoadingEliminarAmigo = payload;

      if (payload.type === "escribiendo")
        state.isLoadingEscribiendo = payload;
    },

    onGetSugerencias: (state, { payload }) => {
      state.sugerencias = payload;
      state.sugerenciasChat = state.sugerencias
    },

    onGetSolicitudes: (state, { payload }) => {
      state.solicitud = payload;
    },

    onGetAmigos: (state, { payload }) => {
      state.amigos = payload;
      state.amigosChat = payload;
    },

    onEnviarSolicitud: (state, { payload }) => {
      state.sugerencias = state.sugerencias.map((sugerencia) => {
        if (payload.id === sugerencia.id) return payload;
        return sugerencia;
      });
      state.sugerenciasChat = state.sugerencias

      state.isLoadingAgregarAmigo = null;
      state.isLoadinDeleteSolicitud = null;
      state.isLoadingEliminarAmigo = null;
      state.isLoadinAceptSolicitud = null;
    },

    onAgregarSolicitud: (state, { payload }) => {
      const verify = state.solicitud.some((s) => {
        return payload.id === s.id;
      });

      if (!verify) {
        state.solicitud.push(payload);
      } else {
        state.solicitud = state.solicitud.filter((s) => {
          return s.id !== payload.id;
        });
      }
      state.isLoadingAgregarAmigo = null;
      state.isLoadinDeleteSolicitud = null;
      state.isLoadinAceptSolicitud = null;
      state.isLoadingEliminarAmigo = null;
    },

    onSetNotificacionSolicitud: (state, { payload }) => {
      state.notificacionSolicitud = payload;
    },

    onAceptarSolicitud: (state, { payload }) => {
      state.amigos.push(payload);
      state.amigosChat = state.amigos;
    },

    onEliminarAmigo: (state, { payload }) => {
      state.amigos = state.amigos.filter((a) => {
        return a.id !== payload.id;
      });
      state.amigosChat = state.amigos;

      if (payload.amigo) state.sugerencias.unshift(payload.amigo);
      if (payload.amigo) state.sugerenciasChat = state.sugerencias

      state.isLoadingEliminarAmigo = null;
      if(state.chatActivo?.id === payload.id) state.chatActivo = null;
    },

    onSetOnlineUser: (state, { payload }) => {
      state.sugerencias = state.sugerencias.map((sugerencia) => {
        if (payload.id === sugerencia.id)
          return { ...sugerencia, online: payload.online };
        return sugerencia;
      });

      state.sugerenciasChat = state.sugerencias

      state.amigos = state.amigos.map((amigo) => {
        if (payload.id === amigo.id)
          return { ...amigo, online: payload.online };
        return amigo;
      });

      state.amigosChat = state.amigos;

      state.solicitud = state.solicitud.map((s) => {
        if (payload.id === s.id) return { ...s, online: payload.online };
        return s;
      });
    },

    onOpenChat: (state, { payload }) => {
      state.chatActivo = payload;
    },

    onUpdateNotificacionMsg:(state, {payload}) => {
      
      state.amigosChat = state.amigosChat.map(amigo =>{
        if(amigo.id === payload.id) return {...amigo, notificacion:0};
        return amigo;
      });
    },

    onCloseChat: (state) => {
      state.chatActivo = null;
    },

    onGetMensajes:(state, {payload}) =>{
      state.mensajes = payload
    },

    onUpdateUltimoMsg:(state, {payload}) => {
      let online = null;
      
      state.amigos = state.amigos.filter(amigo =>{
        if(amigo.id === payload.id) online = amigo.online;
        return amigo.id !== payload.id;
      });

      state.amigos.unshift({...payload, online});
      state.amigosChat = state.amigos;
    },

    onSearchAmigo:(state, {payload}) => {
      state.amigosChat = state.amigos.filter(amigo => {
        return amigo.nombre.toLowerCase().startsWith(payload.toLowerCase());
      });
    },

    onSearchSugerencias:(state, {payload}) => {
      state.sugerenciasChat = state.sugerencias.filter(amigo => {
        return amigo.nombre.toLowerCase().startsWith(payload.toLowerCase());
      });
    },

    onDeleteCuenta: (state, { payload }) => {
      state.sugerencias = state.sugerencias.filter((sugerencia) => {
        return sugerencia.id !== payload.id;
      });

      state.sugerenciasChat = state.sugerencias

      state.amigos = state.amigos.filter((amigo) => {
        return amigo.id !== payload.id;
      });

      state.amigosChat = state.amigos;

      state.solicitud = state.solicitud.filter((s) => {
        return s.id !== payload.id;
      });

      if(state.chatActivo?.id === payload.id) state.chatActivo = null;
    },

    onLogoutChat:(state) => {
      state.sugerencias = [];
      state.solicitud = [];
      state.amigos = [];
      state.isLoadingAgregarAmigo = null;
      state.isLoadinDeleteSolicitud = null;
      state.isLoadinAceptSolicitud = null;
      state.isLoadingEliminarAmigo = null;
      state.notificacionSolicitud = 0;
      state.chatActivo = null;
      state.mensajes = [];
      state.isLoadingEscribiendo = null;
      state.amigosChat = [];
      state.sugerenciasChat = [];
    }
  },
});

export const {
  onGetSugerencias,
  onGetSolicitudes,
  onEnviarSolicitud,
  onLoadingDataChat,
  onAgregarSolicitud,
  onSetNotificacionSolicitud,
  onAceptarSolicitud,
  onGetAmigos,
  onEliminarAmigo,
  onSetOnlineUser,
  onOpenChat,
  onCloseChat,
  onGetMensajes,
  onUpdateUltimoMsg,
  onSearchAmigo,
  onSearchSugerencias,
  onLogoutChat,
  onUpdateNotificacionMsg,
  onDeleteCuenta
} = chatSlice.actions;
