import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomePage } from '@pages/home'
import { WalletPage } from '@pages/wallet'
import { SwapPage } from '@pages/swap'
import { ProfilePage } from '@pages/profile'
import { LoginPage } from '@pages/login'
import { RegisterPage } from '@pages/register'
import { SeedPhrasePage } from '@pages/seed-phrase'
import { ROUTES } from '@shared/config/routes'

export function RouterProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.WALLET} element={<WalletPage />} />
        <Route path={ROUTES.SWAP} element={<SwapPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.SEED_PHRASE} element={<SeedPhrasePage />} />
      </Routes>
    </BrowserRouter>
  )
}
