const APIurl = 'http://localhost:8000/'

export const getWishlist = async () => {
    const response = await fetch(`${APIurl}wishlist`,
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            }
        })
    const wishlist = await response.json()
    return wishlist
}