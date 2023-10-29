import { FaUserFriends } from 'react-icons/fa';
import { AiFillCheckCircle } from 'react-icons/ai';
import { IoMdAddCircle } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import { LayoutTitleView } from '../../layout/LayoutTitleView';
import { AuthStore, ChatStore } from '../../hooks/index';
import { SocketController } from '../../socket/SocketController';
import { VerPerfil } from './VerPerfil';


export const Sugerencias = () => {

  return (
    <LayoutTitleView type='Sugerencias' icon={<FaUserFriends className='text-sky-600'/>} title={'Sugerencias de Amistad'}>
      <Procfile/>
    </LayoutTitleView>
  );
}



const Procfile = () => {
  const{userId} = AuthStore();
    const {sugerenciasChat, isLoadingAgregarAmigo} = ChatStore();
    const{startAgregarAmigo} = SocketController(userId);

    return (
      <div className="grid md:grid-cols-4 grid-cols-1 gap-5 mt-4">
        {sugerenciasChat.map((chat) => (
          <div
            key={chat.id}
            className="bg-neutral hover:scale-105 rounded-md p-1 transition-all duration-200 ease-linear border-transparent border hover:shadow-md hover:shadow-sky-600 hover:border-sky-600 cursor-pointer"
          >
            <div className="flex items-center  gap-5 pl-1">
              <div className={`avatar ${chat?.online ? "online" : "offline"} `}>
                <div className="w-14 rounded-full">
                  <img src={chat.foto} />
                </div>
              </div>
              <h3 className="font-semibold w-[37%] grow">{chat.nombre}</h3>
            </div>

            <div className="flex flex-wrap justify-end py-0.5 gap-2 text-sm font-semibold">
              <button
               onClick={()=>document.getElementById(chat.id).showModal()}
               className="transition-all duration-200 ease-linear hover:bg-neutral-700 text-sm bg-neutral-500 rounded-md px-1 py-0.5 text-white  mr-1">
                Ver perfil
              </button>

              <dialog id={chat.id} className="modal">
                <div className="modal-box">
                  <VerPerfil payload = {chat}/>
                  <div className="modal-action">
                  <form method="dialog" >
                    <button className="btn bg-red-700 text-neutral-200">Cerrar</button>
                  </form>
                </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
              </dialog>

              {chat?.solicitud ? (
                <>
                  <span className="px-1 py-0.5 bg-green-600 rounded-md flex items-center text-white">
                    {" "}
                    <AiFillCheckCircle /> Enviada
                  </span>
                  <button
                    disabled={
                      isLoadingAgregarAmigo?.id === chat.id ? true : false
                    }
                    onClick={() => startAgregarAmigo(chat.id, userId)}
                    className="transition-all duration-200 ease-linear hover:bg-red-700 text-sm bg-red-500 rounded-md px-1 text-white py-0.5"
                  >
                    {isLoadingAgregarAmigo?.id === chat.id ? (
                      <span className="relative top-0.5 loading loading-spinner loading-sm"></span>
                    ) : (
                      <span className="flex items-center gap-0.5">
                        {" "}
                        <MdCancel /> Cancelar
                      </span>
                    )}
                  </button>
                </>
              ) : (
                <button
                  disabled={
                    isLoadingAgregarAmigo?.id === chat.id &&
                    isLoadingAgregarAmigo?.id !== undefined
                      ? true
                      : false
                  }
                  onClick={() => startAgregarAmigo(chat.id, userId)}
                  className="transition-all duration-200 ease-linear hover:bg-sky-700 text-sm bg-sky-600 rounded-md px-1 text-white py-0.5 self-end"
                >
                  {isLoadingAgregarAmigo?.id === chat.id &&
                  isLoadingAgregarAmigo?.id !== undefined ? (
                    <span className="relative top-0.5 loading loading-spinner loading-sm"></span>
                  ) : (
                    <span className="flex items-center gap-0.5">
                      {" "}
                      <IoMdAddCircle /> Agregar
                    </span>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
}
