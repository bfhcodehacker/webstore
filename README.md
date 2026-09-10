# Super WebStore

Super WebStore is a responsive e-commerce demo built with React and TypeScript. It uses [DummyJSON](https://dummyjson.com/) for product, recipe, and user data.

## Features

- Responsive Home, Deals, category, product, cart, account, and recipe pages
- Product search using the DummyJSON search API
- Featured products and deal listings
- Product ratings with full, half, and empty stars
- Expandable product information, reviews, and metadata
- Redux-powered cart with quantity controls and item removal
- Cart subtotal, 10% tax calculation, and order total
- Add-to-cart confirmation modal
- Protected Account route and DummyJSON authentication
- Detailed user account information
- Paginated recipe catalog requesting 10 recipes at a time
- Recipe search and filtering by tag or meal type
- Individual recipe pages with ingredients and instructions
- Loading, empty, network-error, and retry states
- Responsive layouts, keyboard focus states, semantic markup, and screen-reader labels

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

## Demo sign-in

The Account page is protected. Selecting Account while signed out redirects to the sign-in page.

Use this DummyJSON demo account:

```text
Username: emilys
Password: emilyspass
```

Authentication and user records are test data supplied by DummyJSON. The session is kept in application state and is cleared when the browser page is refreshed.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Compile TypeScript and create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Compile TypeScript project references |
| `npm run validate` | Run linting and TypeScript checks |

## Pre-commit validation

The repository includes a tracked pre-commit hook in `.githooks/pre-commit`. Running `npm install` activates it through the package `prepare` script.

Before every commit, the hook runs:

```bash
npm run validate
```

If the hook is not active in an existing clone, enable it manually:

```bash
git config core.hooksPath .githooks
```

## Application routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/categories` | Product categories |
| `/category/:category` | Products in a category |
| `/deals` | Current product deals |
| `/product/:id` | Product details |
| `/search?q=...` | Product search results |
| `/cart` | Shopping cart |
| `/checkout` | Checkout |
| `/recipes` | Recipe catalog, search, and filters |
| `/recipe/:id` | Recipe details |
| `/sign-in` | Account sign-in |
| `/account` | Protected account details |
| `/about` | About Super WebStore |
| `/contact` | Contact information |

Recipe pagination and filters are represented in the URL, for example:

```text
/recipes?page=2
/recipes?q=pizza
/recipes?tag=Italian
/recipes?meal=Dinner
```

## API notes

This project uses DummyJSON as a demonstration API. Product inventory, users, authentication, and recipes are not production data. Network access is required for API-backed pages.

Relevant documentation:

- [Products API](https://dummyjson.com/docs/products)
- [Recipes API](https://dummyjson.com/docs/recipes)
- [Authentication API](https://dummyjson.com/docs/auth)
- [Users API](https://dummyjson.com/docs/users)

## Production build

Create an optimized build:

```bash
npm run build
```

Generated assets are written to `dist/`.
