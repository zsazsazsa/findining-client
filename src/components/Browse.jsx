import { Link } from 'react-router-dom'
import { getRestaurants } from '../managers/restaurantManager'
import { useEffect, useState } from 'react'
import { getCategories } from '../managers/categoryManager'

export const Browse = () => {
    const [restaurants, setRestaurants] = useState([])
    const [filteredRestaurants, setFilteredRestaurants] = useState([])
    const [categories, setCategories] = useState([])
    const [triggerReRender, setTriggerReRender] = useState(false)

    useEffect(() => {
        getRestaurants().then(data => {
            setRestaurants(data) 
            setFilteredRestaurants(data) 
        })
    }, [])

    useEffect(() => {
        getCategories().then(data => {
            setCategories(data)
        })
    }, [])

    const handleCategory = (e) => {
        const category = parseInt(e.target.value)
        const restaurantByCategory = restaurants.filter(restaurant => restaurant.category.id === category)
        setFilteredRestaurants(restaurantByCategory)
        setTriggerReRender(!triggerReRender)
    }

    return (
        <>

            <select onChange={handleCategory}>
                    <option disabled selected>Cuisine:</option>
                    {categories.map(category => {
                        return <option key={category.id} value={category.id}>{category.type}</option>
                    })}
            </select>
            {filteredRestaurants.slice().reverse().map(restaurant => (
               <Link to={`/restaurant/${restaurant.id}`}><h2 key={restaurant.id}>{restaurant.name}</h2></Link>
            ))}
        </>
    )
}
