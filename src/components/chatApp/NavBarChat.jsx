import { Link, NavLink } from 'react-router-dom';

import { BsFillChatDotsFill } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { IoIosPersonAdd } from 'react-icons/io';
import { SocketController } from '../../socket/SocketController';
import { AuthStore, ChatStore } from '../../hooks/index';


export const NavBarChat = () => {

  const{userId, logoApp} = AuthStore();
  const{notificacionSolicitud} = ChatStore();
  const{startResetNotificacion} = SocketController(userId);

  const links =  [
    {path:'/chat/', icon:<BsFillChatDotsFill />, nombre:'Chats'},
    {path:'/chat/sugerencias', icon:<IoIosPersonAdd />, nombre:'Sugerencias'},
    {path:'/chat/amigos', icon:<FaUserFriends />, nombre:'Amigos'},
  ]

  return (
    <nav className="py-2 text-neutral-200 px-4 flex gap-8 items-center justify-between select-none border-b border-b-sky-800">
     
      <Link to="/chat/" className="flex gap-2 items-center flex-wrap ">
        <img
          src={logoApp}
          className="h-10 w-10"
          alt=""
        />
        <h1 className="font-bold text-xl">Chat App</h1>
      </Link>

      <div>
        <ul className="flex items-center flex-wrap gap-3 font-medium">
          {links.map((link, i) => (
            <NavLink
              onClick={
                link.nombre === "Amigos"
                  ? () => startResetNotificacion(userId)
                  : ""
              }
              key={i}
              to={link.path}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b border-b-sky-600 text-sky-600 "
                    : "border-b border-b-neutral-800 "
                } flex items-center gap-1 transition-all duration-200 ease-linear hover:shadow-md hover:shadow-sky-600 px-2 py-1 rounded-md border-transparent border hover:border-sky-600`
              }
            >
              {link.icon} {link.nombre}
              {link.nombre === "Amigos" && (
                <span
                  className={`bg-red-500 drop-shadow-lg min-w-[20px] min-h-[20px] p-0.5 text-sm text-white rounded-full text-center relative bottom-0.5  ${
                    notificacionSolicitud ? "block" : "hidden"
                  }`}
                >
                  {notificacionSolicitud}
                </span>
              )}
            </NavLink>
          ))}
        </ul>
      </div>
    </nav>
  );
}
