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