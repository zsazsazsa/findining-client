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