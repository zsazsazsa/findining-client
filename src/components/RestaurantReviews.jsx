import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getRestaurantReviews } from "../managers/reviewManager"

export const RestaurantReviews = () => {

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
                return <p key={item.id}>{item.review}</p>
            })}
        </>
    )
}