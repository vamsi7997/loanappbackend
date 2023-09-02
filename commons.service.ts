export const createUserId = (username: string) => {
    let template = `${Math.random() * 1000}`
    return username + template

}

