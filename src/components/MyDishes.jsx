import { useEffect, useState } from "react"
import { deleteDish, getDishes } from "../managers/dishManager"

export const MyDishes = () => {

    const user = localStorage.user_id
    const [dishes, setDishes] = useState([])
    const [myDishes, setMyDishes] = useState([])
    const [toggleReRender, setToggleReRender] = useState(false)

    useEffect(()=>{
        getDishes().then(data => {
            setDishes(data)
        })
    },[toggleReRender])

    useEffect(()=>{
        const filteredDishes = dishes.filter(dish => dish.user.id == user)
        setMyDishes(filteredDishes)
    }, [dishes, user])

    const handleDelete = (e) => {
        const dishToDelete = e.target.value
        deleteDish(dishToDelete).then(()=>{
            setToggleReRender(!toggleReRender)
        })
    }

    return (
        <>
            <div>
                {myDishes.map(dish => (
                    <>
                        <h2 key={dish.id}>{dish.name}</h2>
                        <button value={dish.id} onClick={handleDelete}>Delete</button>
                    </>
                ))}
            </div>
        </>
    )
}