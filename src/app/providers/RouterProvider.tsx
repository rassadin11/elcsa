import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@pages/home'
import { WalletPage } from '@pages/wallet'
import { ROUTES } from '@shared/config/routes'

export function RouterProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.WALLET} element={<WalletPage />} />
      </Routes>
    </BrowserRouter>
  )
}
