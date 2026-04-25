export default function Logo({ size = 'normal' }) {
  const big = size === 'big' ? 48 : size === 'footer' ? 32 : 42

  return (
    <div className="yakanga-logo" style={{ '--logo-size': `${big}px` }}>
      <div className="yakanga-wordmark">
        <span className="yakanga-yaka">Yaka</span>
        <span className="yakanga-nga">nga</span>
      </div>
      <div className="yakanga-slogan">
        LA MÉMOIRE DES CULTURES CONTEMPORAINES
      </div>
    </div>
  )
}