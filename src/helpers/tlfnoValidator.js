export function tlfnoValidator(tlfno) {
    if (!tlfno) return "Por favor rellene este campo!"
    if (tlfno.length < 7) return 'Numero de telefono invalido'
    return ''
  }
  