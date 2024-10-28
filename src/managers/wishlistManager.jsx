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

export const saveWish = async (wish) => {
    await fetch(`${APIurl}wishlist`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            },
            body: JSON.stringify(wish)
        }
    )
}