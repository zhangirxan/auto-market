import { useEffect, useState } from 'react'

// Controlled input with its own local state. The parent only gets the value
// after the user stops typing for 400 ms (debounce), so we don't fire a request per key.
export default function SearchBar({ value, onSearch }) {
  const [text, setText] = useState(value)

  useEffect(() => {
    if (text.trim() === value) return
    const timer = setTimeout(() => onSearch(text.trim()), 400)
    // cleanup: a new keystroke cancels the previous timer
    return () => clearTimeout(timer)
  }, [text, value, onSearch])

  function clear() {
    setText('')
    onSearch('')
  }

  return (
    <div className="search">
      <span className="search-icon" aria-hidden="true">⌕</span>
      <input
        type="search"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Search make, model, city, color…"
        aria-label="Search cars"
      />
      {text && (
        <button type="button" className="search-clear" onClick={clear} aria-label="Clear search">
          ×
        </button>
      )}
    </div>
  )
}
