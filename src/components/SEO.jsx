import { Helmet } from 'react-helmet-async'

const SITE_URL = import.meta.env.VITE_SITE_URL || 'https://kintox.design'

export default function SEO({ title, description, path, image }) {
  const siteName = 'KINTOX — Premium Design Store & Portfolio'
  const fullTitle = title ? `${title} · KINTOX` : siteName
  const desc = description || 'Premium digital design assets, UI kits, and brand identity solutions by KINTOX.'
  const url = `${SITE_URL}${path || '/'}`
  const img = image || `${SITE_URL}/og.jpg`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
