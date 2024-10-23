import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDishes } from "../managers/dishManager"

export const RestaurantDetails = () => {

    const {restaurantId} = useParams()
    const [dishes, setDishes] = useState([])
    const [filteredDishes, setFilteredDishes] = useState([])

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
        {filteredDishes.map(dish=> (
            <h2 key={dish.id}>{dish.name}</h2>
        ))}
        </>
    )
}