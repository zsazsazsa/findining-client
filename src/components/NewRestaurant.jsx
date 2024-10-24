import { useEffect, useState } from "react"
import { getCategories } from "../managers/categoryManager"
import { saveRestaurant } from "../managers/restaurantManager"
import { useNavigate } from "react-router-dom"

export const NewRestaurant = () => {

    const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [newRestaurant, setNewRestaurant] = useState({
        name: "",
        location: "",
        category: 0
    })

    useEffect(()=>{
        getCategories().then(data => {
            setCategories(data)
        })
    }, [])

    const handleInputChange = (e) => {
        const newCopy = {...newRestaurant}
        newCopy[e.target.name] = (e.target.value)
        setNewRestaurant(newCopy)
    }

    const handleCategory = (e) => {
        const newCopy = { ...newRestaurant }
        const selectedCategoryId = parseInt(e.target.value) 
        newCopy.category = selectedCategoryId
        setNewRestaurant(newCopy)
    }

    const handleSave = (e) => {
        e.preventDefault()
        saveRestaurant(newRestaurant).then(()=>{
            navigate("/browse")
        })
    }

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
                    <select onChange={handleCategory}>
                        <option disabled selected>Cuisine:</option>
                        {categories.map(category => {
                            return <option key={category.id} value={category.id}>{category.type}</option>
                        })}
                    </select>
                </fieldset>
                <fieldset>
                    <label>Location:</label>
                    <input 
                        type="text"
                        name="location"
                        onChange={handleInputChange} />
                </fieldset>
                <fieldset>
                    <label>Rating:</label>
                    <form>
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
                    <textarea></textarea>
                </fieldset>
                <button onClick={handleSave}>Save</button>
            </div>
        </>
    )
}