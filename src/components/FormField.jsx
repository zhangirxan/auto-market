export default function FormField({ label, error, children, wide = false }) {
  return (
    <label className={`form-field ${wide ? 'wide' : ''} ${error ? 'has-error' : ''}`}>
      <span className="form-label">{label}</span>
      {children}
      {error && <span className="form-error">{error}</span>}
    </label>
  )
}
