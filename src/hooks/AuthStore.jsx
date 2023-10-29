import { useDispatch, useSelector } from "react-redux";
import {
  chekingStatus,
  onCancelFotoTemp,
  onGetMsgError,
  onLoadingFoto,
  onLoadingSaveDateUpdate,
  onLogin,
  onLogoutAuth,
  onSetFotoTemp,
  onUpdateProcfile,
} from "../store/authSlice";
import {
  cancelFotoTemp,
  loginUserWithEmailAndPassowrd,
  loginWithGoogle,
  registerUserWithEmailAndPassowrd,
  setUpdateFotoTemp,
  updateProcfile,
} from "../api/authProvider";

const fotoDefault = 'https://res.cloudinary.com/dljqyy9l7/image/upload/v1694990391/yk0adqwmt615fkpezdgx.jpg';
const logoApp = 'https://res.cloudinary.com/dljqyy9l7/image/upload/v1698534999/ChatApp/u0o1xsozwa1zagfrdaea.png'

export const AuthStore = () => {
  const {
    userActivo,
    userId,
    nombre,
    correo,
    password,
    foto,
    descripcion,
    status,
    msgError,
    isLoadingFoto,
    fotoTemp,
    isSaveDataUpdate,
    isLoadingDeleteAccount
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startRegisterUser = async (payload) => {
    dispatch(chekingStatus());
    const { ok, data, token, error } = await registerUserWithEmailAndPassowrd(
      payload
    );
    if (!ok) {
      // Retornar Errores en la interfaz
      return startMsgError(ok, error);
    }
    dispatch(onLogin(data));
    localStorage.setItem("token", token);
  };

  const startLoginUser = async (payload) => {
    dispatch(chekingStatus());
    const { ok, data, token, error } = await loginUserWithEmailAndPassowrd(
      payload
    );
    if (!ok) {
      // Retornar Errores en la interfaz
      return startMsgError(ok, error);
    }
    dispatch(onLogin(data));
    localStorage.setItem("token", token);
  };

  const startMsgError = (ok, error) => {
    if (!ok) {
      if (error === undefined) {
        dispatch(
          onGetMsgError({
            msg: "Sin conexion a internet",
            typeAlert: "alert-error animate__animated animate__fadeIn",
          })
        );
      } else
        dispatch(
          onGetMsgError({
            ...error,
            typeAlert: "alert-error animate__animated animate__fadeIn",
          })
        );

      setTimeout(() => {
        dispatch(onGetMsgError({}));
      }, 3000);
    }
  };

  const startUploadFotoTemp = async (payload) => {
    dispatch(onLoadingFoto());
    const { ok, foto } = await setUpdateFotoTemp(payload);
    if (!ok) {
      // Retornar error en la interfaz
      return;
    }
    dispatch(onSetFotoTemp(foto));
  };

  const quitarFoto = (foto) => {
    dispatch(onSetFotoTemp(foto));
  }

  const startCancelFotoTemp = async(img) => {
    dispatch(onLoadingFoto());
    if(img){
      const{ok} = await cancelFotoTemp({img});
      if(!ok){
        // Retornar error en la interfaz
        return;
      }
    }
    dispatch(onCancelFotoTemp());
  };


  const startUpdateProcfile = async(id, payload) => {
    dispatch(onLoadingSaveDateUpdate());
    const {ok, data} = await updateProcfile(id, payload);
    if(!ok){
      // Retornar error en la interfaz
      return;
    }
    dispatch(onUpdateProcfile(data.data));
  }

  const startLoginWithGoogle = async(payload) => {
      dispatch(chekingStatus());
      const {ok, data, token, error} = await loginWithGoogle(payload);
      
      if (!ok) {
        // Retornar Errores en la interfaz
        return startMsgError(ok, error);
      }
      dispatch(onLogin(data));
      localStorage.setItem("token", token);
  }

  const startLogoutAuth = () => {
    dispatch(onLogoutAuth());
  }

  return {
    userActivo,
    userId,
    nombre,
    correo,
    password,
    foto,
    descripcion,
    status,
    msgError,
    isLoadingFoto,
    fotoTemp,
    isSaveDataUpdate,
    fotoDefault,
    isLoadingDeleteAccount,
    logoApp,

    startRegisterUser,
    startLoginUser,
    startMsgError,
    startUploadFotoTemp,
    startCancelFotoTemp,
    quitarFoto,
    startUpdateProcfile,
    startLogoutAuth,
    startLoginWithGoogle
  };
};
