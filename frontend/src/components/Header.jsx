import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import Logo from './Logo'
import './Logo.css'

const CATEGORIES = [
  { nom: 'Business', slug: 'business' },
  { nom: 'Marchés', slug: 'marches' },
  { nom: 'Entreprises', slug: 'entreprises' },
  { nom: 'Finance', slug: 'finance' },
  { nom: 'CEMAC', slug: 'cemac' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const today = new Date().toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <header className="header">
      {/* Barre supérieure */}
      <div className="header-top">
        <div className="container header-top-inner">
          <span className="header-date">{today}</span>
          <div className="header-top-links">
            <span>Douala</span>
            <span>|</span>
            <span>Yaoundé</span>
            <span>|</span>
            <span>CEMAC</span>
          </div>
        </div>
      </div>

      {/* Logo + CTA */}
      <div className="header-brand">
        <div className="container header-brand-inner">
          <Link to="/" className="logo">
            <Logo size="normal" />
          </Link>
          {/* <div className="header-tagline">
            Premier média économique d'Afrique Centrale
          </div> */}
          <Link to="/abonnements" className="btn-abonnement">
            S'abonner
          </Link>
        </div>
      </div>

      {/* Navigation */}
      <nav className="header-nav">
        <div className="container header-nav-inner">
          <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
          <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Accueil</Link></li>
            {CATEGORIES.map(cat => (
              <li key={cat.slug}>
                <Link to={`/categorie/${cat.slug}`} onClick={() => setMenuOpen(false)}>
                  {cat.nom}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}