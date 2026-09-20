import { ALL_UNITS } from '@/data/curriculum';
import { DOMAIN_BY_ID, DOMAINS } from '@/data/domains';
import type { DomainId } from '@/types/curriculum';

interface E { key:string; term:string; definition:string; simple?:string; letter:string; domains:DomainId[]; units:{id:string;title:string;slug:string;domain:DomainId}[] }
const byTerm = new Map<string, E>();
for (const unit of ALL_UNITS) {
  for (const t of unit.terminology) {
    const term = t.term.trim();
    if (!term) continue;
    const key = term.toLowerCase();
    let e = byTerm.get(key);
    if (!e) {
      const first = term[0]!.toUpperCase();
      e = { key, term, definition: t.definition, simple: t.simple, letter: /[A-Z]/.test(first) ? first : '#', domains: [], units: [] };
      byTerm.set(key, e);
    }
    if (!e.simple && t.simple) e.simple = t.simple;
    if (!e.domains.includes(unit.domain)) e.domains.push(unit.domain);
    if (!e.units.some(u => u.id === unit.id)) e.units.push({ id: unit.id, title: unit.title, slug: unit.slug, domain: unit.domain });
  }
}
const entries = [...byTerm.values()];
for (const e of entries) { e.domains.sort((a,b)=>DOMAIN_BY_ID[a].order-DOMAIN_BY_ID[b].order); e.units.sort((a,b)=>a.id.localeCompare(b.id)); }
entries.sort((a,b)=>a.key.localeCompare(b.key,'en'));
console.log('UNITS', ALL_UNITS.length);
console.log('GLOSSARY terms', entries.length, 'payload bytes', JSON.stringify(entries).length);
console.log('letters', [...new Set(entries.map(e=>e.letter))].join(''));
console.log('domains present', DOMAINS.filter(d=>entries.some(e=>e.domains.includes(d.id))).length, 'of', DOMAINS.length);
console.log('first/last', entries[0]?.term, '/', entries[entries.length-1]?.term);
const byF = new Map<string, {cat:string; units:number; vars:number}>();
for (const u of ALL_UNITS) for (const f of u.math?.formulas ?? []) {
  const k = f.latex + '|' + f.name;
  const e = byF.get(k) ?? { cat: f.category ?? 'other', units: 0, vars: f.variables.length };
  e.units++; byF.set(k, e);
}
const cats = new Map<string, number>();
for (const e of byF.values()) cats.set(e.cat, (cats.get(e.cat) ?? 0) + 1);
console.log('FORMULAS unique', byF.size, 'occurrences', [...byF.values()].reduce((a,b)=>a+b.units,0));
console.log('vars', [...byF.values()].reduce((a,b)=>a+b.vars,0));
console.log('categories', JSON.stringify([...cats.entries()].sort((a,b)=>b[1]-a[1])));
