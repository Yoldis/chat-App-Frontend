import { useState, useEffect } from 'react';
import { FaUserCircle, FaExclamationCircle, FaSave } from 'react-icons/fa';
import { MdDelete,MdEdit } from 'react-icons/md';
import { AuthStore } from '../../hooks/AuthStore';
import {AlertModal} from './AlertModal'
import { SocketController } from '../../socket/SocketController';

export const Perfil = ({form, onChangeInput, onChangeInputFile}) => {
    const{nombre, descripcion, archivo} = form;
    const [hoverModal, sethoverModal] = useState(false);

    const{startUploadFotoTemp, startCancelFotoTemp, startUpdateProcfile, fotoTemp, foto, isLoadingFoto, userId, isSaveDataUpdate, fotoDefault, quitarFoto, isLoadingDeleteAccount} = AuthStore();
    const{startEliminarCuenta} = SocketController(userId);

    const onToggleHover = (data) => {
        sethoverModal(data);
    }


    const onUpdateFoto = () => {
        const formData = new FormData();
        formData.append('archivo', archivo);
        formData.append('img', fotoTemp);
        startUploadFotoTemp(formData);
    }

    const onCancelFotoTemp = () => {
        if(fotoTemp) startCancelFotoTemp(fotoTemp);
        else quitarFoto(fotoDefault);
    }

    const onUpdateProcfile = () => {
        if(nombre.trim() === '') return;
        startUpdateProcfile(userId, {nombre, foto:fotoTemp ? fotoTemp : foto, descripcion});
    }
    
    useEffect(() => {
        if(!archivo) return;
        onUpdateFoto();
    }, [archivo]);

    const onDeleteAccount = () => {
      startEliminarCuenta(userId)
    }

  return (
    <section className="select-none">
      <article className="text-lg flex items-center gap-2">
        <FaUserCircle className="text-2xl" />
        <h1 className="font-semibold underline">Perfil</h1>
      </article>

      <article className="mt-4">
        <div className="flex items-center gap-4 relative">
          <div
            onMouseOver={() => onToggleHover(true)}
            onMouseOut={() => onToggleHover(false)}
            className="avatar"
          >
            <div className="w-28 rounded-full ring ring-sky-600 ring-offset-base-100 ring-offset-2">
              <img src={fotoTemp ? fotoTemp : foto} alt="Foto de perfil" />
            </div>
          </div>

          {isLoadingFoto ? (
            <div className="absolute flex items-center flex-col pt-5 bg-neutral w-28 h-28 rounded-full">
              <span className="loading loading-spinner loading-lg"></span>
              <p className="text-sm">Cargando...</p>
            </div>
          ) : hoverModal ? (
            <div
              onMouseOver={() => onToggleHover(true)}
              onMouseOut={() => onToggleHover(false)}
              className="absolute py-1 w-28 h-28 rounded-full bg-black/60 flex justify-between flex-col items-center"
            >
              <div className="flex flex-col items-center text-white">
                <MdEdit className="text-xl" />
                <label
                  htmlFor="archivo"
                  className="cursor-pointer hover:underline text-sm"
                >
                  <span>Cambiar</span>
                </label>
                <input
                  type="file"
                  name="archivo"
                  id="archivo"
                  onChange={onChangeInputFile}
                  className="w-0.5 h-0.5"
                  accept="image/*"
                />
              </div>

              <div
                disabled={isLoadingFoto ? true : false}
                className="flex flex-col items-center text-red-300"
              >
                <MdDelete className="text-xl cursor-pointer " />
                <button
                  onClick={onCancelFotoTemp}
                  className="hover:underline cursor-pointer text-sm"
                >
                  Quitar
                </button>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="flex flex-col w-full gap-1">
            <label
              htmlFor="nombre"
              className="font-bold text-slate-500 ml-1 underline"
            >
              Nombre
            </label>
            <div className={`${nombre.trim() === '' ? 'flex' : 'hidden'} items-center gap-1 font-medium text-red-600`}>
              <FaExclamationCircle />
              <span>El nombre es obligatorio</span>
            </div>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={onChangeInput}
              className="outline-none rounded-md p-1 transition-all duration-200 ease-linear focus:border-sky-600 border-black/10 border w-full font-medium "
              autoComplete="off"
              maxLength = {25}
            />

            <label
              htmlFor="descripcion"
              className="font-bold ml-1 text-slate-500 underline"
            >
              Descripción
            </label>
            <input
              type="text"
              id="descripcion"
              name="descripcion"
              value={descripcion ? descripcion : ""}
              onChange={onChangeInput}
              placeholder={"Añade una descripción sobre ti!"}
              className="font-semibold outline-none rounded-md p-1 transition-all duration-200 ease-linear focus:border-sky-600 w-full border-black/10 border"
              autoComplete="off"
              maxLength = {65}
            />
          </div>
        </div>

        <button
          disabled={isLoadingFoto ? true : false}
          onClick={()=>document.getElementById('eliminar-cuenta').showModal()}
          className="bg-red-600 text-white font-medium  px-1.5 py-0.5 rounded-md mt-5 hover:opacity-90 transition-all duration-200 ease-linear"
        >
          {isLoadingDeleteAccount ? (
            <span className="loading loading-spinner loading-sm relative top-0.5"></span>
          ) : (
            <div className='flex items-center gap-2'>
            <span>Eliminar Cuenta</span>
            <FaUserCircle/>
            </div>
          )}
        </button>
          <AlertModal id="eliminar-cuenta" title='¿Estas seguro que deseas eliminar la cuenta?, Los cambios son irreversibles!' titleBtn='Si, Eliminar' callback={onDeleteAccount}/>


        <button
          disabled={isLoadingFoto ? true : false}
          onClick={onUpdateProcfile}
          className="bg-sky-600 text-white font-medium float-right px-1.5 py-0.5 rounded-md mt-5 hover:opacity-90 transition-all duration-200 ease-linear"
        >
          {isSaveDataUpdate ? (
            <span className="loading loading-spinner loading-sm relative top-0.5"></span>
          ) : (
            <div className="flex items-center gap-2">
            <span>Guardar</span>
            <FaSave/>
            </div>
          )}
        </button>
      </article>
    </section>
  );
}
