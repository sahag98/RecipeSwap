import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RecipeSwap',
  description: 'Swap recipes with people all around the world.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <div className='lg:mx-64 mx-5'>
            <Navbar />
            {children}
          </div>
        </body>
      </AuthProvider>
    </html>
  )
}
