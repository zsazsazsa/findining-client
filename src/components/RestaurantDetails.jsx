import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getDishes } from "../managers/dishManager"
import { getRestaurantById } from "../managers/restaurantManager"
import { getWishlist, saveWish } from "../managers/wishlistManager"


export const RestaurantDetails = () => {

    const navigate = useNavigate()
    const {restaurantId} = useParams()
    const [restaurant, setRestaurant] = useState({})
    const [dishes, setDishes] = useState([])
    const [filteredDishes, setFilteredDishes] = useState([])
    const [wishlist, setWishlist] = useState([])



    useEffect(()=>{
        getRestaurantById(restaurantId).then(data => {
            setRestaurant(data)
        })
    }, [restaurantId])

    useEffect(()=>{
        getDishes().then(data => {
            setDishes(data)
        })
    },[])

    useEffect(()=>{
        const restaurantDishes = dishes.filter(dish => dish.restaurant.id == restaurantId)
        setFilteredDishes(restaurantDishes)
    },[dishes, restaurantId])

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
            <h1>{restaurant.name}</h1>
            <h2>{restaurant.location}</h2>
            <Link to={`reviews`}>read reviews</Link>
            {filteredDishes.map(dish => (
                <>
                    <div key={dish.id}>
                        <h2>{dish.name}</h2>
                        {!wishlist.includes(dish.id) && <button  value={dish.id} onClick={handleWishlist}>Add to Wishlist</button>}
                    </div>
                </>
            ))}
            <div>
                <button onClick={()=>{
                    navigate(`new-dish`)
                }}>Add a Dish</button>
            </div>
        </>
    );
    
}