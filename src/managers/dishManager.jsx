const APIurl = 'http://localhost:8000/'

export const getDishes = async () => {
    const response = await fetch(`${APIurl}dishes`,
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            }
        })
    const dishes = await response.json()
    return dishes
}

export const getDishById = async (dishId) => {
    const response = await fetch(`${APIurl}dishes/${dishId}`,
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            }
        })
    const dish = await response.json()
    return dish
}

export const saveDish = async (dish) => {
    await fetch(`${APIurl}dishes`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            },
            body: JSON.stringify(dish)
        }
    )
}

export const deleteDish = async (dish) => {
    await fetch(`${APIurl}dishes/${dish}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            },
            body: JSON.stringify(dish)
        }
    )
}

export const updateDish = async (dish) => {
    await fetch(`${APIurl}dishes/${dish.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            },
            body: JSON.stringify(dish)
        }
    )
}

