// src/components/Seo.jsx
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const Seo = ({ 
  title, 
  description, 
  image, 
  url, 
  children 
}) => {
  const { pathname } = useLocation();
  const siteName = 'The Prime Casa';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const metaDescription = description || 'Find RERA-verified properties in Noida & Greater Noida. Zero brokerage, 100% trusted real estate advisory.';
  const metaImage = image || 'https://theprimecasa.in/og-image.jpg';
  const canonicalUrl = url || `https://theprimecasa.in${pathname}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {children}
    </Helmet>
  );
};

export default Seo;