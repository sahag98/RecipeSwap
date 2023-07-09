import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider'
import NextTopLoader from 'nextjs-toploader';

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
        <NextTopLoader color='#E0777D' showSpinner={false} />
          <div className='lg:px-64 relative'>
          <Navbar />
          </div>
          <div className='lg:px-64 relative px-2'>
           
           
            {children}
          </div>
        </body>
      </AuthProvider>
    </html>
  )
}
