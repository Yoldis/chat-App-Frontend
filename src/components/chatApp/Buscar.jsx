import { useEffect } from "react";
import { useForm } from "../../hooks";
import { CiSearch } from "react-icons/ci";


export const Buscar = ({callback, title}) => {
    const {buscar, onChangeInput}  = useForm({buscar:''});

    useEffect(() => {
        callback(buscar);
      }, [buscar])

  return (
    <div className="flex gap-2 items-center mx-2 my-2 border-sky-800 hover:shadow-md hover:shadow-sky-600 p-1 rounded-md border-transparent border hover:border-sky-600 ease-linear transition-all duration-200 bg-gray-800">
      <input
        type="text"
        placeholder={title}
        className="w-full outline-none p-1 rounded-sm  bg-gray-800"
        name="buscar"
        value={buscar}
        onChange={onChangeInput}
        autoComplete="off"
      />

      <div>
        <CiSearch className="text-xl mr-2" />
      </div>
    </div>
  );
}
