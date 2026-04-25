// export default function ArticleDetail() {
//   return <div>Article</div>
// }

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../api/client'
import ArticleCard from '../components/ArticleCard'
import './ArticleDetail.css'

export default function ArticleDetail() {
  const { slug } = useParams()
  const [article, setArticle] = useState(null)
  const [similaires, setSimilaires] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)
    api.get(`/articles/${slug}/`)
      .then(res => {
        setArticle(res.data)
        if (res.data.categorie) {
          api.get(`/articles/?categorie=${res.data.categorie.slug}`)
            .then(r => setSimilaires(r.data.results?.slice(0, 3) || []))
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div className="page-loader">Chargement...</div>
  if (notFound) return <div className="page-loader">Article introuvable.</div>
  if (!article) return null

  const date = new Date(article.date_publication).toLocaleDateString('fr-FR', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  })

  return (
    <div className="article-detail">
      <div className="container">

        {/* BREADCRUMB */}
        <nav className="breadcrumb">
          <Link to="/">Accueil</Link>
          <span>›</span>
          {article.categorie && (
            <>
              <Link to={`/categorie/${article.categorie.slug}`}>{article.categorie.nom}</Link>
              <span>›</span>
            </>
          )}
          <span>{article.titre.substring(0, 40)}...</span>
        </nav>

        <div className="detail-layout">

          {/* CONTENU PRINCIPAL */}
          <article className="detail-main">

            {/* BADGES */}
            <div className="detail-badges">
              {article.categorie && (
                <Link to={`/categorie/${article.categorie.slug}`} className="badge-categorie">
                  {article.categorie.nom}
                </Link>
              )}
              {article.est_premium && <span className="badge-premium">★ Premium</span>}
            </div>

            {/* TITRE */}
            <h1 className="detail-titre">{article.titre}</h1>

            {/* CHAPEAU */}
            <p className="detail-chapeau">{article.chapeau}</p>

            {/* META */}
            <div className="detail-meta">
              <div className="detail-auteur">
                <div className="auteur-avatar">
                  {article.auteur_nom.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="auteur-nom">{article.auteur_nom}</div>
                  <div className="auteur-date">{date}</div>
                </div>
              </div>
              <div className="detail-stats">
                <span>👁 {article.vues} vues</span>
              </div>
            </div>

            {/* IMAGE */}
            {article.image_url && (
              <figure className="detail-image">
                <img src={article.image_url} alt={article.titre} />
              </figure>
            )}

            {/* CONTENU */}
            {article.est_premium ? (
              <div className="premium-wall">
                <div className="premium-wall-inner">
                  <span className="badge-premium" style={{fontSize: '13px', padding: '6px 14px'}}>★ Contenu Premium</span>
                  <h3>Cet article est réservé aux abonnés</h3>
                  <p>Abonnez-vous pour accéder à l'intégralité de nos analyses et reportages.</p>
                  <Link to="/abonnements" className="premium-btn">Voir les offres d'abonnement</Link>
                </div>
              </div>
            ) : (
              <div
                className="detail-contenu"
                dangerouslySetInnerHTML={{ __html: article.contenu.replace(/\n/g, '<br/>') }}
              />
            )}

            {/* TAGS */}
            {article.tags?.length > 0 && (
              <div className="detail-tags">
                <span>Tags :</span>
                {article.tags.map(tag => (
                  <span key={tag.id} className="tag">{tag.nom}</span>
                ))}
              </div>
            )}
          </article>

          {/* SIDEBAR */}
          <aside className="detail-sidebar">
            <div className="sidebar-block">
              <h4 className="sidebar-titre">Dans la même rubrique</h4>
              <div className="sidebar-articles">
                {similaires.length > 0
                  ? similaires.map(a => <ArticleCard key={a.id} article={a} variant="mini" />)
                  : <p style={{fontSize:'13px', color:'#888'}}>Aucun article similaire.</p>
                }
              </div>
            </div>
          </aside>

        </div>
      </div>

      {/* ARTICLES SIMILAIRES BAS DE PAGE */}
      {similaires.length > 0 && (
        <section className="section-articles" style={{background: 'var(--gris-clair)', padding: '40px 0'}}>
          <div className="container">
            <div className="section-header">
              <h2 className="section-titre">À lire aussi</h2>
              <div className="section-line" />
            </div>
            <div className="articles-grid" style={{gridTemplateColumns: 'repeat(3, 1fr)'}}>
              {similaires.map(a => <ArticleCard key={a.id} article={a} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}