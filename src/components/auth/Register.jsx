import { Link } from "react-router-dom"
import { LayoutAuth } from "../../layout/LayoutAuth"
import { useForm } from "../../hooks/useForm";
import { AuthStore } from "../../hooks/AuthStore";


export const Register = ({input}) => {
  const {nombre, correo, password, onChangeInput, validForm, setErroForm, erroForm} = useForm(input);
  const{startRegisterUser} = AuthStore();

  const onRegister = (e) => {
    e.preventDefault();
    const {ok, ...result} = validForm();
    if(ok){
      return setErroForm({...result});
    }
    startRegisterUser({nombre, correo, password});
  }

  return (
    <LayoutAuth onSubmit = {onRegister}>
      <div className="flex flex-col">
        <label htmlFor="nombre" className="font-semibold  mb-1 ml-1">
          Nombre
        </label>
        <span className={`mb-1 ml-1 ${erroForm.nombre ? 'text-red-300 inline':'hidden'}`}>{erroForm.nombre}</span>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={onChangeInput}
          placeholder="Nombre"
          className={`outline-none border  p-2 rounded-md transition-all duration-150 ease-linear font-medium text-neutral-500 ${erroForm.nombre ? 'border-red-300' :'focus:border-sky-400'}`}
          required
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col my-5">
        <label htmlFor="correo" className="font-semibold  mb-1 ml-1">
          Correo
        </label>
        <span className={`mb-1 ml-1 ${erroForm.correo ? 'text-red-300 inline':'hidden'}`}>{erroForm.correo}</span>
        <input
          type="text"
          id="correo"
          name="correo"
          value={correo}
          onChange={onChangeInput}
          placeholder="Correo"
          className={`outline-none border  p-2 rounded-md transition-all duration-150 ease-linear font-medium text-neutral-500 ${erroForm.correo ? 'border-red-300' :'focus:border-sky-400'}`}
          required
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col my-5">
        <label htmlFor="password" className="font-semibold  mb-1 ml-1">
          Password
        </label>
        <span className={`mb-1 ml-1 ${erroForm.password ? 'text-red-300 inline':'hidden'}`}>{erroForm.password}</span>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={onChangeInput}
          placeholder="Passowrd"
          className={`outline-none border  p-2 rounded-md transition-all duration-150 ease-linear font-medium text-neutral-500 ${erroForm.password ? 'border-red-300' :'focus:border-sky-400'}`}
          required
          autoComplete="off"
        />
      </div>

      <div>
        <button className="mb-5 active:scale-95 transition-all duration-150 ease-linear hover:bg-sky-500 bg-sky-600 text-white font-semibold p-1.5 rounded-sm w-full">Registrarse</button>
        <h1 className="cursor-default text-center">¿Ya tienes cuenta? <Link className=" text-sky-600 font-medium transition-all duration-150 ease-linear hover:text-sky-400" to='/auth/login'>¡Inicia Sesion!</Link> </h1>
      </div>
    </LayoutAuth>

  )
}
