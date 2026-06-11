import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import '@/styles/index.css'

export const metadata: Metadata = {
  title: 'Site web Maison Lidam',
  description:
    'Professional e-boutique showcasing Moroccan homemade pastries and catering services with product catalog, dynamic cart, delivery fees, and custom order forms.',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
