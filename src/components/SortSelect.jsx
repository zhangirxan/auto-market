const OPTIONS = [
  ['newest', 'Newest listings'],
  ['price-asc', 'Price: low to high'],
  ['price-desc', 'Price: high to low'],
  ['year-desc', 'Year: newest first'],
  ['mileage-asc', 'Mileage: lowest first'],
  ['power-desc', 'Most powerful'],
]

export default function SortSelect({ value, onChange }) {
  return (
    <label className="sort">
      <span>Sort by</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {OPTIONS.map(([key, label]) => (
          <option key={key} value={key}>{label}</option>
        ))}
      </select>
    </label>
  )
}
