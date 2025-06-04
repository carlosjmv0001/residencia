import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Bem vindo àRNP Residência</h1>
        <p>Esta é a página inicial do nosso aplicativo.</p>
      </main>
      <Footer />
    </>
  )
}
