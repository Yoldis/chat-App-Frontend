import { useEffect } from "react";
import {  useDispatch, useSelector } from "react-redux"
import { verifyToken } from "../api/authProvider";
import { AuthStore, ChatStore } from "../hooks/index";
import { onLogin } from "../store/authSlice";

export const CheckingStatus = () => {

    const{status, userId} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const{startMsgError, logoApp} = AuthStore();
    const{startGetSugerencias, startGetSolicitudes, startAmigos} = ChatStore();

    useEffect(() => {
        if(userId){
            const getData = async() => {
                await startGetSugerencias(userId);
                await startGetSolicitudes(userId);
                await startAmigos(userId);
            }
            getData();
        }
    }, [userId])

    useEffect(() => {
        const verifyAuth = async() => {
            const {ok, data, error} =  await verifyToken();
            if(!ok) {
                localStorage.clear();
                return startMsgError(ok, error);
            }
            dispatch(onLogin(data));
        }
        verifyAuth();
    }, []);



    return {
        status,
        logoApp
    }
}