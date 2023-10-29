import { Route, Routes } from "react-router-dom"
import { Login, Register } from "../components/index"

const initialState = {
  nombre:'',
  correo:'',
  password:''
}

export const AuthRouter = () => {
  return (
   <Routes>
    <Route path="/login" element={<Login input={initialState} />}/>
    <Route path="/register" element={<Register input={initialState}/>}/>
   </Routes>
  )
}
