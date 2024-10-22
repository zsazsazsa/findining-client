import { getRestaurants } from '../managers/restaurantManager'
import { useEffect, useState } from 'react'

export const Browse = () => {
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        getRestaurants().then(data => setRestaurants(data))
    }, [])

    return (
        <>
            {restaurants.map(restaurant => (
                <h2 key={restaurant.id}>{restaurant.name}</h2> 
            ))}
        </>
    )
}
