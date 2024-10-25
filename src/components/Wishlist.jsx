import { useEffect, useState } from "react"
import { getWishlist } from "../managers/wishlistManager"

export const Wishlist = () => {

    const user = localStorage.user_id

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
                <h2 key={list.dish.id}>{list.dish.name}</h2>
            ))}
        </>
    )
}