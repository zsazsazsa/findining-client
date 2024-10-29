import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { saveDishRating } from "../managers/ratingManager"
import { saveDishReview } from "../managers/reviewManager"
import { getDishes, saveDish } from "../managers/dishManager"

export const NewDish = () => {

    const { restaurantId } = useParams()

    const navigate = useNavigate()

    const [newDish, setNewDish] = useState({
        name: "",
        restaurant: restaurantId
    })

    const [dishes, setDishes] = useState([])

    const lastAddedDish = dishes[dishes.length -1]


    useEffect(()=>{
        getDishes().then(data => {
            setDishes(data)
        })
    }, [])

    const [newRating, setNewRating] = useState({
        dish: 0,
        rating: 0
    })

    const [newReview, setNewReview] = useState({
        dish: 0,
        review: ""
    })

    const handleInputChange = (e) => {
        const newCopy = {...newDish}
        newCopy[e.target.name] = (e.target.value)
        setNewDish(newCopy)
    }

    const handleRating = (e) => {
        const ratingCopy = {...newRating}
        ratingCopy['rating'] = parseInt(e.target.value)
        ratingCopy['dish'] = lastAddedDish.id + 1
        setNewRating(ratingCopy)

    }

    const handleReview = (e) => {
        const reviewCopy = {...newReview}
        reviewCopy['review'] = e.target.value
        reviewCopy['dish'] = lastAddedDish.id + 1
        setNewReview(reviewCopy)
    }


    const handleSave = async (e) => {
        e.preventDefault();
        await saveDish(newDish)
        saveDishReview(newReview)
        saveDishRating(newRating).then(() => {
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