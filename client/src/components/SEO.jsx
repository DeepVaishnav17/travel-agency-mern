import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website', schema }) => {
    const siteTitle = "Deep Tours & Travels";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const siteUrl = "https://deeptourstravels.com"; // Replace with actual domain if known, or use placeholder
    const currentUrl = url ? `${siteUrl}${url}` : siteUrl;
    const defaultDescription = "Deep Tours & Travels - Curating unforgettable journeys with a touch of luxury and care. Book domestic and international tour packages.";
    const metaDescription = description || defaultDescription;
    const metaImage = image || `${siteUrl}/default-og-image.jpg`; // Ensure this exists or use a valid URL

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            {/* Structured Data (JSON-LD) */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
