import './globals.css'

export const metadata = {
  title: 'FW7 Challenge',
  description: 'Desafio da FW7 para a criação de um programa que encurta uma URL.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">{children}</body>
    </html>
  )
}
