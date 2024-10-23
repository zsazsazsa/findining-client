const APIurl = 'http://localhost:8000/'

export const getDishes = async () => {
    const response = await fetch(`${APIurl}dishes`,
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            }
        })
    const restaurants = await response.json()
    return restaurants
}