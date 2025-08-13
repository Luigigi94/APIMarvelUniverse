export const MIN_LENGTHS ={
    MIN_LENGTH_USER: 3,
    MIN_LENGTH_PASSWORD: 6
}


export const ERR_MESSAGES = {
    userTypeOfString: "Username must be a string",
    userLengthMin: (min) => `Username must be at least ${MIN_USER} characters`,
    passwordTypeOfString: "Password must be a string",
    passwordLengthMin: (min) => `Password must be at least ${MIN_USER} characters`,
    titleOrIdTypeOfString: "Title or Id is required",
    userNameRequired: "Username is required",
    ratingValidRange: (min, max) => `Rating must be a number between ${MIN_RATING} and ${MAX_RATING}`,
    movieNotFound: "Movie not found",
    duplicateReview: "This movie has already reviewed by you",
    existingMovie: "This movie has already existed",
}

export const RATING_VALUES = {
    MIN_VALUE: 1,
    MAX_VALUE: 5
}