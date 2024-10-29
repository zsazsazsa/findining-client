import { useEffect, useState } from "react"
import { getWishlist, removeFromWishlist } from "../managers/wishlistManager"
import { useNavigate } from "react-router-dom"

export const Wishlist = () => {

    const user = localStorage.user_id
    const navigate = useNavigate()

    const [allWishes, setAllWishes] = useState([])
    const [myWishlist, setMyWishlist] = useState([])

    useEffect(()=>{
        getWishlist().then(data => {
            setAllWishes(data)
        })
    }, [])

    useEffect(()=>{
        const filteredWishlist = allWishes.filter(list => list.user.id === parseInt(user))
        setMyWishlist(filteredWishlist)
    }, [allWishes, user])


    return (
        <>
            {myWishlist.map(list => (
                <>
                    <h2 key={list.dish.id}>{list.dish.name}</h2>
                    <button value={list.id} onClick={(e) => {
                        const entryToRemove = e.target.value
                        removeFromWishlist(entryToRemove).then(()=>{
                            navigate(`../dish/${list.dish.id}/review`)
                        })
                    }}>Review</button>
                                </>
                            ))}
        </>
    )
}