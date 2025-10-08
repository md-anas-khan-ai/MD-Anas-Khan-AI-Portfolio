export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'MD ANAS KHAN',
    url: 'https://your-domain.com',
    email: 'md.anaskhan.aiml@gmail.com',
    sameAs: [
      'https://linkedin.com/in/md-anas-khan-ai',
      'https://github.com/md-anas-khan-ai',
    ],
    jobTitle: 'B.Tech CSE (AI & ML) Student',
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://your-domain.com',
    name: 'MD ANAS KHAN – Portfolio',
  };
}


