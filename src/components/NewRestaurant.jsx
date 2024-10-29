import { useEffect, useState } from "react"
import { getCategories } from "../managers/categoryManager"
import { getRestaurants, saveRestaurant } from "../managers/restaurantManager"
import { useNavigate } from "react-router-dom"
import { saveRestaurantRating } from "../managers/ratingManager"
import { saveRestaurantReview } from "../managers/reviewManager"

export const NewRestaurant = () => {

    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [newRestaurant, setNewRestaurant] = useState({
        name: "",
        location: "",
        category: 0
    })

    const [restaurants, setRestaurants] = useState([])

    const lastAddedRestaurant = restaurants[restaurants.length -1]

    useEffect(()=>{
        getCategories().then(data => {
            setCategories(data)
        })
    }, [])

    useEffect(()=>{
        getRestaurants().then(data => {
            setRestaurants(data)
        })
    }, [])

    const [newRating, setNewRating] = useState({
        restaurant: 0,
        rating: 0
    })

    const [newReview, setNewReview] = useState({
        restaurant: 0,
        review: ""
    })

    const handleInputChange = (e) => {
        const newCopy = {...newRestaurant}
        newCopy[e.target.name] = (e.target.value)
        setNewRestaurant(newCopy)
    }

    const handleRating = (e) => {
        const ratingCopy = {...newRating}
        ratingCopy[e.target.name] = parseInt(e.target.value)
        ratingCopy['restaurant'] = lastAddedRestaurant.id + 1
        setNewRating(ratingCopy)

    }

    const handleReview = (e) => {
        const reviewCopy = {...newReview}
        reviewCopy['review'] = e.target.value
        reviewCopy['restaurant'] = lastAddedRestaurant.id + 1
        setNewReview(reviewCopy)
    }

    const handleCategory = (e) => {
        const newCopy = { ...newRestaurant }
        const selectedCategoryId = parseInt(e.target.value) 
        newCopy.category = selectedCategoryId
        setNewRestaurant(newCopy)
    }

    const handleSave = async (e) => {
        e.preventDefault();
        await saveRestaurant(newRestaurant)
        saveRestaurantReview(newReview)
        saveRestaurantRating(newRating).then(() => {
            navigate('/browse')
        })
    };
    
    

    
    return (
        <>
            <div>
                <fieldset>
                    <label>Name:</label>
                    <input 
                        type="text"
                        name="name"
                        onChange={handleInputChange} />
                </fieldset>
                <fieldset>
                    <select onChange={handleCategory}>
                        <option disabled selected>Cuisine:</option>
                        {categories.map(category => {
                            return <option key={category.id} value={category.id}>{category.type}</option>
                        })}
                    </select>
                </fieldset>
                <fieldset>
                    <label>Location:</label>
                    <input 
                        type="text"
                        name="location"
                        onChange={handleInputChange} />
                </fieldset>
                <fieldset>
                    <label>Rating:</label>
                    <form onChange={handleRating}>
                        {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value}>
                            <input
                            type="radio"
                            value={value}
                            name="rating"
                            />
                            {value}
                        </label>
                        ))}
                    </form>
                </fieldset>
                <fieldset>
                    <label>Review:</label>
                    <textarea onChange={handleReview}></textarea>
                </fieldset>
                <button onClick={handleSave}>Save</button>
            </div>
        </>
    )
}