import { BODIES, FUELS, MAKES } from '../api/seed.js'

const PRICES = [10000, 20000, 30000, 50000, 80000]
const YEARS = [2024, 2022, 2020, 2018, 2015, 2012]

function Select({ label, value, onChange, children }) {
  return (
    <label className="field-inline">
      <span>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {children}
      </select>
    </label>
  )
}

export default function FilterPanel({ query, onChange, onReset }) {
  const set = (key) => (value) => onChange({ [key]: value })
  const hasFilters = query.make || query.fuel || query.body || query.maxPrice || query.yearFrom || query.search

  return (
    <div className="filters">
      <Select label="Make" value={query.make} onChange={set('make')}>
        <option value="">All makes</option>
        {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
      </Select>

      <Select label="Body" value={query.body} onChange={set('body')}>
        <option value="">Any body</option>
        {BODIES.map((b) => <option key={b} value={b}>{b}</option>)}
      </Select>

      <Select label="Fuel" value={query.fuel} onChange={set('fuel')}>
        <option value="">Any fuel</option>
        {FUELS.map((f) => <option key={f} value={f}>{f}</option>)}
      </Select>

      <Select label="Max price" value={query.maxPrice} onChange={set('maxPrice')}>
        <option value="">No limit</option>
        {PRICES.map((p) => <option key={p} value={p}>up to ${p / 1000}k</option>)}
      </Select>

      <Select label="Year from" value={query.yearFrom} onChange={set('yearFrom')}>
        <option value="">Any year</option>
        {YEARS.map((y) => <option key={y} value={y}>{y}+</option>)}
      </Select>

      {hasFilters && (
        <button type="button" className="btn ghost" onClick={onReset}>
          Reset filters
        </button>
      )}
    </div>
  )
}
