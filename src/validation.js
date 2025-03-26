export const isEmpty = (value) => {
    return value.trim().length === 0
}

export const isNotBetween = (value, minLength, maxLength) => {
    return value.trim().length < minLength || value.trim().length > maxLength
}