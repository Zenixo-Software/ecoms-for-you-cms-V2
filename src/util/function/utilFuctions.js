export const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split(".")[1]))
    } catch (e) {
        return null
    }
}

export const jsonToFormData = (obj) => {
    const formData = new FormData()
    Object.keys(obj).map(async (e) => {
        await formData.append(e.toString(), obj[e])
    })
    return formData
}

