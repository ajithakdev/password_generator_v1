export interface CaseResult {
  id: string;
  name: string;
  example: string;
  value: string;
}

/**
 * Splits any string into constituent lowercase words based on standard casing conventions:
 * camelCase, PascalCase, snake_case, kebab-case, dots, slashes, spaces.
 */
export function extractWords(input: string): string[] {
  if (!input || !input.trim()) return [];

  // 1. Separate camelCase/PascalCase boundaries (e.g. "fooBar" -> "foo Bar", "XMLHttpRequest" -> "XML Http Request")
  const separated = input
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2');

  // 2. Split by any non-alphanumeric separator (spaces, underscores, hyphens, dots, slashes)
  const matches = separated.match(/[a-zA-Z0-9]+/g);
  return matches || [];
}

export function toCamelCase(words: string[]): string {
  if (words.length === 0) return '';
  return words
    .map((w, i) => {
      const lower = w.toLowerCase();
      return i === 0 ? lower : lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

export function toPascalCase(words: string[]): string {
  return words
    .map((w) => {
      const lower = w.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join('');
}

export function toSnakeCase(words: string[]): string {
  return words.map((w) => w.toLowerCase()).join('_');
}

export function toConstantCase(words: string[]): string {
  return words.map((w) => w.toUpperCase()).join('_');
}

export function toKebabCase(words: string[]): string {
  return words.map((w) => w.toLowerCase()).join('-');
}

export function toTitleCase(words: string[]): string {
  return words
    .map((w) => {
      const lower = w.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

export function toSentenceCase(words: string[]): string {
  if (words.length === 0) return '';
  const full = words.map((w) => w.toLowerCase()).join(' ');
  return full.charAt(0).toUpperCase() + full.slice(1);
}

export function toDotCase(words: string[]): string {
  return words.map((w) => w.toLowerCase()).join('.');
}

export function toPathCase(words: string[]): string {
  return words.map((w) => w.toLowerCase()).join('/');
}

export function toSlug(input: string): string {
  if (!input) return '';
  return input
    .normalize('NFD') // normalize unicode
    .replace(/[\u0300-\u036f]/g, '') // strip diacritics (é -> e, ñ -> n)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_]/g, '') // remove special chars
    .replace(/[\s_]+/g, '-') // spaces and underscores to hyphens
    .replace(/-+/g, '-') // collapse consecutive hyphens
    .replace(/^-+|-+$/g, ''); // trim leading/trailing hyphens
}

export function detectCasing(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return 'Unknown';

  if (/^[a-z]+(?:[A-Z][a-z0-9]*)+$/.test(trimmed)) return 'camelCase';
  if (/^[A-Z][a-z0-9]+(?:[A-Z][a-z0-9]*)+$/.test(trimmed)) return 'PascalCase';
  if (/^[a-z0-9]+(?:_[a-z0-9]+)+$/.test(trimmed)) return 'snake_case';
  if (/^[A-Z0-9]+(?:_[A-Z0-9]+)+$/.test(trimmed)) return 'CONSTANT_CASE';
  if (/^[a-z0-9]+(?:-[a-z0-9]+)+$/.test(trimmed)) return 'kebab-case';
  if (/^[a-z0-9]+(?:\.[a-z0-9]+)+$/.test(trimmed)) return 'dot.case';
  if (/^[a-z0-9]+(?:\/[a-z0-9]+)+$/.test(trimmed)) return 'path/case';

  return 'Natural text';
}

export function convertAllCases(input: string): CaseResult[] {
  const words = extractWords(input);

  return [
    { id: 'camel', name: 'camelCase', example: 'myVariableName', value: toCamelCase(words) },
    { id: 'pascal', name: 'PascalCase', example: 'MyVariableName', value: toPascalCase(words) },
    { id: 'snake', name: 'snake_case', example: 'my_variable_name', value: toSnakeCase(words) },
    { id: 'constant', name: 'CONSTANT_CASE', example: 'MY_VARIABLE_NAME', value: toConstantCase(words) },
    { id: 'kebab', name: 'kebab-case', example: 'my-variable-name', value: toKebabCase(words) },
    { id: 'slug', name: 'URL Slug', example: 'my-article-title-2026', value: toSlug(input) },
    { id: 'title', name: 'Title Case', example: 'My Variable Name', value: toTitleCase(words) },
    { id: 'sentence', name: 'Sentence case', example: 'My variable name', value: toSentenceCase(words) },
    { id: 'dot', name: 'dot.case', example: 'my.variable.name', value: toDotCase(words) },
    { id: 'path', name: 'path/case', example: 'my/variable/name', value: toPathCase(words) },
    { id: 'lower', name: 'lowercase', example: 'my variable name', value: input.toLowerCase() },
    { id: 'upper', name: 'UPPERCASE', example: 'MY VARIABLE NAME', value: input.toUpperCase() },
  ];
}
