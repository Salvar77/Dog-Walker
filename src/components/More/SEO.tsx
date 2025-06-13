import Head from "next/head";

interface SEOProps {
  title: string;
  description: string;
  url: string;
  image: string; // najlepiej PNG/JPEG
  isHome?: boolean;
  isApp?: boolean;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url,
  image,
  isHome = false,
  isApp = false,
}) => {
  const organizationSnippet = {
    "@context": "https://schema.org",
    "@id": url + "#organization",
    "@type": "Organization",
    name: "DogWalker",
    url,
    logo: image,
    sameAs: [
      "https://x.com/dogwalker_dwt?s=21",
      "https://www.facebook.com/share/1YtUU1s39f/?mibextid=wwXIfr",
      "https://t.me/DogWalkerPlatform",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: url + "/contact",
        availableLanguage: ["Polish", "English", "Spanish"],
      },
    ],
  };

  const webSiteSnippet = {
    "@context": "https://schema.org",
    "@id": url + "#website",
    "@type": "WebSite",
    name: title,
    url,
    description,
    publisher: {
      "@id": url + "#organization",
    },
  };

  const webPageSnippet = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url + "#webpage",
    url,
    name: title,
    description,
    inLanguage: "pl-PL",
    isPartOf: {
      "@id": url + "#website",
    },
    breadcrumb: {
      "@id": url + "#breadcrumb",
    },
    publisher: {
      "@id": url + "#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSnippet = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": url + "#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Strona główna",
        item: url,
      },
    ],
  };

  const mobileAppSnippet = isApp
    ? {
        "@context": "https://schema.org",
        "@type": "MobileApplication",
        "@id": url + "#mobileapp",
        name: title,
        description,
        operatingSystem: "iOS, Android",
        applicationCategory: "BusinessApplication",
        url,
        screenshot: [image],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          priceValidUntil: "2026-12-31",
          url,
        },
      }
    : null;

  const structuredData: any[] = [
    organizationSnippet,
    webSiteSnippet,
    webPageSnippet,
    breadcrumbSnippet,
    ...(isApp && mobileAppSnippet ? [mobileAppSnippet] : []),
  ];

  return (
    <Head>
      {/* Podstawowe */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="url" content={url} />
      <link rel="canonical" href={url} />

      {/* Alternate language versions */}
      <link rel="alternate" hrefLang="pl" href="https://dog-walker.io/" />
      <link rel="alternate" hrefLang="en" href="https://dog-walker.io/en" />
      <link rel="alternate" hrefLang="es" href="https://dog-walker.io/es" />
      <link
        rel="alternate"
        hrefLang="x-default"
        href="https://dog-walker.io/"
      />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dogwalker_dwt" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Keywords */}
      <meta
        name="keywords"
        content="dog walking, wyprowadzanie psów, DogWalkerToken, DWT, blockchain, BSC"
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
    </Head>
  );
};

export default SEO;
