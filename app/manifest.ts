import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Estore v2',
    short_name: 'Estore',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        "purpose": "maskable",
        "sizes": "142x156",
        "src": "/images/stpeter-logo-icon.png",
        "type": "image/png"
      },
      {
        "purpose": "any",
        "sizes": "142x156",
        "src": "/images/stpeter-logo-icon.png",
        "type": "image/png"
      },
      {
        "src": "icon512_rounded.png",
        "type": "image/png",
        "sizes": "512x512"
      },
      {
        src: '/images/Logostpeter.png',
        sizes: '253x53',
        type: 'image/png',
      },
    ],
  }
}