const APIurl = 'http://localhost:8000/'

export const getCategories = async () => {
    const response = await fetch(`${APIurl}categories`,
        {
            headers: {
                Authorization: `Token ${JSON.parse(localStorage.getItem("diner_token"))}`
            }
        })
    const categories = await response.json()
    return categories
}