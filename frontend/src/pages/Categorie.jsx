// export default function Categorie() {
//   return <div>Categorie</div>
// }

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/client'
import ArticleCard from '../components/ArticleCard'
import './Categorie.css'

export default function Categorie() {
  const { slug } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasNext, setHasNext] = useState(false)

  const nom = slug.charAt(0).toUpperCase() + slug.slice(1)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    api.get(`/articles/?categorie=${slug}&page=${page}`)
      .then(res => {
        const results = res.data.results || []
        setArticles(prev => page === 1 ? results : [...prev, ...results])
        setHasNext(!!res.data.next)
      })
      .finally(() => setLoading(false))
  }, [slug, page])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setArticles([])
    setPage(1)
  }, [slug])

  return (
    <div className="categorie-page">
      <div className="categorie-banner">
        <div className="container">
          <nav className="breadcrumb" style={{marginBottom: '8px'}}>
            <Link to="/">Accueil</Link>
            <span>›</span>
            <span>{nom}</span>
          </nav>
          <h1 className="categorie-titre">{nom}</h1>
          <p className="categorie-sous-titre">
            Retrouvez toute l'actualité {nom.toLowerCase()} sur Yakanga
          </p>
        </div>
      </div>

      <div className="container categorie-content">
        {articles.length === 0 && !loading && (
          <div className="empty-state">
            <p>Aucun article dans cette rubrique pour le moment.</p>
            <Link to="/" className="premium-btn">Retour à l'accueil</Link>
          </div>
        )}

        <div className="articles-grid">
          {articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {loading && <div className="page-loader" style={{minHeight: '200px'}}>Chargement...</div>}

        {hasNext && !loading && (
          <div className="load-more">
            <button onClick={() => setPage(p => p + 1)} className="load-more-btn">
              Charger plus d'articles
            </button>
          </div>
        )}
      </div>
    </div>
  )
}