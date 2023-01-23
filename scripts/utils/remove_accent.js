export function normalize(text) {
  text = text.normalize("NFD").replace(/\p{Diacritic}/gu, "")
  text = text.toLowerCase()
  return text;
}