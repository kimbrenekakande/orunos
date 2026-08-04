/**
 * Normalizes a raw document-type string into a list of candidate keys used to
 * look up the matching doc type in the database.
 *
 * It trims + lowercases the input and generates variants for common separators
 * (`-`, whitespace) and strips a trailing "s" (singular/plural handling).
 * Duplicates are removed while the original order is preserved.
 */
export function buildDoctypeCandidates(rawType: string): string[] {
  const normalized = rawType.trim().toLowerCase();
  return Array.from(
    new Set([
      normalized,
      normalized.replace(/-/g, "_"),
      normalized.replace(/\s+/g, "_"),
      normalized.replace(/s$/, ""),
    ])
  );
}
