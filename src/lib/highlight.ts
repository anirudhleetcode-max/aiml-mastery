/**
 * A small, dependency-free syntax highlighter.
 *
 * A full grammar engine (Shiki, Prism) would add hundreds of kilobytes for
 * what these lessons need: keywords, strings, numbers, comments and call
 * names, in five languages. This runs on the server and emits spans.
 *
 * Input is curriculum source, but it is HTML-escaped first regardless, so a
 * code example can never inject markup.
 */

export type HighlightLanguage = 'python' | 'sql' | 'bash' | 'json' | 'yaml' | 'text';

const KEYWORDS: Record<Exclude<HighlightLanguage, 'text'>, string[]> = {
  python: [
    'False','None','True','and','as','assert','async','await','break','class','continue','def','del','elif',
    'else','except','finally','for','from','global','if','import','in','is','lambda','nonlocal','not','or',
    'pass','raise','return','try','while','with','yield','self','match','case',
  ],
  sql: [
    'SELECT','FROM','WHERE','GROUP','BY','HAVING','ORDER','LIMIT','OFFSET','JOIN','INNER','LEFT','RIGHT','FULL',
    'OUTER','CROSS','ON','AS','AND','OR','NOT','NULL','IS','IN','BETWEEN','LIKE','DISTINCT','COUNT','SUM','AVG',
    'MIN','MAX','INSERT','INTO','VALUES','UPDATE','SET','DELETE','CREATE','TABLE','INDEX','PRIMARY','KEY','FOREIGN',
    'REFERENCES','WITH','UNION','ALL','CASE','WHEN','THEN','ELSE','END','OVER','PARTITION','ROW_NUMBER','RANK',
    'DENSE_RANK','LAG','LEAD','ASC','DESC','EXISTS','COALESCE','CAST','BEGIN','COMMIT','ROLLBACK','DROP','ALTER',
  ],
  bash: ['if','then','else','fi','for','in','do','done','while','function','export','source','cd','echo','return','local'],
  json: ['true','false','null'],
  yaml: ['true','false','null','on','off','yes','no'],
};

const COMMENT_START: Record<string, RegExp> = {
  python: /#/,
  bash: /#/,
  yaml: /#/,
  sql: /--/,
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const C = {
  comment: 'text-subtle italic',
  string: 'text-[hsl(var(--c-success))]',
  number: 'text-[hsl(var(--c-warning))]',
  keyword: 'text-[hsl(var(--c-accent-2))]',
  fn: 'text-[hsl(var(--c-info))]',
  decorator: 'text-[hsl(var(--c-xp))]',
};

/** Returns HTML-escaped, span-wrapped source. */
export function highlight(code: string, language: HighlightLanguage): string {
  if (language === 'text') return escapeHtml(code);

  const keywords = new Set(KEYWORDS[language].map((k) => (language === 'sql' ? k.toUpperCase() : k)));
  const commentRe = COMMENT_START[language];

  return code
    .split('\n')
    .map((line) => highlightLine(line, keywords, commentRe, language))
    .join('\n');
}

function highlightLine(
  line: string,
  keywords: Set<string>,
  commentRe: RegExp | undefined,
  language: HighlightLanguage,
): string {
  let out = '';
  let i = 0;

  while (i < line.length) {
    const rest = line.slice(i);

    // Comments run to end of line.
    if (commentRe && rest.match(new RegExp(`^${commentRe.source}`))) {
      out += `<span class="${C.comment}">${escapeHtml(rest)}</span>`;
      break;
    }

    // Strings, including Python triple quotes and f-strings.
    const stringMatch = rest.match(/^([rfbu]{0,2})("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*')/);
    if (stringMatch) {
      out += `<span class="${C.string}">${escapeHtml(stringMatch[0])}</span>`;
      i += stringMatch[0].length;
      continue;
    }

    // Python decorators.
    if (language === 'python' && /^@\w/.test(rest)) {
      const m = rest.match(/^@[\w.]+/)!;
      out += `<span class="${C.decorator}">${escapeHtml(m[0])}</span>`;
      i += m[0].length;
      continue;
    }

    // Numbers.
    const numberMatch = rest.match(/^\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/);
    if (numberMatch) {
      // Escaped like every other branch. The regex above cannot match an
      // HTML-special character today, but "safe because of a regex three
      // lines up" is an invariant that quietly breaks when the regex changes.
      out += `<span class="${C.number}">${escapeHtml(numberMatch[0])}</span>`;
      i += numberMatch[0].length;
      continue;
    }

    // Identifiers: keyword, function call, or plain.
    const wordMatch = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/);
    if (wordMatch) {
      const word = wordMatch[0];
      const lookup = language === 'sql' ? word.toUpperCase() : word;
      const isCall = /^\s*\(/.test(rest.slice(word.length));
      if (keywords.has(lookup)) out += `<span class="${C.keyword}">${escapeHtml(word)}</span>`;
      else if (isCall) out += `<span class="${C.fn}">${escapeHtml(word)}</span>`;
      else out += escapeHtml(word);
      i += word.length;
      continue;
    }

    out += escapeHtml(line[i]!);
    i += 1;
  }

  return out;
}
