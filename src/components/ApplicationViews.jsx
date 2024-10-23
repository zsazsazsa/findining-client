
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { Register } from '../pages/Register.jsx'
import { Authorized } from "./Authorized.jsx"
import { Browse } from "./Browse.jsx"
import { RestaurantDetails } from "./RestaurantDetails.jsx"


export const ApplicationViews = () => {


    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/restaurant" >
                    <Route path=":restaurantId" element={<RestaurantDetails/>} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}