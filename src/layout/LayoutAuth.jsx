import { useSelector } from "react-redux";
import { Alert } from "../components/Alert";
import { AuthStore } from "../hooks/AuthStore";


export const LayoutAuth = ({children, onSubmit}) => {
  const {msgError} = useSelector(state => state.auth);
  const{logoApp} = AuthStore();

  return (
    <section className="select-none">
      <Alert typeAlert={msgError?.typeAlert} msg={msgError?.msg}/>
      <div className="m-auto w-1/2 mt-8 text-center">
        <img
          className="w-20 h-20 m-auto"
          src={logoApp}
          alt="Logo"
        />

        <h1 className={"text-2xl md:text-3xl font-bold mt-2"}>Chat App</h1>
        <h4 className="text-xl md:text-2xl font-semibold text-neutral-500">
          ¡Mensajeria Gratis!
        </h4>
      </div>

      <form onSubmit={onSubmit} className="m-auto max-w-sm mt-5 px-3 animate__animated animate__fadeIn h-full">{children}</form>
    </section>
  );
}
