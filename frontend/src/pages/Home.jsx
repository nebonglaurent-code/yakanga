// export default function Home() {
//   return <div>Home</div>
// }

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/client'
import ArticleCard from '../components/ArticleCard'
import Newsletter from '../components/Newsletter'
import './Home.css'

export default function Home() {
  const [data, setData] = useState({ a_la_une: [], derniers_articles: [], categories: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/articles/une/')
      .then(res => setData(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page-loader">Chargement...</div>

  const [hero, ...uneReste] = data.a_la_une
//   const derniersParCategorie = data.categories.slice(0, 3)

  return (
    <div className="home">

      {/* HERO */}
      {hero && (
        <section className="hero">
          <div className="container hero-inner">
            <div className="hero-main">
              <Link to={`/article/${hero.slug}`}>
                <div className="hero-image">
                  {hero.image_url
                    ? <img src={hero.image_url} alt={hero.titre} />
                    : <div className="hero-image-placeholder" />
                  }
                  <div className="hero-overlay">
                    {hero.categorie && (
                      <span className="badge-categorie">{hero.categorie.nom}</span>
                    )}
                    {hero.est_premium && <span className="badge-premium">★ Premium</span>}
                    <h1 className="hero-titre">{hero.titre}</h1>
                    <p className="hero-chapeau">{hero.chapeau}</p>
                    <div className="hero-meta">
                      <span>{hero.auteur_nom}</span>
                      <span>
                        {new Date(hero.date_publication).toLocaleDateString('fr-FR', {
                          day: 'numeric', month: 'long', year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {uneReste.length > 0 && (
              <div className="hero-sidebar">
                {uneReste.map(article => (
                  <Link to={`/article/${article.slug}`} key={article.id} className="hero-side-item">
                    <div className="hero-side-image">
                      {article.image_url
                        ? <img src={article.image_url} alt={article.titre} />
                        : <div className="hero-image-placeholder" />
                      }
                    </div>
                    <div className="hero-side-body">
                      {article.categorie && (
                        <span className="badge-categorie">{article.categorie.nom}</span>
                      )}
                      <h3>{article.titre}</h3>
                      <span className="hero-side-date">
                        {new Date(article.date_publication).toLocaleDateString('fr-FR', {
                          day: 'numeric', month: 'short'
                        })}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* BANDE BREAKING */}
      <div className="breaking-bar">
        <div className="container breaking-inner">
          <span className="breaking-label">À LA UNE</span>
          <div className="breaking-scroll">
            {data.derniers_articles.slice(0, 4).map((a, i) => (
              <span key={a.id}>
                <Link to={`/article/${a.slug}`}>{a.titre}</Link>
                {i < 3 && <span className="breaking-sep">◆</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* DERNIERS ARTICLES */}
      <section className="section-articles">
        <div className="container">
          <div className="section-header">
            <h2 className="section-titre">Dernières actualités</h2>
            <div className="section-line" />
          </div>
          <div className="articles-grid">
            {data.derniers_articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <Newsletter />

    </div>
  )
}