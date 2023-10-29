import { onAceptarSolicitud, onAgregarSolicitud, onDeleteCuenta, onEliminarAmigo, onEnviarSolicitud, onGetMensajes, onGetSugerencias, onLoadingDataChat, onSetNotificacionSolicitud, onSetOnlineUser, onUpdateUltimoMsg } from "../store/chatSlice";



export const SocketOn = (socket, dispatch = '') => {

    socket.on('conectado', (payload) =>{
        // console.log(payload)
        dispatch(onSetOnlineUser(payload));
    });

     socket.on('desconectado', (payload) =>{
        // console.log(payload)
        dispatch(onSetOnlineUser(payload));
    });

    socket.on('lala', (payload) => {
        console.log('lala', payload)
    })
    socket.on('enviar-agregar-amigo', (payload) => {
        // console.log(payload)
        dispatch(onAgregarSolicitud({...payload.data.usuario, id:payload.data.usuario._id, solicitud:payload.data.solicitud, aceptado:payload.data.aceptado}));

        dispatch(onSetNotificacionSolicitud(payload.notificacion));
        dispatch(onGetSugerencias(payload.usuarios));
    });


    socket.on('enviar-eliminar-solicitud', (payload) => {
        // console.log(payload)
        dispatch(onEnviarSolicitud({...payload.data.amigo, id:payload.data.amigo._id, solicitud:payload.data.solicitud, aceptado:payload.data.aceptado}));
    });


    socket.on('enviar-aceptar-solicitud', (payload) => {
        // console.log(payload)
        
        dispatch(onAceptarSolicitud({...payload.data.amigo, id:payload.data.amigo._id, solicitud:payload.data.solicitud, aceptado:payload.data.aceptado}));
        dispatch(onGetSugerencias(payload.usuarios));
    });


    socket.on('enviar-eliminar-amigo', (payload) => {
        // console.log(payload)
        dispatch(onEliminarAmigo({...payload.data.amigo, id:payload.data.amigo._id, solicitud:false, aceptado:false, amigo:{...payload.data.amigo, id:payload.data.amigo._id, solicitud:false, aceptado:false}}));
    });


    socket.on('enviar-recibir-mensaje', (payload) => {
        // console.log(payload)
        dispatch(onUpdateUltimoMsg({...payload.data.usuario, id:payload.data.usuario._id, ultimoMsg:payload.data.ultimoMsg, notificacion:payload.data.notificacion, ultimoUserEnChat:payload.data.ultimoUserEnChat}));
        dispatch(onGetMensajes(payload.data.mensajesAmigo));
    });
    

    let interval = '';
    socket.on('recibir-escribiendo', (payload) => {
        dispatch(onLoadingDataChat({type:'escribiendo', id:payload.amigo}));

        clearTimeout(interval);

        interval = setTimeout(() => {
            dispatch(onLoadingDataChat({type:'escribiendo', id:null}));
        }, 2000);
    });

    
    socket.on('enviar-eliminar-cuenta', (payload) => {
        dispatch(onDeleteCuenta({id:payload.usuario}));
    });
}
