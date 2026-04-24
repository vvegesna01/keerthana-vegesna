
import './globals.css'
import { Inter, Work_Sans } from 'next/font/google'
import Navbar from '@/components/navbar/navbar'
import Footer from '@/components/footer/footer'


const inter = Work_Sans({weight: "400", subsets: ['latin'] })

export const metadata = {
  title: 'Keerthana Vegesna',
  description: 'My Portfolio Website!',
  icons: {
    icon: '/favicon-v4.ico',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
