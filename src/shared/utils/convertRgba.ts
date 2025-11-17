export const hexToRgba = (hex: string, alpha?: number) => {
  // Remove the '#' if present
  let cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;

  // Handle 3-digit hex
  if (cleanHex.length === 3) {
    cleanHex =
      cleanHex[0] +
      cleanHex[0] +
      cleanHex[1] +
      cleanHex[1] +
      cleanHex[2] +
      cleanHex[2];
  }

  // Parse RGB components
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  let a = alpha || '1'; // Default alpha to 1 (opaque)

  // Handle 8-digit hex (with alpha)
  if (cleanHex.length === 8) {
    const alphaHex = cleanHex.substring(6, 8);
    a = (parseInt(alphaHex, 16) / 255).toFixed(3);
  }

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};
