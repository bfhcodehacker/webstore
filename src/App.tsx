import { Route, Routes } from 'react-router'
import './App.css';
import { HomePage } from './pages/Home.tsx'
import { About } from './pages/About.tsx'
import { Contact } from './pages/Contact.tsx'
import { Categories } from './pages/Categories.tsx'
import { ProductIndex } from './pages/ProductIndex.tsx'
import { Product } from './pages/Product.tsx'
import { Account } from './pages/Account.tsx'
import { Deals } from './pages/Deals.tsx'
import { Recipes } from './pages/Recipes.tsx'
import { Cart } from './pages/Cart.tsx'
import { Checkout } from './pages/Checkout.tsx'
import { HeaderFooterLayout } from './components/HeaderFooterLayout.tsx'
import { AddedToCartModal } from './components/AddedToCartModal.tsx'
import { SearchResults } from './pages/SearchResults.tsx'
import { SignIn } from './pages/SignIn.tsx'
import { RequireAuth } from './components/RequireAuth.tsx'

export function App() {
  return (
    <div className='mainApp'>
      <AddedToCartModal />
      <Routes>
        <Route element={<HeaderFooterLayout />}>
          <Route index element={<HomePage />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='categories' element={<Categories />} />
          <Route path='category/:category' element={<ProductIndex />} />
          <Route path='product/:id' element={<Product />} />
          <Route path='search' element={<SearchResults />} />
          <Route path='deals' element={<Deals />} />
          <Route path='sign-in' element={<SignIn />} />
          <Route path='account' element={<RequireAuth><Account /></RequireAuth>} />
          <Route path='recipes' element={<Recipes />} />
        </Route>
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} />
      </Routes>
    </div>
  )
}
