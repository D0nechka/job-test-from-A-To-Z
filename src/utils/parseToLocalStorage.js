export const parseToLocalStorage = (item) => {
    return JSON.stringify(JSON.parse(JSON.stringify(item)))
}