const APIurl = 'http://localhost:8000/'

export const saveRestaurantReview = async (restaurantReview) => {
    await fetch(`${APIurl}restaurant-review`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            },
            body: JSON.stringify(restaurantReview)
        }
    )
}

export const saveDishReview = async (dishReview) => {
    await fetch(`${APIurl}dish-review`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            },
            body: JSON.stringify(dishReview)
        }
    )
}



export const getRestaurantReviews = async () => {
    const response = await fetch(`${APIurl}restaurant-review`,
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            }
        })
    const reviews = await response.json()
    return reviews
}