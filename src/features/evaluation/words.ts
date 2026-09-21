/**
 * The one stemmer.
 *
 * Both the document-frequency pass over the curriculum and the per-answer
 * grading reduce words this way, and they have to agree exactly: if "compiled"
 * stems to one thing here and another there, a word can be common in the
 * corpus and rare in an answer at the same time, and the rarity filter silently
 * stops working. That is precisely the bug this module exists to make
 * impossible, so there is deliberately no second copy.
 *
 * It is not a linguistically serious stemmer and does not try to be. It folds
 * plurals, participles and the silent terminal "e" — enough that "embeddings",
 * "embedded" and "embedding" meet, which is the whole requirement.
 */
export function stem(word: string): string {
  let w = word.toLowerCase().replace(/^[^a-z0-9_]+|[^a-z0-9_]+$/g, '');
  if (w.length <= 3) return w;
  if (w.endsWith('ies') && w.length > 4) w = `${w.slice(0, -3)}y`;
  else if (w.endsWith('sses') || w.endsWith('shes') || w.endsWith('ches')) w = w.slice(0, -2);
  else if (w.endsWith('s') && !w.endsWith('ss') && !w.endsWith('us')) w = w.slice(0, -1);

  if (w.endsWith('ing') && w.length > 5) w = w.slice(0, -3);
  else if (w.endsWith('ed') && w.length > 4) w = w.slice(0, -2);

  // "compiles" → "compile" and "compiled" → "compil" would otherwise be two
  // different words. Dropping the terminal "e" makes them one.
  if (w.endsWith('e') && w.length > 4) w = w.slice(0, -1);
  return w;
}

/** Stems every word in a span of text, dropping anything too short to matter. */
export function stemAll(text: string): string[] {
  return text
    .split(/[^A-Za-z0-9_'-]+/)
    .map(stem)
    .filter((w) => w.length > 1);
}
