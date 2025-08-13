export const MIN_LENGTHS ={
    MIN_LENGTH_USER: 3,
    MIN_LENGTH_PASSWORD: 6
}


export const ERR_MESSAGES = {
    userTypeOfString: "Username must be a string",
    userLengthMin: (min) => `Username must be at least ${MIN_USER} characters`,
    passwordTypeOfString: "Password must be a string",
    passwordLengthMin: (min) => `Password must be at least ${MIN_USER} characters`,
}