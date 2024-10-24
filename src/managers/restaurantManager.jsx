const APIurl = 'http://localhost:8000/'

export const getRestaurants = async () => {
    const response = await fetch(`${APIurl}restaurants`,
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            }
        })
    const restaurants = await response.json()
    return restaurants
}

export const saveRestaurant = async (restaurant) => {
    await fetch(`${APIurl}restaurants`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            },
            body: JSON.stringify(restaurant)
        }
    )
}