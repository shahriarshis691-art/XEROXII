import { Helmet } from 'react-helmet-async';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../lib/constants';

export default function Seo({
  title,
  description,
  path = '',
  image = DEFAULT_OG_IMAGE,
  type = 'website',
  noindex = false,
  jsonLd = null,
}) {
  const fullTitle = title ? `${title} | XEROXII` : 'XEROXII — Luxury Watches & Fine Jewellery';
  const canonical = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`.replace(/\/$/, '') || SITE_URL;
  const desc = description || 'Curated luxury watches and fine jewellery. Authentic timepieces from Seiko, Tissot, Hamilton, Citizen, and more.';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:site_name" content="XEROXII" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).map((ld, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(ld)}</script>
      ))}
    </Helmet>
  );
}

export { SITE_URL, DEFAULT_OG_IMAGE };
