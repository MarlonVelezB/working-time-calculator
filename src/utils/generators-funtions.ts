export function generateUniqueString(length: number = 16): string {
    const timestamp = Date.now().toString(36); // Base 36 para un formato compacto
    const randomPart = Array.from({ length }, () =>
      Math.floor(Math.random() * 36).toString(36) // Generar caracteres alfanuméricos aleatorios
    ).join('');
  
    return `${timestamp}-${randomPart}`;
  }
  