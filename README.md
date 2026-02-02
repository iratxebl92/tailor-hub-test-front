# Tailor-Hub Test Frontend

A responsive web application built as a technical assessment for **Tailor-Hub**. The project follows a **mobile-first** approach and is developed with modern frontend tools and testing practices.

## Tech Stack

- **[Next.js](https://nextjs.org)** (App Router) – React framework for production
- **[TypeScript](https://www.typescriptlang.org/)** – Typed JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS
- **Testing** – [Vitest](https://vitest.dev/) with [Testing Library](https://testing-library.com/react) for unit and component tests
- **State** – [Zustand](https://zustand-demo.pmnd.rs/) for client state
- **ESLint** – Linting

## Getting Started

Clone the repo, open the project, and install dependencies:

```bash
git clone <https://github.com/iratxebl92/tailor-hub-test-front>
cd tailor-hub-test-front
code .
npm install
```

Crea un archivo **`.env`** en la raíz del proyecto con estas variables (sustituye los valores por los tuyos):

```env
NEXT_PUBLIC_MAPBOX_TOKEN=<tu_token_de_mapbox>
NEXT_PUBLIC_API_URL=https://tailor-hub-test-back.onrender.com
```

- **NEXT_PUBLIC_MAPBOX_TOKEN:** token público de [Mapbox](https://www.mapbox.com/) para el mapa.
- **NEXT_PUBLIC_API_URL:** URL base del backend (por defecto la API de prueba indicada).

Run the development server:

```bash
npm run dev
```

## How it looks

- **Frontend (live):** [tailor-hub-test-front.vercel.app](https://tailor-hub-test-front.vercel.app/)
- **Backend (API):** [tailor-hub-test-back.onrender.com](https://tailor-hub-test-back.onrender.com/)
- **Local:** After `npm run dev`, open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Start dev server         |
| `npm run build`| Build for production     |
| `npm run start`| Start production server  |
| `npm run test` | Run tests (Vitest)       |
| `npm run test:run` | Run tests once       |
| `npm run lint` | Run ESLint               |


## Endpoint Table

### Client (Frontend routes)
| Verb | Endpoint | Description |
|------|----------|-------------|
| GET | `/` | Home / landing page |
| GET | `/login` | Login page |
| GET | `/register` | Registration page |
| GET | `/map` | Map with restaurant list |
| GET | `/profile` | User profile page |
| GET | `/restaurant/new` | New restaurant form |
| GET | `/restaurant/[id]` | Restaurant detail page |
| GET | `/restaurant/[id]/edit` | Edit restaurant page |


## Project Structure

```
tailor-hub-test-front/
├── app/                    # Next.js App Router
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx            # Home
│   ├── login/page.tsx
│   ├── map/page.tsx
│   ├── profile/page.tsx
│   ├── register/page.tsx
│   └── restaurant/
│       ├── [id]/
│       │   ├── page.tsx
│       │   └── edit/page.tsx
│       └── new/page.tsx
├── components/
│   ├── auth/               # Login, register, steps
│   │   ├── __tests__/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── RegisterSteps/
│   ├── core/               # Footer, LoadingSpinner, UserHeader
│   │   ├── __tests__/
│   │   └── index.ts
│   ├── home/               # HomePage, LandingScreen, onboarding
│   ├── Icons/
│   ├── layouts/
│   ├── map/                # MapContainer, RestaurantCard, RestaurantList
│   ├── profile/
│   └── restaurant/         # Detail, comments, new, edit
│       ├── edit/           # EditRestaurantForm, hook
│       └── new/            # NewRestaurantForm, ImageUploader, hook
├── domain/                 # Types (restaurants, users)
├── hooks/                  # useAuth, useRestaurants
├── public/images/
├── services/               # api, authService, restaurantService
├── store/                  # authStore, restaurantStore (Zustand)
├── middleware.ts
├── next.config.ts
├── vitest.config.ts
└── vitest.setup.ts
```

## Author

👤 **Iratxe Barrio**