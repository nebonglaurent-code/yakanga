// export default function Newsletter() {
//   return <div>Newsletter</div>
// }

import { useState } from 'react'
import api from '../api/client'
import './Newsletter.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await api.post('/newsletter/inscription/', { email })
      setMsg({ type: 'success', text: res.data.message })
      setEmail('')
    } catch {
      setMsg({ type: 'error', text: 'Une erreur est survenue.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="newsletter">
      <div className="container newsletter-inner">
        <div className="newsletter-text">
          <h3>Restez informé</h3>
          <p>Recevez chaque matin l'essentiel de l'actualité culturelle et économique d'Afrique Centrale.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? '...' : "S'inscrire"}
          </button>
        </form>
        {msg && <p className={`newsletter-msg newsletter-msg--${msg.type}`}>{msg.text}</p>}
      </div>
    </section>
  )
}