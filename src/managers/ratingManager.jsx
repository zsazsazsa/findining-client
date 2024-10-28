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