import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getRestaurantRatingById, updateRestaurantRating } from "../managers/ratingManager"
import { getRestaurantById } from "../managers/restaurantManager"
import { getRestaurantReviewById, updateRestaurantReview } from "../managers/reviewManager"

export const EditRestaurantReview = () => {

    const navigate = useNavigate()

    const {restaurantId} = useParams()
    const [restaurant, setRestaurant] = useState({})
    const [restaurantRating, setRestaurantRating] = useState({})
    const [restaurantReview, setRestaurantReview] = useState({})

    useEffect(()=>{
        getRestaurantById(restaurantId).then(data => {
            setRestaurant(data)
        })
    }, [restaurantId])

    useEffect(()=>{
        getRestaurantRatingById(restaurantId).then(data => {
            setRestaurantRating(data[0])
        })
    }, [restaurantId])

    useEffect(()=>{
        getRestaurantReviewById(restaurantId).then(data => {
            setRestaurantReview(data[0])
        })
    }, [restaurantId])


    const handleRating = (e) => {
        const ratingCopy = {...restaurantRating}
        ratingCopy['rating'] = parseInt(e.target.value)
        ratingCopy['restaurant'] = restaurantId
        setRestaurantRating(ratingCopy)

    }

    const handleReview = (e) => {
        const reviewCopy = {...restaurantReview}
        reviewCopy['review'] = e.target.value
        reviewCopy['restaurant'] = restaurantId
        setRestaurantReview(reviewCopy)
    }


    const handleUpdate = async (e) => {
        e.preventDefault()
        updateRestaurantReview(restaurantReview)
        updateRestaurantRating(restaurantRating).then(() => {
            navigate('/mydishes')
        })
    };
    
    
    return (
        <>
            <div>
                <h1>{restaurant.name}</h1>
                <fieldset>
                    <label>Rating:</label>
                    <form>
                        {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value}>
                            <input
                            type="radio"
                            value={value}
                            name="rating"
                            checked={restaurantRating?.rating === value}
                            onChange={handleRating}
                            />
                            {value}
                        </label>
                        ))}
                    </form>
                </fieldset>
                <fieldset>
                    <label>Review:</label>
                    <textarea value={restaurantReview?.review} onChange={handleReview}></textarea>
                </fieldset>
                <button onClick={handleUpdate}>Save</button>
            </div>
        </>
    )
}
