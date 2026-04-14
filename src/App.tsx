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

export function App() {
  return (
    <div className='mainApp'>
      <Routes>
        <Route element={<HeaderFooterLayout />}>
          <Route index element={<HomePage />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='categories' element={<Categories />} />
          <Route path='category' element={<ProductIndex />} />
          <Route path='product' element={<Product />} />
          <Route path='deals' element={<Deals />} />
          <Route path='account' element={<Account />} />
          <Route path='recipes' element={<Recipes />} />
        </Route>
        <Route path='cart' element={<Cart />} />
        <Route path='checkout' element={<Checkout />} />
      </Routes>
    </div>
  )
}