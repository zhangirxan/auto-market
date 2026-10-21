function pageNumbers(page, total) {
  const pages = new Set([1, total, page - 1, page, page + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)
  const result = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push(`gap-${p}`)
    result.push(p)
  })
  return result
}

export default function Pagination({ page, totalPages, onPageChange, disabled }) {
  if (totalPages <= 1) return null

  return (
    <nav className="pagination" aria-label="Pages">
      <button type="button" disabled={disabled || page === 1} onClick={() => onPageChange(page - 1)}>
        ‹ Prev
      </button>
      {pageNumbers(page, totalPages).map((p) =>
        typeof p === 'string' ? (
          <span key={p} className="gap">…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={p === page ? 'current' : ''}
            disabled={disabled}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        )
      )}
      <button type="button" disabled={disabled || page === totalPages} onClick={() => onPageChange(page + 1)}>
        Next ›
      </button>
    </nav>
  )
}
