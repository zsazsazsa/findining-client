import { useEffect, useState } from "react"
import { getDishes } from "../managers/dishManager"

export const MyDishes = () => {

    const user = localStorage.user_id
    const [dishes, setDishes] = useState([])
    const [myDishes, setMyDishes] = useState([])

    useEffect(()=>{
        getDishes().then(data => {
            setDishes(data)
        })
    },[])

    useEffect(()=>{
        const filteredDishes = dishes.filter(dish => dish.user.id == user)
        setMyDishes(filteredDishes)
    }, [dishes, user])

    return (
        <>
            {myDishes.map(dish => (
                <h2 key={dish.id}>{dish.name}</h2>
            ))}
        </>
    )
}