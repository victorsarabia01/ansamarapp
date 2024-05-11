export function cedulaValidator(cedula) {
    
    if (!cedula) return "Por favor rellene este campo!"
    if (cedula.length < 8) return 'La cedula debe contener al menos 8 caracteres.'
    
    return ''
  }