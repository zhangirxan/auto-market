export default function Header({ routeName }) {
  const links = [
    { href: '#/', label: 'Catalog', active: routeName === 'catalog' || routeName === 'car' },
    { href: '#/sell', label: 'Sell your car', active: routeName === 'sell' },
  ]

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#/" className="logo">
          <img src="./favicon.svg" alt="" />
          <span className="logo-text">Auto<span>Market</span></span>
        </a>
        <nav>
          {links.map((link) => (
            <a key={link.href} href={link.href} className={link.active ? 'active' : ''}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
