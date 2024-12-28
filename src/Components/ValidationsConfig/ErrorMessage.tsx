type ErrorType = {
    [key: string]: string
}

export const ErrorMessages: ErrorType = {
    EmailEmpty: "Please enter your email address.",
    EmailError: 'Please enter valid email address.',
    PasswordEmpty: "Please enter your password.",
    PasswordError: "Password should be 8 to 16 characters long and include uppercase and lowercase letters, numbers, and special characters.",
    CodeEmpty: "Please enter code.",
    CodeError: "Invalid OTP. Try again!",
    ChangepasswordEmpty: 'Please enter your password.',
    ChangepasswordError: 'Please enter valid password.',
    ChangePasswordbelow8: 'Password content at least 8 characters.',
    ConfirmPasswordEmpty: 'Please enter your password.',
    ConfirmPasswordMatch: `Password should be match.`,
    FullnameError: 'Please enter your name using alphabetic characters only, with a minimum length of 2 and a maximum length of 256 characters.',
    FullnameEmpty: 'Please enter your name.',
    CodeLengthError: 'Invalid OTP.',
    PhoneNumberError: 'Please enter valid mobile number.',
    PhoneNoEmpty: 'Please enter mobile number.',
    CityLengthInvalid: "City name should be in range[3,50].",
    WhereFromError: "Please select your start location.",
    WhereToError: "Please select your end location.",
    TripDatesError: "Please select trip dates.",
    WrongPassword: "Please enter a valid password.",
    TravelError: "Please select travelers.",
    LastNameEmpty: "Please enter the last name.",
    LastNameError: "Please enter valid last name, e.g., Johnson, Johnson Lee",
    FirstNameEmpty: "Please enter the first name.",
    ValidFirstName: "Please enter valid first name, e.g., John.",
    SpaceNot: "No space allowed in first name",
    EmptyMessage: 'Please enter the message.',
    MessgaeLength: 'Message should be greater than 5 character.'


}