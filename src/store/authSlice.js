import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status:'Checking',
    msgError:{},
    userId:'',
    nombre:'',
    correo:'',
    foto:'',
    descripcion:'',
    fotoTemp:'',
    isLoadingFoto:null,
    userActivo:{},
    isSaveDataUpdate:null,
    isLoadingDeleteAccount:null
  },
  
  reducers: {

    chekingStatus:(state, ) => {
        state.status = 'Checking';
    },

    onLogin:(state, {payload}) => {
        state.userId = payload.id
        state.nombre = payload.nombre
        state.correo = payload.correo
        state.foto = payload.foto
        state.descripcion = payload.descripcion
        state.userActivo = payload
        state.status = 'Authenticated';
    },

    onGetMsgError:(state, {payload}) => {
      state.msgError = payload;
      state.status = null;
    },

    onSetFotoTemp:(state, {payload}) => {
      state.fotoTemp = payload;
      state.isLoadingFoto = null;
    },

    onCancelFotoTemp:(state) => {
      state.fotoTemp = '';
      state.isLoadingFoto = null;
    },

    onLoadingFoto:(state) =>{
      state.isLoadingFoto = true;
    },

    onUpdateProcfile:(state, {payload}) => {
        state.nombre = payload.nombre
        state.foto = payload.foto
        state.descripcion = payload.descripcion
        state.fotoTemp = '';
        state.isSaveDataUpdate = null
    },

    onLoadingSaveDateUpdate:(state) => {
      state.isSaveDataUpdate = true
    },

    onLoadingDeleteAccount:(state) => {
      state.isLoadingDeleteAccount = true
    },
    

    onLogoutAuth:(state) => {
      state.status = null;
      state.msgError = {}
      state.userId = '';
      state.nombre = '';
      state.correo = '';
      state.foto = '';
      state.descripcion = '';
      state.fotoTemp = '';
      state.isLoadingFoto = null;
      state.userActivo = {};
      state.isSaveDataUpdate = null;
      state.isLoadingDeleteAccount = null;
    }
  },
});

export const { chekingStatus, onLogin, onGetMsgError, onSetFotoTemp,onCancelFotoTemp, onLoadingFoto, onUpdateProcfile, onLoadingSaveDateUpdate, onLogoutAuth, onLoadingDeleteAccount } = authSlice.actions