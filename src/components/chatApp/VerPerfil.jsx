import { FaUserCircle } from "react-icons/fa"


export const VerPerfil = ({payload}) => {
  return (
    <section className="select-none">
      <article className="text-lg flex items-center gap-2">
        <FaUserCircle className="text-2xl" />
        <h1 className="font-semibold underline">Perfil</h1>
      </article>

      <article className="mt-4">
        <div className="flex items-center gap-4 relative">
          <div
            className="avatar"
          >
            <div className="w-28 rounded-full ring ring-red-600 ring-offset-base-100 ring-offset-2">
              <img src={payload?.foto} alt="Foto de perfil" />
            </div>
          </div>

          
          <div className="flex flex-col w-full gap-1">
            <label
              htmlFor="nombre"
              className="font-bold text-slate-500 underline"
            >
              Nombre
            </label>
          
            <h2>{payload?.nombre}</h2>

            <label
              htmlFor="descripcion"
              className="font-bold text-slate-500 underline"
            >
              Descripción
            </label>
            <h3>{payload?.descripcion || ''}</h3>
          </div>
        </div>
      </article>

    </section>
  )
}
