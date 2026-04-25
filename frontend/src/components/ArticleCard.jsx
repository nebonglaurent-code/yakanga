import { Link } from 'react-router-dom'
import './ArticleCard.css'

export default function ArticleCard({ article, variant = 'normal' }) {
  const date = new Date(article.date_publication).toLocaleDateString('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <article className={`card card--${variant}`}>
      <Link to={`/article/${article.slug}`} className="card-image-link">
        <div className="card-image">
          {article.image_url
            ? <img src={article.image_url} alt={article.titre} loading="lazy" />
            : <div className="card-image-placeholder" />
          }
          {article.est_premium && <span className="badge-premium">★ Premium</span>}
        </div>
      </Link>
      <div className="card-body">
        {article.categorie && (
          <Link to={`/categorie/${article.categorie.slug}`} className="badge-categorie">
            {article.categorie.nom}
          </Link>
        )}
        <Link to={`/article/${article.slug}`}>
          <h3 className="card-titre">{article.titre}</h3>
        </Link>
        <p className="card-chapeau">{article.chapeau}</p>
        <div className="card-meta">
          <span>{article.auteur_nom}</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  )
}