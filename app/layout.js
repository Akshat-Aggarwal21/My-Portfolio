import './globals.css'

export const metadata = {
  title: 'Akshat Aggarwal — ML Engineer & Data Analyst',
  description: 'Building intelligent systems that scale. Machine Learning Engineer specializing in AI, deep learning, and data-driven solutions.',
  keywords: 'Akshat Aggarwal, Machine Learning Engineer, Data Analyst, AI, TensorFlow, Python, Portfolio',
  authors: [{ name: 'Akshat Aggarwal' }],
  openGraph: {
    title: 'Akshat Aggarwal — ML Engineer & Data Analyst',
    description: 'Building intelligent systems that scale.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
