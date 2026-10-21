import { useCallback, useEffect, useState } from 'react'
import { navigate, useHashRoute } from './hooks/useHashRoute.js'
import Header from './components/Header.jsx'
import Toast from './components/Toast.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import CarDetailsPage from './pages/CarDetailsPage.jsx'
import SellPage from './pages/SellPage.jsx'
import { EmptyState } from './components/StatusView.jsx'
import { carTitle } from './utils/format.js'

const DEFAULT_QUERY = {
  search: '', make: '', fuel: '', body: '', maxPrice: '', yearFrom: '', sort: 'newest', page: 1,
}

export default function App() {
  const route = useHashRoute()
  const [query, setQuery] = useState(DEFAULT_QUERY)
  const [resetVersion, setResetVersion] = useState(0)
  const [notice, setNotice] = useState(null)

  const updateQuery = useCallback((patch) => {
    setQuery((prev) => ({ ...prev, page: 1, ...patch }))
  }, [])

  const resetFilters = useCallback(() => {
    setQuery(DEFAULT_QUERY)
    setResetVersion((v) => v + 1)
  }, [])

  const closeNotice = useCallback(() => setNotice(null), [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route.name, route.id])

  function handleCreated(car) {
    setNotice({ id: Date.now(), text: `${carTitle(car)} is published` })
    navigate(`/cars/${car.id}`)
  }

  function handleDeleted(car) {
    setNotice({ id: Date.now(), text: `${carTitle(car)} was removed` })
    navigate('/')
  }

  let page
  if (route.name === 'catalog') {
    page = (
      <CatalogPage
        query={query}
        onQueryChange={updateQuery}
        onReset={resetFilters}
        resetVersion={resetVersion}
      />
    )
  } else if (route.name === 'car') {
    page = <CarDetailsPage key={route.id} id={route.id} onDeleted={handleDeleted} />
  } else if (route.name === 'sell') {
    page = <SellPage onCreated={handleCreated} />
  } else {
    page = (
      <EmptyState title="Page not found" text="This page doesn't exist.">
        <a className="btn primary" href="#/">Go to catalog</a>
      </EmptyState>
    )
  }

  return (
    <>
      <Header routeName={route.name} />
      <main className="container">{page}</main>
      <footer className="footer">AutoMarket · React midterm project · data is stored in your browser</footer>
      {notice && <Toast key={notice.id} message={notice.text} onClose={closeNotice} />}
    </>
  )
}
