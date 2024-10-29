import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDishById, updateDish } from "../managers/dishManager"
import { getDishRatingById, saveDishRating, updateDishRating } from "../managers/ratingManager"
import { getReviewByDishId, saveDishReview, updateDishReview } from "../managers/reviewManager"

export const EditDish = () => {

    const navigate = useNavigate()

    const {dishId} = useParams()
    const [dish, setDish] = useState({})
    const [dishRating, setDishRating] = useState({})
    const [dishReview, setDishReview] = useState({})

    useEffect(()=>{
        getDishById(dishId).then(data => {
            setDish(data)
        })
    }, [dishId])

    useEffect(()=>{
        getDishRatingById(dishId).then(data => {
            setDishRating(data[0])
        })
    }, [dishId])

    useEffect(()=>{
        getReviewByDishId(dishId).then(data => {
            setDishReview(data[0])
        })
    }, [dishId])

    const handleInputChange = (e) => {
        const newCopy = {...dish}
        newCopy[e.target.name] = (e.target.value)
        setDish(newCopy)
    }

    const handleRating = (e) => {
        const ratingCopy = {...dishRating}
        ratingCopy['rating'] = parseInt(e.target.value)
        ratingCopy['dish'] = parseInt(dishId)
        setDishRating(ratingCopy)

    }

    const handleReview = (e) => {
        const reviewCopy = {...dishReview}
        reviewCopy['review'] = e.target.value
        reviewCopy['dish'] = parseInt(dishId)
        setDishReview(reviewCopy)
    }


    const handleUpdate = async (e) => {
        e.preventDefault();

        await updateDish(dish)
    
        if (dishReview && dishReview.id) {
            await updateDishReview(dishReview);
        } else {
            await saveDishReview({ ...dishReview, dish: parseInt(dishId) });
        }
    
        if (dishRating && dishRating.id) {
            await updateDishRating(dishRating);
        } else {
            await saveDishRating({ ...dishRating, dish: parseInt(dishId) });
        }
    
        navigate('/mydishes');
    };
    
    
    return (
        <>
            <div>
                <fieldset>
                    <label>Name:</label>
                    <input 
                        type="text"
                        name="name"
                        value={dish.name}
                        onChange={handleInputChange} />
                </fieldset>
                <fieldset>
                    <label>Rating:</label>
                    <form>
                        {[1, 2, 3, 4, 5].map((value) => (
                        <label key={value}>
                            <input
                            type="radio"
                            value={value}
                            name="rating"
                            checked={dishRating?.rating === value}
                            onChange={handleRating}
                            />
                            {value}
                        </label>
                        ))}
                    </form>
                </fieldset>
                <fieldset>
                    <label>Review:</label>
                    <textarea value={dishReview?.review} onChange={handleReview}></textarea>
                </fieldset>
                <button onClick={handleUpdate}>Save</button>
            </div>
        </>
    )
}
