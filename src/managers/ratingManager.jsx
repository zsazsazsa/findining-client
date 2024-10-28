const APIurl = 'http://localhost:8000/'

export const saveRestaurantRating = async (restaurantRating) => {
    await fetch(`${APIurl}restaurant-rating`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            },
            body: JSON.stringify(restaurantRating)
        }
    )
}

export const saveDishRating = async (dishRating) => {
    await fetch(`${APIurl}dish-rating`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            },
            body: JSON.stringify(dishRating)
        }
    )
}

export const updateDishRating = async (dishRating) => {
    await fetch(`${APIurl}dish-rating/${dishRating.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            },
            body: JSON.stringify(dishRating)
        }
    )
}

export const getDishRatingById = async (id) => {
    const response = await fetch(`${APIurl}dish-rating?dish_id=${id}`, {
        headers: {
            Authorization: `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
        }
    });
    const rating = await response.json()
    return rating
}