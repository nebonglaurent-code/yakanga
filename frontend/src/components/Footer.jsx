import { Link } from 'react-router-dom'
import './Footer.css'
import Logo from './Logo'
import './Logo.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
                <Logo size="footer" />
            </div>
            <p>Yakanga documente et valorise les cultures contemporaines d'Afrique Centrale et du monde.</p>
          </div>

          <div className="footer-col">
            <h4>Rubriques</h4>
            <ul>
              <li><Link to="/categorie/business">Business</Link></li>
              <li><Link to="/categorie/marches">Marchés</Link></li>
              <li><Link to="/categorie/entreprises">Entreprises</Link></li>
              <li><Link to="/categorie/finance">Finance</Link></li>
              <li><Link to="/categorie/cemac">CEMAC</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>À propos</h4>
            <ul>
              <li><Link to="/">Qui sommes-nous</Link></li>
              <li><Link to="/">Publicité</Link></li>
              <li><Link to="/">Contact</Link></li>
              <li><Link to="/">Mentions légales</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Abonnement</h4>
            <p style={{fontSize: '13px', marginBottom: '12px'}}>
              Accédez à tous nos contenus premium.
            </p>
            <Link to="/abonnements" className="footer-btn">
              Voir les offres
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} Yakanga. Tous droits réservés.</span>
          <span>Douala — Yaoundé — Afrique Centrale</span>
        </div>
      </div>
    </footer>
  )
}