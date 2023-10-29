import chatApi from "./chatApi";

const urlAmigos = '/amigos';

export const getSugerenciasApi = async(useId) => {

    try {
        const res = await chatApi.get(`${urlAmigos}/sugerencias/${useId}`);

        return  {
            ok:true,
            data:res.data.data
        }

    } catch (error) {
        console.log(error)
        return  {
            ok:false,
            error:error.response?.data
        }
    }
}


export const getSolicitudes = async(useId) => {
    try {
        const res = await chatApi.get(`${urlAmigos}/solicitudes/${useId}`);
        return {
            ok:true,
            data:res.data.data
        }

    } catch (error) {
        console.log(error)
        return  {
            ok:false,
            error:error.response?.data
        }
    }
}



export const getAmigos = async(useId) => {
    
    try {
        const res = await chatApi.get(`${urlAmigos}/${useId}`);
        return {
            ok:true,
            data:res.data.data
        }

    } catch (error) {
        console.log(error)
        return  {
            ok:false,
            error:error.response?.data
        }
    }
}

