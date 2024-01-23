import { googleLogout } from '@react-oauth/google';
import { FaSignInAlt } from 'react-icons/fa';
import { BiChevronsRight, BiChevronsLeft } from 'react-icons/bi';
import { AuthStore, ChatStore, useForm, UiStore } from '../../hooks/index';
import { Perfil, Buscar, AlertModal } from './index';
import { SocketController } from '../../socket/SocketController';


export const SideBarChat = () => {
    const{iconLeftValue, startOnChangeValueIconLeft} = UiStore();
    const{ fotoTemp, fotoDefault, isLoadingFoto, startCancelFotoTemp, quitarFoto, foto, nombre, descripcion, startLogoutAuth} = AuthStore();
    const{form, onChangeInput, onResetForm, onChangeInputFile} = useForm({foto, descripcion, nombre, archivo:''});

    const{startSearchAmigo, startLogoutChat, chatActivo} = ChatStore();

    const onCancelModal = () => {
      if(fotoDefault !== fotoTemp) startCancelFotoTemp(fotoTemp);
      else quitarFoto();
      onResetForm();
    }


   const onLogout = () => {
     startLogoutChat();
     startLogoutAuth();
     googleLogout();
     localStorage.clear();
   }

  return (
    <article
      className={`select-none absolute pt-2 ${
        iconLeftValue && chatActivo ? "left-[-345px]"  : 'left-[0px]'
      }  transition-all duration-100 ease-linear w-[345px] text-neutral-200 z-10 bg-neutral h-[calc(100vh-60px)] border-r border-black`}
    >
      <div
        className="mb-4 px-1.5"
      >
        <div
         className="flex items-center gap-1 justify-between ">
          <div
            onClick={() => document.getElementById("perfil").showModal()}
           className="flex items-center gap-3 transition-all duration-200 ease-linear hover:shadow-md hover:shadow-sky-600 p-2 rounded-md border-transparent border hover:border-sky-600 cursor-pointer">
            <div className="avatar hover:drop-shadow-lg transition-all duration-200 ease-linear">
              <div className="w-9 rounded-full ring ring-sky-600 ring-offset-base-100 ring-offset-2">
                <img src={foto} />
              </div>
            </div>
            <span className="font-semibold ">
              {nombre}
            </span>
          </div>

          <button 
            onClick={() => document.getElementById("logout").showModal()}
           className='flex items-center gap-1.5 font-semibold transition-all duration-200 ease-linear hover:shadow-md hover:shadow-sky-600 p-2 rounded-md border-transparent border hover:border-sky-600 cursor-pointer'>
            <FaSignInAlt className='text-lg text-sky-600' />
            <span className=''>Cerrar sesion</span>
          </button>

          <AlertModal title='¿Deseas cerrar sesion?' id='logout' titleBtn = "Cerrar" callback={onLogout}/>
        </div>

        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <dialog id="perfil" className="modal">
          <div className="modal-box">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button
                disabled={isLoadingFoto ? true : false}
                onClick={onCancelModal}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>

            {/* Data */}
            <Perfil
              form={form}
              onChangeInput={onChangeInput}
              onChangeInputFile={onChangeInputFile}
            />
          </div>
        </dialog>
      </div>

      <h1 className="px-2 text-xl font-bold ">Chats</h1>

      <Buscar callback={startSearchAmigo} title='Buscar Chat'/>

      <div className="mx-1 mt-4 overflow-auto">
        <Chats/>
      </div>
      
      <div
        onClick={startOnChangeValueIconLeft}
        className="absolute top-[350px] right-[-20px] bg-sky-800 p-1.5 rounded-full cursor-pointer "
      >
        {iconLeftValue && chatActivo ? (
          <BiChevronsRight className="text-xl" />
        ) : (
          <BiChevronsLeft className="text-xl " />
        )}
      </div>
    </article>
  );
}

const Chats = () => {
    const{userId} = AuthStore();
    const{amigosChat} = ChatStore();
    const{startOpenChat} = SocketController(userId);

    return (
      <div className=''>
        {
          !amigosChat.length ? <p className="font-medium text-sky-600 text-center">¡¡Comienza agregar amigos para charlar!!</p> :
          <>
          {amigosChat.map((chat) => (
          <div
          onClick={() => startOpenChat(chat, userId)}
           key={chat.id}
           className="hover:bg-sky-800 rounded-md p-1 flex items-center gap-2 transition-all duration-200 ease-linear cursor-pointer my-2 animate__animated animate__fadeIn">
           <div className="flex items-center gap-2">
              <div className={`avatar ${chat?.online ? 'online' : 'offline' }`}>
                <div className="w-12 rounded-full">
                  <img src={chat.foto} />
                </div>
              </div>
            </div>
              
            <div className=''>
              <h3 className="font-bold">{chat.nombre}</h3>
              <p className="text-sm text-neutral-500"><span className={`${chat.ultimoMsg ? 'inline' :'hidden'}`}>{chat.id === chat.ultimoUserEnChat ? 'El:' :'Tu:'}</span> {chat.ultimoMsg}</p>
            </div>

              <div className="grow text-end mr-2">
                  <span className={` bg-sky-600 rounded-full font-medium text-sm px-1 ${!chat.notificacion || chat.id !== chat.ultimoUserEnChat ? 'hidden' :'inline'}`}>{chat.notificacion}</span>
              </div>
          </div>
        ))}
          </>
        }
        
      </div>
    );
}