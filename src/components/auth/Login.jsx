import { useGoogleLogin  } from '@react-oauth/google'
import axios from "axios";
import { Link } from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { LayoutAuth } from "../../layout/LayoutAuth"
import { AuthStore } from "../../hooks/AuthStore";
import { useForm } from "../../hooks/useForm";


export const Login = ({input}) => {
  const {correo, password, onChangeInput, validForm, setErroForm, erroForm} = useForm({correo:input.correo, password:input.password});
  const{startLoginUser, startLoginWithGoogle} = AuthStore();

  const onLogin = (e) => {
    e.preventDefault();
    const {ok, ...result} = validForm();
    if(ok){
      return setErroForm({...result});
    }
    startLoginUser({correo, password});
  }

  
  const onLoginGoogle = useGoogleLogin({
    onSuccess: async(tokenResponse) => {
      const url ='https://www.googleapis.com/oauth2/v3/userinfo';
      const headers = {
        Authorization : `Bearer ${tokenResponse.access_token}`
      }
      try {
        const data = await axios.get(url, {headers});
        startLoginWithGoogle(data.data);
      } catch (error) {
        console.log(error)
      }
    },
  });

  return (
    <LayoutAuth onSubmit={onLogin}>
      <div className="flex flex-col my-5">
        <label htmlFor="correo" className="font-semibold  mb-1 ml-1">
          Correo
        </label>
        <span
          className={`mb-1 ml-1 ${
            erroForm.correo ? "text-red-300 inline" : "hidden"
          }`}
        >
          {erroForm.correo}
        </span>
        <input
          type="text"
          id="correo"
          name="correo"
          value={correo}
          onChange={onChangeInput}
          placeholder="Correo"
          className="outline-none border focus:border-sky-400 p-2 rounded-md transition-all duration-150 ease-linear font-medium text-neutral-500"
          required
        />
      </div>

      <div className="flex flex-col my-5">
        <label htmlFor="password" className="font-semibold  mb-1 ml-1">
          Password
        </label>
        <span
          className={`mb-1 ml-1 ${
            erroForm.password ? "text-red-300 inline" : "hidden"
          }`}
        >
          {erroForm.password}
        </span>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChangeInput}
          placeholder="Passowrd"
          className="outline-none border focus:border-sky-400 p-2 rounded-md transition-all duration-150 ease-linear font-medium text-neutral-500"
          required
        />
      </div>

      <div>
        <button className="mb-3 active:scale-95 transition-all duration-150 ease-linear hover:bg-sky-500 bg-sky-600 text-white font-semibold p-1.5 rounded-sm w-full">
          Iniciar Sesion
        </button>
        <div className="mb-4 flex items-center justify-center gap-2">
          <p className="border-b h-2 w-40"></p>
          <p>o</p>
          <p className="border-b h-2 w-40"></p>
        </div>


        <button
          className="flex items-center justify-center bg-white hover:bg-neutral-200 transition-all duration-150 ease-linear rounded-sm w-full p-1.5 text-black font-medium gap-2"
          type="button"
          onClick={() => onLoginGoogle()}
        >
          <span>Iniciar con Google</span>
          <div>
            <FcGoogle className="text-xl" />
          </div>
        </button>

        <h1 className="cursor-default text-center mt-5">
          ¿No tienes cuenta?{" "}
          <Link
            className=" text-sky-600 font-medium transition-all duration-150 ease-linear hover:text-sky-400"
            to="/auth/register"
          >
            ¡Registrate!
          </Link>{" "}
        </h1>
      </div>
    </LayoutAuth>
  );
}
