/** Normalize the text in 3 steps 
 * 1. Normalizes the text using the "NFD" (Normalization Form Canonical Decomposition) method, 
 * which decomposes each character into its base character and any diacritical marks (such as accents).
 * 2. Replaces any remaining diacritical marks using a regular expression that matches the unicode property 'Diacritic', with an empty string.
 * 3. Converts the text to lowercase.
 * Exemple : GLaçon => glacon, Noël => noel, à la fraise => a la fraise
 * @param {string} text 
 * @returns text
 */
export function normalize(text) {
  text = text.normalize("NFD").replace(/\p{Diacritic}/gu, "")
  text = text.toLowerCase()
  return text;
}