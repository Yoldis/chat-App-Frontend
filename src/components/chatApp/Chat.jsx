import { useEffect, useRef } from "react";
import { format } from 'date-fns'
import { AiOutlineSend } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import { AuthStore, ChatStore, useForm, UiStore } from "../../hooks";
import { SocketController } from "../../socket/SocketController";
import { AlertModal, VerPerfil } from "./index";

export const Chat = () => {
    const{userId,userActivo} = AuthStore();
    const{id, nombre, foto} = userActivo;
    const{iconLeftValue} = UiStore();
    const{chatActivo, startCloseChat, mensajes, isLoadingEscribiendo} = ChatStore();
    const refInput = useRef();
    const refDiv = useRef();
    const{mensaje, onChangeInput, onResetForm} = useForm({mensaje:''});
    const{startSendMensaje, startEliminarChat, startEscribiendo} = SocketController(userId);
   
    const closeChat = (e) =>  {
      if(e.keyCode === 27) startCloseChat();
    };

    const onFocusInput = () => {
      refInput.current.focus();
    }

    const onSubtmit = (e) => {
      e.preventDefault();
      if(mensaje.trim() === '') return;
      const hora = format(new Date(), 'HH:mm');
      startSendMensaje({usuario:id, amigo:chatActivo.id, nombre, foto, mensaje, hora});
      onResetForm();
    }

    const eliminarChat = () => {
      if(mensajes.length === 0) return;
      startEliminarChat({usuario:id, amigo:chatActivo.id});
    }

    useEffect(() => {
      if(!refDiv.current?.scrollHeight) return;
      refDiv.current.scrollTop = refDiv.current.scrollHeight;
    }, [mensajes]);
  
    useEffect(() => {
      if(!mensaje) return;
      startEscribiendo(userId, chatActivo.id);
    }, [mensaje]);

    
  return (
    <div
      className={`absolute ${
        iconLeftValue && chatActivo
          ? "left-0 w-full"
          : "md:left-[345px] md:w-[calc(100%-345px)]"
      } `}
    >
      {chatActivo === null ? (
        <h1 className="flex justify-center text-center px-10 items-center h-[calc(100vh-60px)] font-semibold text-xl">
          ¡¡Envia y Recibe mensajes a tus Amigos!!
        </h1>
      ) : (
        <div
          onClick={onFocusInput}
          className="grid grid-rows-[55px_calc(100%-60px)_60px] h-[calc(100vh-115px)] animate__animated animate__fadeIn"
        >
          {/* Navbar */}
          <nav className="py-2 px-3 select-none bg-neutral-focus">
            <div
              className="flex items-center justify-center gap-2"
              onClick={() => document.getElementById("verPerfil").showModal()}
            >
              <div className={`avatar  cursor-pointer`}>
                <div className="w-10 rounded-full">
                  <img src={chatActivo.foto} />
                </div>
              </div>
              <h4 className="font-semibold  cursor-pointer">
                {chatActivo.nombre}
              </h4>
              <span
                className={`${
                  isLoadingEscribiendo?.id ? "block" : "hidden"
                } font-medium text-sky-600`}
              >
                {" "}
                - escribiendo...
              </span>
            </div>
          </nav>

          <dialog id="verPerfil" className="modal">
            <div className="modal-box">
              <VerPerfil payload={chatActivo} />
              <div className="modal-action">
                <form method="dialog">
                  <button className="btn bg-red-700 text-neutral-200">
                    Cerrar
                  </button>
                </form>
              </div>
            </div>

            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>

          {/* Conversacion */}
          <section ref={refDiv} className="px-3 py-2 overflow-auto">
            {mensajes.map((m, i) => (
              <div key={i} className="animate__animated animate__fadeIn">
                <div
                  className={`chat snap-start ${
                    userId === m.usuario ? "chat-end" : "chat-start"
                  } `}
                >
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img src={m.foto} />
                    </div>
                  </div>

                  <div
                    className={`chat-bubble text-neutral-200 ${
                      userId === m.usuario ? "bg-sky-700" : ""
                    }`}
                  >
                    <p className="overflow-auto">
                      <span>{m.mensaje}</span>
                    </p>
                  </div>
                  <div className="chat-footer opacity-50 select-none">
                    {m.hora}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Entrada texto */}
          <section className="">
            <form action="" onSubmit={onSubtmit}>
              <div className="flex items-center justify-between m-2 gap-2">
                <button
                  onClick={() =>
                    document.getElementById("eliminar-chat").showModal()
                  }
                  type="button"
                  className="p-1.5 rounded-md transition-all duration-200 ease-linear border-transparent border focus:shadow-md hover:border-red-600 "
                >
                  <BsFillTrashFill className="text-xl text-red-600" />
                </button>

                <input
                  type="text"
                  name="mensaje"
                  value={mensaje}
                  onChange={onChangeInput}
                  className="border-transparent border w-full p-1.5 rounded-md outline-none transition-all duration-200 ease-linear focus:shadow-md hover:border-sky-600 focus:border-sky-600 bg-neutral"
                  placeholder="Escribe un mensaje"
                  autoComplete="off"
                  onKeyDown={closeChat}
                  autoFocus={true}
                  ref={refInput}
                />
                <button className="p-1.5 rounded-md transition-all duration-200 ease-linear border-transparent border focus:shadow-md hover:border-sky-600 ">
                  <AiOutlineSend className="text-xl text-sky-600" />
                </button>
              </div>
            </form>

            <AlertModal
              title="¿Deseas vaciar el chat?"
              id="eliminar-chat"
              callback={() => eliminarChat()}
            />
          </section>
        </div>
      )}
    </div>
  );
}
