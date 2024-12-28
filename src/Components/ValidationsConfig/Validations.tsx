import { ErrorMessages } from './ErrorMessage';

// Regex Constants
export const EMAILREGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w+)+$/;
export const PASSWORDREGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const DIGITREGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{8,}$/;
export const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]*$/;
export const FULLNAME_REGEX = /^([a-zA-Z]+\s?){1,2}[a-zA-Z]+$/;
export const FIRSTNAME_REGEX = /^[A-Z][a-zA-Z]*$/;
export const LASTREGEX_REGEX = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*){0,2}$/;

export let DECIMAL_REGEX = /^\d*\.?\d*$/;
export let NUMBER_REGEX = /^\d*$/;
export let ALPHABET_SPACE_REGEX = /^[a-zA-Z ]*$/;
export let WEBSITE_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
export let USERNAME_REGEX = /^[a-z0-9_]*$/;
export let USER_REGEX = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
export let alphabetic = /[a-zA-Z]/g;
export let PhoneRegex = /^([0-9]){7,13}$/;

// Phone number regex for India (10 digits)
const indiaPhoneNumberRegex = /^(\+91-|\+91|0)?[6789]\d{9}$/;

// Phone number regex for International (Assuming any country code and 10 digits)
const internationalPhoneNumberRegex = /^\+\d{1,4}\d{10}$/;

// All Validations

/***** EMAIL VALIDATION ****/
export const ValidateEmail = (email: string, t: (key: string) => string) => {
  if (email !== '') {
    if (EMAILREGEX.test(email)) {
      return '';
    } else {
      return t('EmailError');
    }
  } else {
    return t('EmailEmpty');
  }
};

/***** PASSWORD VALIDATION ****/
export const ValidatePassword = (password: string, t: (key: string) => string) => {
  if (password !== '') {
    if (PASSWORDREGEX.test(password)) {
      return '';
    } else {
      return t('PasswordError');
    }
  } else {
    return t('PasswordEmpty');
  }
};

export const ValidatePasswordLogin = (password: string, t: (key: string) => string) => {
  if (password !== '') {
    if (PASSWORDREGEX.test(password)) {
      return '';
    } else {
      return t('WrongPassword');
    }
  } else {
    return t('PasswordEmpty');
  }
};

/***** Validation ChangePassword ****/
export const ValidateChangePassword = (changepassword: string, t: (key: string) => string) => {
  if (changepassword !== '') {
    if (changepassword.length < 8) {
      return t('ChangePasswordbelow8');
    } else {
      if (PASSWORDREGEX.test(changepassword)) {
        return '';
      } else {
        return t('PasswordError');
      }
    }
  } else {
    return t('ChangepasswordEmpty');
  }
};

/***** Validation ConfirmPassword ****/
export const ValidateConfirmPassword = (confirmPassword: string, password: string, t: (key: string) => string) => {
  if (confirmPassword !== '') {
    if (confirmPassword === password) {
      return '';
    } else {
      return t(ErrorMessages.ConfirmPasswordMatch);
    }
  } else {
    return t('ConfirmPasswordEmpty');
  }
};

/***** Validation Fullname ****/
export const ValidateFirstname = (fname: string, t: (key: string) => string) => {
  
  if (fname !== '') {
    if (FIRSTNAME_REGEX.test(fname)) {
      return '';
    } else {
      return t('ValidFirstName');
    }
  } else {
    return t('FirstNameEmpty');
  }
};

/***** Validation Lastname ****/
export const ValidateLastname = (lname: string, t: (key: string) => string) => {
  if (lname !== '') {
    if (LASTREGEX_REGEX.test(lname)) {
      return '';
    } else {
      return t('LastNameError');
    }
  } else {
    return t('LastNameEmpty');
  }
};

export const OTPVerification = (Code: number, t: (key: string) => string) => {
  const codeStr = Code.toString();
  if (codeStr !== '') {
    if (codeStr.length !== 6) {
      return t('CodeLengthError');
    } else {
      return '';
    }
  } else {
    return t('CodeEmpty');
  }
};

export const ValidateMobileNo = (code: string, MobileNumber: string, t: (key: string) => string) => {
  if (MobileNumber !== "") {
    if (code === "+91") {
      if (indiaPhoneNumberRegex.test(MobileNumber)) {
        return "";
      } else {
        return t('PhoneNumberError');
      }
    } else {
      if (internationalPhoneNumberRegex.test(MobileNumber)) {
        return "";
      } else {
        return t('PhoneNumberError');
      }
    }
  } else {
    return t('PhoneNoEmpty');
  }
};

export const ValidateMobileNumber = (phone: string, t: (key: string) => string) => {
  const numericPhone = phone.replace(/[^0-9]/g, ''); // Remove non-numeric characters
  const phoneLength = numericPhone.length;

  if (phoneLength < 8 || phoneLength > 16) {
    return t('Phone number must be between 8 and 16 digits.');
  }

  return ""; // No error
};

export const ValidateFullname = (name: string, t: (key: string) => string) => {
  const trimmedName = name.trim(); // Remove leading and trailing spaces

  if (!trimmedName) {
    return t("Name is required.");
  }

  // Check if the name contains numbers or special characters
  if (/[^a-zA-Z ]/.test(trimmedName)) {
    return t("Name should only contain letters and spaces.");
  }

  return ""; // No error
};

export const ValidateCityField = (city: string, t: (key: string) => string) => {
  if (city !== undefined && city.length >= 3 && city.length <= 50) {
    return '';
  } else {
    return t('CityLengthInvalid');
  }
};

export const ValidateAddCategory = (Category: string, t: (key: string) => string) => {
  if (Category !== '' && Category !== null && Category !== undefined) {
    return '';
  } else {
    return t('Please Add Your Category');
  }
};

export const ValidationMessageBox = (message: string, t: (key: string) => string) => {
  if (message === '' || message === null || message === undefined) {
    return t('EmptyMessage');
  } else if (message.length < 5) {
    return t('MessageLength');
  } else {
    return '';
  }
};
