import chatApi from "./chatApi";

const urlRegister = '/auth/register';
const urlLogin = '/auth/login';
const urlLoginGoogle = '/auth/google';
const urlToken = '/auth/token';
const urlUpdateFoto = '/auth/updateFoto';
const urlCancelFoto = '/auth/cancelFoto';
const urlUpdateProcfile = '/auth/updateProcfile';

export const registerUserWithEmailAndPassowrd = async(payload) => {
    try{
        const {data} = await chatApi.post(urlRegister, payload);
        return{
            ok:true,
            data:data.data,
            token:data.token
        }
    }catch(err){
        console.log(err)
        return {
            ok:false,
            error:err.response?.data
        }
    }
}


export const loginUserWithEmailAndPassowrd = async(payload) => {
    try{
        const {data} = await chatApi.post(urlLogin, payload);
        return{
            ok:true,
            data:data.data,
            token:data.token
        }
    }catch(err){
        console.log(err)
        return {
            ok:false,
            error:err.response?.data
        }
    }
}


export const verifyToken = async() => {
    try{
        const {data} = await  chatApi.get(urlToken);
        return {
            ok:true,
            data:data.data,
        }

    }catch(err){
        console.log(err)
        return {
            ok:false,
            error:err.response?.data
        }
    }
};


export const setUpdateFotoTemp = async(payload) => {

    const headers = {
        'Content-Type' : 'multipart/form-data'
    }

    try{
        const {data} = await  chatApi.post(urlUpdateFoto, payload, {headers});
        return {
            ok:true,
            foto:data.foto,
        }

    }catch(err){
        console.log(err)
        return {
            ok:false,
            error:err.response?.data
        }
    }
};


export const cancelFotoTemp = async(payload) => {

    try{
        await  chatApi.post(urlCancelFoto, payload);
        return {
            ok:true,
        }

    }catch(err){
        console.log(err)
        return {
            ok:false,
            error:err.response?.data
        }
    }
};

export const updateProcfile = async(id, payload) => {

    try{
        const data = await  chatApi.put(`${urlUpdateProcfile}/${id}`, payload);
        return {
            ok:true,
            data:data.data,
        }

    }catch(err){
        console.log(err)
        return {
            ok:false,
            error:err.response?.data
        }
    }
};

export const loginWithGoogle = async(payload) => {

    try {
        const {data} = await chatApi.post(urlLoginGoogle, payload);
        return {
            ok:true,
            data:data.data,
            token:data.token
        }
    } catch (error) {
        console.log(error)
        return {
            ok:false,
            error:error.response?.data
        }
    }
}