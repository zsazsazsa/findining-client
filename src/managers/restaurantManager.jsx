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