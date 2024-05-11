export function emailValidator(email) {
  const re = /\S+@\S+\.\S+/
  if (!email) return "Por favor rellene este campo!"
  if (!re.test(email)) return 'Por favor ingrese un email valido!'
  return ''
}