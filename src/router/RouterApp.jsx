import { Navigate, Route, Routes } from "react-router-dom"
import { AuthRouter } from "./index";
import { CheckingStatus } from "../helpers/ChekingStatus";
import { Alert } from "../components/Alert";
import { useSelector } from "react-redux";
import { Home } from "../components/chatApp";


export const RouterApp = () => {

    const{status, logoApp} = CheckingStatus();
    const {msgError} = useSelector(state => state.auth);

    if(status === 'Checking'){
      return (
        <div className="flex flex-col items-center gap-5 mt-40">
          <Alert typeAlert={msgError?.typeAlert} msg={msgError?.msg}/>
          <img className='h-20 w-20' src = {logoApp}  alt="" />
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )
    }

  return (
    <div className="animate__animated animate__fadeIn">
      <Routes>
        {status === 'Authenticated' ? (
          <>
            <Route path="/*" element={<Home />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
          <Route path="/auth/*" element={<AuthRouter />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        )}
      </Routes>
    </div>
  );
}
