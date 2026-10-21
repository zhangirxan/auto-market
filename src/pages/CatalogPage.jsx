import { useCallback, useEffect, useState } from 'react'
import { getCars } from '../api/carsApi.js'
import SearchBar from '../components/SearchBar.jsx'
import FilterPanel from '../components/FilterPanel.jsx'
import SortSelect from '../components/SortSelect.jsx'
import CarCard from '../components/CarCard.jsx'
import Pagination from '../components/Pagination.jsx'
import { EmptyState, ErrorState, Loader } from '../components/StatusView.jsx'

export default function CatalogPage({ query, onQueryChange, onReset, resetVersion }) {
  const [result, setResult] = useState(null)
  const [status, setStatus] = useState('loading')
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setStatus('loading')
    setError('')

    getCars(query, { signal: controller.signal })
      .then((data) => {
        setResult(data)
        setStatus('success')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setError(err.message)
        setStatus('error')
      })

    return () => controller.abort()
  }, [query, reloadKey])

  const handleSearch = useCallback((search) => onQueryChange({ search }), [onQueryChange])

  function handlePageChange(page) {
    onQueryChange({ page })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const loading = status === 'loading'

  let content
  if (status === 'error') {
    content = <ErrorState message={error} onRetry={() => setReloadKey((k) => k + 1)} />
  } else if (!result) {
    content = <Loader text="Loading listings…" />
  } else if (result.total === 0) {
    content = (
      <EmptyState title="No cars found" text="Try another search or remove some filters.">
        <button type="button" className="btn primary" onClick={onReset}>Reset filters</button>
      </EmptyState>
    )
  } else {
    content = (
      <>
        <div className={`grid ${loading ? 'is-loading' : ''}`} aria-busy={loading}>
          {result.items.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <Pagination
          page={result.page}
          totalPages={result.totalPages}
          onPageChange={handlePageChange}
          disabled={loading}
        />
      </>
    )
  }

  const from = result ? (result.page - 1) * result.pageSize + 1 : 0
  const to = result ? from + result.items.length - 1 : 0

  return (
    <div className="catalog">
      <section className="hero">
        <h1>Find your next car</h1>
        <p>Used and new cars from private sellers across Kazakhstan.</p>
        <SearchBar key={resetVersion} value={query.search} onSearch={handleSearch} />
      </section>

      <FilterPanel query={query} onChange={onQueryChange} onReset={onReset} />

      <div className="results-bar">
        <p className="muted">
          {result && result.total > 0 && status !== 'error'
            ? `Showing ${from}–${to} of ${result.total} cars`
            : ' '}
          {loading && result && <span className="inline-spinner" aria-label="Updating" />}
        </p>
        <SortSelect value={query.sort} onChange={(sort) => onQueryChange({ sort })} />
      </div>

      {content}
    </div>
  )
}
