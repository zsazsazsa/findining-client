import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { getDishes } from "../managers/dishManager"
import { getRestaurantById } from "../managers/restaurantManager"

export const RestaurantDetails = () => {

    const {restaurantId} = useParams()
    const [restaurant, setRestaurant] = useState({})
    const [dishes, setDishes] = useState([])
    const [filteredDishes, setFilteredDishes] = useState([])


    useEffect(()=>{
        getRestaurantById(restaurantId).then(data => {
            setRestaurant(data)
        })
    }, [restaurantId])

    useEffect(()=>{
        getDishes().then(data => {
            setDishes(data)
        })
    },[])

    useEffect(()=>{
        const restaurantDishes = dishes.filter(dish => dish.restaurant.id == restaurantId)
        setFilteredDishes(restaurantDishes)
    },[dishes, restaurantId])

    return (
        <>
        <h1>{restaurant.name}</h1>
        <h2>{restaurant.location}</h2>
        <Link to={`reviews`}>read reviews</Link>
        {filteredDishes.map(dish=> (
            <h2 key={dish.id}>{dish.name}</h2>
        ))}
        </>
    )
}