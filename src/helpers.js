import validator from 'validator'

export const isNameValid = name => {
  return name.length >= 2
}

export const isEmailValid = email => {
  return validator.isEmail(email)
}

export const isPhoneValid = phone => {
  return validator.isNumeric(phone) && phone.length >= 5
}
