import { useEffect, useState } from "react"
import { getDishes } from "../managers/dishManager"
import { Link } from "react-router-dom"

function Home() {

    const [dishes, setDishes] = useState([])
    const [filteredDishes, setFilteredDishes] = useState([])

    useEffect(()=>{
        getDishes().then(data => {
            setDishes(data)
        })
    },[])

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const searchTerm = e.target.value.toLowerCase()
            const searchResults = dishes.filter(dish => 
                dish.name.toLowerCase().includes(searchTerm)
            )
            setFilteredDishes(searchResults)
        }
    }

    return (
      <main className='text-slate-900 pl-10 pr-10'>
        <h1 className='text-4xl'>findining</h1>
        <input type='text' placeholder="search" onKeyUp={handleSearch}></input>
        {filteredDishes.length > 0 ? <>
            {filteredDishes.map(dish => (
                <h2 key={dish.id}>{dish.name} from <Link to={`/restaurant/${dish.restaurant.id}`}>{dish.restaurant.name}</Link></h2>
            ) )}</> : ""}
      </main>
    )
  }
  export default Home
  