import { Link } from 'react-router-dom'
import { getRestaurants } from '../managers/restaurantManager'
import { useEffect, useState } from 'react'

export const Browse = () => {
    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        getRestaurants().then(data => setRestaurants(data))
    }, [])

    return (
        <>
            {restaurants.slice().reverse().map(restaurant => (
               <Link to={`/restaurant/${restaurant.id}`}><h2 key={restaurant.id}>{restaurant.name}</h2></Link>
            ))}
        </>
    )
}
