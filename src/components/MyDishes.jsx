import { useEffect, useState } from "react"
import { deleteDish, getDishes } from "../managers/dishManager"
import { Link, useNavigate } from "react-router-dom"

export const MyDishes = () => {

    const user = localStorage.user_id
    const navigate = useNavigate()
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
                        <Link to={`/dish/${dish.id}`}><h2 key={dish.id}>{dish.name}</h2></Link>
                        <button value={dish.id} onClick={()=>{
                            navigate(`../dish/${dish.id}/edit`)
                        }}>Edit</button>
                        <button value={dish.id} onClick={handleDelete}>Delete</button>
                    </>
                ))}
            </div>
        </>
    )
}