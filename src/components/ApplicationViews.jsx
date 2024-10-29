
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login.jsx"
import Home from "../pages/Home"
import { Register } from '../pages/Register.jsx'
import { Authorized } from "./Authorized.jsx"
import { Browse } from "./Browse.jsx"
import { RestaurantDetails } from "./RestaurantDetails.jsx"
import { NewRestaurant } from "./NewRestaurant.jsx"
import { MyDishes } from "./MyDishes.jsx"
import { Wishlist } from "./Wishlist.jsx"
import { RestaurantReviews } from "./RestaurantReviews.jsx"
import { NewDish } from "./NewDish.jsx"
import { EditDish } from "./EditDish.jsx"
import { ReviewDish } from "./ReviewDish.jsx"
import { DishDetails } from "./DishDetails.jsx"
import { EditRestaurantReview } from "./EditRestaurantReview.jsx"



export const ApplicationViews = () => {


    return <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/" element={<Home />} />
                <Route path="/browse" element={<Browse />} />
                <Route path="/mydishes" element={<MyDishes />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/restaurant" >
                    <Route path=":restaurantId" element={<RestaurantDetails/>} />
                    <Route path=":restaurantId/reviews" element={<RestaurantReviews/>} />
                    <Route path=":restaurantId/reviews/edit" element={<EditRestaurantReview />} />
                    <Route path=":restaurantId/new-dish" element={<NewDish />} />
                    <Route path="new" element={<NewRestaurant />} />
                </Route>
                <Route path="/dish">
                    <Route path=":dishId" element={<DishDetails />} />
                    <Route path=":dishId/edit" element={<EditDish />} />
                    <Route path=":dishId/review" element={<ReviewDish />} />
                </Route>
            </Route>
        </Routes>
    </BrowserRouter>
}