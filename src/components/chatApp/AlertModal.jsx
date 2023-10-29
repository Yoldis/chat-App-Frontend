import { useRef } from "react";


export const AlertModal = ({title = '', id = '', callback, titleBtn  = 'Eliminar'}) => {
  const refCloseBtn = useRef();

  const onEliminar = () => {
    refCloseBtn.current.click();
    callback();
  }

  return (
    <dialog id={id} className="modal">
      <div className="modal-box ">
        <h3 className="font-bold text-lg">{title}</h3>

        <div className="flex gap-4 justify-between mt-5 ">
          <button
            onClick={onEliminar}
            className="btn bg-red-600 text-neutral-200"
          >
            {titleBtn}
          </button>
          <form method="dialog">
            <button
              ref={refCloseBtn}
              className="btn bg-sky-600 text-neutral-200"
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
