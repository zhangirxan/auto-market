import { useEffect } from 'react'

export default function Toast({ message, onClose }) {
  // auto-hide after 4 s; cleanup clears the timer if the toast closes earlier
  useEffect(() => {
    const timer = setTimeout(onClose, 4000)
    return () => clearTimeout(timer)
  }, [message, onClose])

  return (
    <div className="toast" role="status">
      <span>{message}</span>
      <button type="button" onClick={onClose} aria-label="Close">×</button>
    </div>
  )
}
