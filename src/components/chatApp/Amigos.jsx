import { AiFillCheckCircle } from "react-icons/ai";
import { IoIosPersonAdd } from "react-icons/io";
import { BsFillTrashFill } from "react-icons/bs";

import { LayoutTitleView } from "../../layout/LayoutTitleView"
import { SocketController } from "../../socket/SocketController";
import { AuthStore, ChatStore } from "../../hooks/index";
import { AlertModal, VerPerfil } from "./index";

export const Amigos = () => {
  return (
    <>
    <LayoutTitleView title={'Solicitudes de Amistad'} icon={<IoIosPersonAdd className="text-sky-600" />}>
      <Solicitud/>
    </LayoutTitleView>

    <LayoutTitleView title={'Amigos'} icon={<IoIosPersonAdd className="text-sky-600" />}>
      <AmigosAgregados/>
    </LayoutTitleView>
    </>
    
  )
}


const Solicitud = () => {
  const{userId} = AuthStore();
  const { solicitud, isLoadinDeleteSolicitud, isLoadinAceptSolicitud} = ChatStore();
  const{startDeleteSolicitud, startAceptarSolicitud} = SocketController(userId);

    return (
      <div className="grid md:grid-cols-4 grid-cols-1 gap-5 mt-4 border-b-2 pb-5">
        {solicitud.map((chat) => (
          <div
            key={chat.id}
            className="bg-neutral hover:scale-105 rounded-md p-1 cursor-pointer w-full max-w-sm animate__animated animate__fadeIn transition-all duration-200 ease-linear border-transparent border hover:shadow-md hover:shadow-sky-600 hover:border-sky-600"
          >
           <div className="flex items-center gap-2 pl-1">
              <div className={`avatar ${chat?.online ? 'online' : 'offline' } `}>
                <div className="w-14 rounded-full">
                  <img src={chat.foto} />
                </div>
              </div>
              <h3 className="font-semibold w-[37%] grow">{chat.nombre}</h3>
            </div>

            <div className="flex gap-2 text-sm font-semibold py-0.5 justify-end">
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


              <button onClick={()=>startAceptarSolicitud(chat.id, userId)} disabled={isLoadinAceptSolicitud?.id === chat.id ? true:false} className="transition-all duration-200 ease-linear hover:bg-green-700 text-sm bg-green-600 rounded-md px-1 text-white py-0.5">
                  {
                        isLoadinAceptSolicitud?.id === chat.id ? <span className="relative top-0.5 loading loading-spinner loading-sm"></span> : <span className="flex items-center gap-0.5"> <AiFillCheckCircle/> Aceptar</span>
                    }
                  </button>

                  <button onClick={() => startDeleteSolicitud(chat.id, userId)} disabled={isLoadinDeleteSolicitud?.id === chat.id ? true:false} className="transition-all duration-200 ease-linear hover:bg-red-700 text-sm bg-red-600 rounded-md px-1 text-white py-0.5">
                    {
                        isLoadinDeleteSolicitud?.id === chat.id ? <span className="relative top-0.5 loading loading-spinner loading-sm"></span> : <span className="flex items-center gap-0.5"> <BsFillTrashFill/> Eliminar</span>
                    }
                </button>
            </div>
          </div>
        ))}
      </div>
    );
}


const AmigosAgregados = () => {
  const{userId} = AuthStore();
  const {amigos, isLoadingEliminarAmigo, chatActivo} = ChatStore();
  const{startDeleteAmigo} = SocketController(userId);

  

    return (
      <div className="grid md:grid-cols-4 grid-cols-1 gap-5 mt-4 border-b-2 pb-5">
        {amigos.map((chat, i) => (
          <div
            key={i}
            className="bg-neutral hover:scale-105 rounded-md p-1 transition-all duration-200 ease-linear border-transparent border hover:shadow-md hover:shadow-sky-600 hover:border-sky-600 cursor-pointer w-full max-w-sm"
          >
           <div className="flex items-center gap-2 pl-1">
              <div className={`avatar ${chat?.online ? 'online' : 'offline' } `}>
                <div className="w-14 rounded-full">
                  <img src={chat.foto} />
                </div>
              </div>
              <h3 className="font-semibold w-[37%] grow">{chat.nombre}</h3>
            </div>

            <div className="flex gap-2 text-sm font-semibold justify-end py-0.5">
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

              <button
                onClick={() =>document.getElementById(chat.id + 'eliminar-amigo').showModal()}
                disabled={isLoadingEliminarAmigo?.id === chat.id ? true : false}
                className="transition-all duration-200 ease-linear hover:bg-red-700 text-sm bg-red-600 rounded-md px-1 text-white py-0.5"
              >
                {isLoadingEliminarAmigo?.id === chat.id ? (
                  <span className="relative top-0.5 loading loading-spinner loading-sm"></span>
                ) : (
                  <span className="flex items-center gap-0.5">
                    {" "}
                    <BsFillTrashFill /> Eliminar
                  </span>
                )}
              </button>
            </div>
            
            <AlertModal title='¿Deseas eliminar el amigo?' id={chat.id + 'eliminar-amigo'} callback={() => startDeleteAmigo(chat.id, userId, chatActivo)}/>

          </div>
        ))}
      </div>
    );
}