// import { Link } from 'react-router-dom'
import './Abonnements.css'

const OFFRES = [
  {
    id: 1,
    nom: 'Découverte',
    prix: 'Gratuit',
    periode: '',
    description: 'Accès aux articles grand public',
    features: [
      '5 articles par mois',
      'Newsletter hebdomadaire',
      'Accès aux archives (30 jours)',
    ],
    cta: 'Commencer',
    highlight: false,
  },
  {
    id: 2,
    nom: 'Standard',
    prix: '2 500',
    periode: 'FCFA / mois',
    description: 'Pour les lecteurs réguliers',
    features: [
      'Articles illimités',
      'Newsletter quotidienne',
      'Accès aux archives complètes',
      'Version PDF du journal',
    ],
    cta: "S'abonner",
    highlight: false,
  },
  {
    id: 3,
    nom: 'Premium',
    prix: '5 000',
    periode: 'FCFA / mois',
    description: 'Pour les professionnels',
    features: [
      'Tout du plan Standard',
      'Analyses et rapports exclusifs',
      'Accès anticipé aux enquêtes',
      'Alertes marchés en temps réel',
      'Support prioritaire',
    ],
    cta: "S'abonner",
    highlight: true,
  },
  {
    id: 4,
    nom: 'Entreprise',
    prix: 'Sur devis',
    periode: '',
    description: 'Pour les équipes et organisations',
    features: [
      'Licences multi-utilisateurs',
      'Contenu personnalisé',
      'Accès API données',
      'Account manager dédié',
    ],
    cta: 'Nous contacter',
    highlight: false,
  },
]

export default function Abonnements() {
  return (
    <div className="abonnements-page">

      {/* HERO */}
      <div className="abonnements-hero">
        <div className="container">
          <p className="abonnements-surtitre">Abonnements</p>
          <h1 className="abonnements-titre">
            L'information qui compte,<br />au prix qui convient.
          </h1>
          <p className="abonnements-sous-titre">
            Rejoignez des milliers de lecteurs qui font confiance à Yakanga pour suivre l'actualité culturelle et économique d'Afrique Centrale.
          </p>
        </div>
      </div>

      {/* OFFRES */}
      <div className="container abonnements-grid-wrapper">
        <div className="abonnements-grid">
          {OFFRES.map(offre => (
            <div key={offre.id} className={`offre-card ${offre.highlight ? 'offre-card--highlight' : ''}`}>
              {offre.highlight && <div className="offre-badge-top">⭐ Recommandé</div>}
              <div className="offre-header">
                <h3 className="offre-nom">{offre.nom}</h3>
                <div className="offre-prix">
                  <span className="offre-montant">{offre.prix}</span>
                  {offre.periode && <span className="offre-periode"> {offre.periode}</span>}
                </div>
                <p className="offre-description">{offre.description}</p>
              </div>
              <ul className="offre-features">
                {offre.features.map((f, i) => (
                  <li key={i}>
                    <span className="offre-check">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`offre-cta ${offre.highlight ? 'offre-cta--highlight' : ''}`}>
                {offre.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* GARANTIE */}
      <div className="container abonnements-garantie">
        <div className="garantie-grid">
          <div className="garantie-item">
            <span className="garantie-icon">🔒</span>
            <h4>Paiement sécurisé</h4>
            <p>Mobile Money, carte bancaire. Vos données sont protégées.</p>
          </div>
          <div className="garantie-item">
            <span className="garantie-icon">↩️</span>
            <h4>Résiliation libre</h4>
            <p>Annulez à tout moment, sans engagement ni frais cachés.</p>
          </div>
          <div className="garantie-item">
            <span className="garantie-icon">📰</span>
            <h4>Contenu de qualité</h4>
            <p>Des journalistes spécialisés, une ligne éditoriale exigeante.</p>
          </div>
        </div>
      </div>

    </div>
  )
}