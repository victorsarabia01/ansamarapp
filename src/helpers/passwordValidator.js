export function passwordValidator(password) {
  if (!password) return "Por favor rellene este campo!"
  if (password.length < 8) return 'La contraseña debe contener al menos 8 caracteres.'
  return ''
}
