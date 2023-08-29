import { IInputArg, IValidatorArg } from "./interfaces";

export function inputValidate(
  input: IInputArg,
  validators: IValidatorArg,
  confirmValue?: string
) {
  const { name, type, value, label } = input;
  const { minLength, maxLength } = validators;
  const namingTypes = [
    "first_name",
    "last_name",
    "middle_name",
    "name",
    "surname",
  ];

  const nameRegex = !/^[a-zA-Zа-яА-Я]+$/.test(value.trim());
  const emailRegex = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  const phoneRegex =
    !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
      value.trim()
    );
  const passwordRegex =
    !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
      value.trim()
    );

  switch (true) {
    case !value.trim():
      return !value.trim() ? `Поле "${label}" должно быть заполнено` : "";
    case minLength && value.trim().length < minLength:
      return `Поле не должно быть меньше ${minLength} символов`;
    case maxLength && value.trim().length > maxLength:
      return `Поле не должно быть больше ${maxLength} символов`;
    case type === "text" && namingTypes.includes(name):
      return nameRegex ? `Поле ${label} должно содержать только буквы` : "";
    case type === "email":
      return emailRegex ? "Пожалуйста, введите правильный email-адрес" : "";
    case type === "password" || name === "confirm":
      return passwordRegex
        ? "Пароль должен быть не менее 6 символов и содержать цифры, а также спецсимвол (например: !@#)"
        : "";
    case type === "confirm" && confirmValue != null:
      return value.trim() !== confirmValue
        ? "Пароля не совпадает с введенным паролем"
        : "";
    case type === "phone":
      return phoneRegex ? "Пожалуйста, введите правильный номер телефона" : "";
  }
}
