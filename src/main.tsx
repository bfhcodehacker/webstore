import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'material-icons/iconfont/material-icons.css'
import './index.css'
import { BrowserRouter } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App } from './App'
import { Provider } from 'react-redux'
import store from './app/store'

const queryClient = new QueryClient({ 
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
