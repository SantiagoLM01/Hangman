import { Navigate, Route, Routes } from "react-router-dom"
import App from "./App"
import PrincipalPage from "./PrincipalPage"

const AppRouter = () => {
  return (
    <Routes>

        <Route path="/" element={<PrincipalPage></PrincipalPage>}></Route>

        <Route path="hangman" element={<App></App>}></Route>


        <Route path="/*" element={<Navigate to={'/'}></Navigate>}></Route>





    </Routes>


    )
}

export default AppRouter