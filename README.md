# Super WebStore

A responsive and accessible e-commerce demo built with React and TypeScript. Super WebStore uses [DummyJSON](https://dummyjson.com/) for product, recipe, authentication, and user data.

## Features

### Shopping

- Featured products, deals, and product categories
- Product search from the responsive site header
- Detailed product pages with images, pricing, star ratings, reviews, and expandable metadata
- Add-to-cart controls across product views
- Accessible confirmation modal after adding an item
- Responsive cart with quantity controls and item removal
- Calculated subtotal, 10% tax, and order total

### Accounts

- Protected Account route for authenticated users
- Sign-in through the DummyJSON authentication API
- Automatic redirect to sign-in for signed-out visitors
- Detailed user profiles fetched without account-query caching
- Sign-out functionality

### Recipes

- Responsive recipe catalog
- API pagination with 10 recipes requested per page
- Recipe search by name
- Filtering by API-provided tag or meal type
- URL-backed search, filter, and pagination state
- Individual recipe pages with ingredients, instructions, preparation details, and ratings
- Interactive tags and meal types that return to filtered recipe results

### User experience

- Responsive layouts for desktop, tablet, and mobile
- Semantic page structure and screen-reader labels
- Keyboard-accessible controls and visible focus indicators
- Reduced-motion support
- Loading, empty, network-error, and retry states
- Product image fallbacks

## Technology

- React 19
- TypeScript
- Vite
- React Router
- Redux Toolkit and React Redux
- TanStack Query
- Axios
- Material Icons
- ESLint

## Requirements

- Node.js 20 or newer
- npm
- Git
- Internet access for DummyJSON-backed pages

## Getting started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will print the local development URL in the terminal.

## Demo account

The Account page is protected. Navigating to `/account` while signed out redirects to `/sign-in`.

Use the following DummyJSON credentials:

```text
Username: emilys
Password: emilyspass
```

Authentication is held in application state and is cleared when the browser page is refreshed. All account information is demonstration data.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Compile TypeScript and create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Compile TypeScript project references |
| `npm run validate` | Run linting and TypeScript checks |

## Pre-commit validation

The tracked `.githooks/pre-commit` hook runs `npm run validate` before each commit. The `npm install` prepare script configures Git to use the tracked hooks directory.

To activate it manually in an existing clone:

```bash
git config core.hooksPath .githooks
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/categories` | Product categories |
| `/category/:category` | Products in a category |
| `/deals` | Product deals |
| `/product/:id` | Product details |
| `/search?q=...` | Product search results |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/recipes` | Recipe catalog |
| `/recipe/:id` | Recipe details |
| `/sign-in` | Account sign-in |
| `/account` | Protected account details |
| `/about` | About Super WebStore |
| `/contact` | Contact information |

Recipe state is represented in the URL:

```text
/recipes?page=2
/recipes?q=pizza
/recipes?tag=Italian
/recipes?meal=Dinner
```

## Project structure

```text
src/
├── app/          Redux store and typed hooks
├── components/   Shared UI components
├── datasource/   DummyJSON API client
├── pages/        Route-level page components
├── slices/       Cart and authentication state
├── styles/       Page and component styles
├── types/        TypeScript data models
└── utils/        Shared request error handling
```

## Data and caching

TanStack Query manages API request state. General catalog data uses the application’s shared query caching defaults. Account-detail requests are always considered stale, refetch whenever the Account page mounts, and are removed from memory after the page unmounts.

Redux Toolkit manages authentication and cart state. This demo does not persist either state after a full page refresh.

## API documentation

- [Products](https://dummyjson.com/docs/products)
- [Recipes](https://dummyjson.com/docs/recipes)
- [Authentication](https://dummyjson.com/docs/auth)
- [Users](https://dummyjson.com/docs/users)

DummyJSON provides placeholder data and simulated mutations. It should not be treated as a production backend.

## Production build

Create the optimized application bundle:

```bash
npm run build
```

Generated assets are written to `dist/`.
