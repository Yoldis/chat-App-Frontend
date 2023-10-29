import { Buscar } from "../components/chatApp";
import { ChatStore } from "../hooks";


export const LayoutTitleView = ({children, title, icon, type = ''}) => {
  const{startSearchSugerencia} = ChatStore();
  return (
    <article className={`select-none animate__animated animate__fadeIn`}>
      <div>
        <div className="m-2 my-5 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2 text-xl">
            <div>{icon}</div>
            <h1 className="font-bold ">{title}</h1>
          </div>

          {/* <button className="ml-2 btn bg-sky-600 text-white p-2 hover:bg-sky-500">
            Ver mas
          </button> */}
          {
            type === 'Sugerencias' && <Buscar callback={startSearchSugerencia} title='Buscar Sugerencias'/>
          }
          
        </div>

        <div className="m-3">{children}</div>
      </div>
    </article>
  );
}
