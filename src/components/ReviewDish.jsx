import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDishById } from "../managers/dishManager"
import { saveDishRating } from "../managers/ratingManager"
import { saveDishReview } from "../managers/reviewManager"

export const ReviewDish = () => {




//CHANGE GET DISH TO GET WISHLIST ITEM FOR EASIER DELETE
    const navigate = useNavigate()
    const {dishId} = useParams()
    const [dish, setDish] = useState({})
    const [newRating, setNewRating] = useState({
        dish: 0,
        rating: 0
    })

    const [newReview, setNewReview] = useState({
        dish: 0,
        review: ""
    })

    useEffect(()=>{
        getDishById(dishId).then(data => {
            setDish(data)
        })
    }, [dishId])



    const handleRating = (e) => {
        const ratingCopy = {...newRating}
        ratingCopy['rating'] = parseInt(e.target.value)
        ratingCopy['dish'] = dishId
        setNewRating(ratingCopy)

    }

    const handleReview = (e) => {
        const reviewCopy = {...newReview}
        reviewCopy['review'] = e.target.value
        reviewCopy['dish'] = dishId
        setNewReview(reviewCopy)
    }


    const handleUpdate = async (e) => {
        e.preventDefault();
        saveDishReview(newReview)
        saveDishRating(newRating).then(() => {
            navigate('/wishlist')
        })
    };
    
    
    return (
        <>
            <div>
                <h1>{dish.name}</h1>
                <fieldset>
                    <label>Rating:</label>
                    <form>
                        {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value}>
                            <input
                            type="radio"
                            value={value}
                            name="rating"
                            onChange={handleRating}
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
                <button onClick={handleUpdate}>Save</button>
            </div>
        </>
    )
}
