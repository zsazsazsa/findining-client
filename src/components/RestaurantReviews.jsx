import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getRestaurantReviews } from "../managers/reviewManager"

export const RestaurantReviews = () => {

    const navigate = useNavigate()
    const user = localStorage.user_id
    const {restaurantId} = useParams()
    const [allReviews, setAllReviews] = useState([])
    const [filteredReviews, setFilteredReviews] = useState([])

    useEffect(()=>{
        getRestaurantReviews().then(data => {
            setAllReviews(data)
        })
    }, [])

    useEffect(()=>{
        const restaurantReviews = allReviews.filter(review => review.restaurant.id == restaurantId)
        setFilteredReviews(restaurantReviews)
    }, [allReviews, restaurantId])

    return (
        <>
            {filteredReviews.map(item => {
                return (
                    <>
                        <p key={item.id}>{item.review}</p>
                        {item.user.id == user && <button onClick={() => {
                            navigate(`edit`)
                        }}>Edit Review</button>}
                    </>
            )
            })}
        </>
    )
}