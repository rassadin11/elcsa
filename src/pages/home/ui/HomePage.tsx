import { About } from '@widgets/about'
import { Converter } from '@widgets/currency-converter'
import { Footer } from '@widgets/footer'
import { Header } from '@widgets/header'
import { Hero } from '@widgets/hero'
import { NetworksTable } from '@widgets/networks-table'

export function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Converter />
        <NetworksTable />
      </main>
      <Footer />
    </>
  )
}
