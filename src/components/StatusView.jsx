// Shared UI for the loading / error / empty states.

export function Loader({ text = 'Loading…' }) {
  return (
    <div className="status">
      <span className="spinner" aria-hidden="true" />
      <p>{text}</p>
    </div>
  )
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="status error">
      <p className="status-icon">⚠️</p>
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onRetry && (
        <button type="button" className="btn primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, text, children }) {
  return (
    <div className="status">
      <p className="status-icon">🔍</p>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {children}
    </div>
  )
}
