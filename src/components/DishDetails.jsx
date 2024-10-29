import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDishById } from "../managers/dishManager"
import { getReviewByDishId } from "../managers/reviewManager"
import { getWishlist, saveWish } from "../managers/wishlistManager"

export const DishDetails = () => {

    const { dishId } = useParams()
    const [dish, setDish] = useState({})
    const [reviews, setReviews] = useState([])
    const [wishlist, setWishlist] = useState([])

    useEffect(()=>{
        getDishById(dishId).then(data => {
            setDish(data)
        })
    }, [dishId])

    useEffect(()=>{
        getReviewByDishId(dishId).then(data => {
            setReviews(data)
        })
    }, [dishId])

    useEffect(() => {
        getWishlist().then(data => {
            const wishlistIds = data.map(item => item.dish.id);
            setWishlist(wishlistIds);
        });
    }, []);

    const handleWishlist = async (e) => {
        const wish = { dish: parseInt(e.target.value) };

        await saveWish(wish);
        setWishlist(prevWishlist => [...prevWishlist, wish.dish]);
    };

    return (
        <>
            <h1>{dish.name}</h1>
            <h2>from {dish.restaurant?.name}</h2>
            <h3>Reviews:</h3>
            {reviews.map(review => {
                return <p key={review.id}>{review.review}</p>
            })}
            {!wishlist.includes(dish.id) && <button  value={dish.id} onClick={handleWishlist}>Add to Wishlist</button>}
        </>
    )
}