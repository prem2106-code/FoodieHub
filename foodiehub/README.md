# FoodieHub

FoodieHub is a full-stack food ordering app with a Vite/React frontend and a Spring Boot backend.

## Production Stack

- Frontend: Vite, React, Tailwind CSS, deployed to Vercel
- Backend: Spring Boot 3, Java 21, deployed to Render
- Database: PostgreSQL, managed by Render
- Migrations: Flyway
- Auth: JWT

## Project Structure

```text
foodiehub/
  backend/    Spring Boot REST API
  frontend/   Vite React app
  render.yaml Render blueprint for backend and PostgreSQL
  vercel.json Vercel build configuration
```

## Backend Environment Variables

Render injects these from `render.yaml`:

```text
SPRING_PROFILES_ACTIVE=prod
DB_HOST=<postgres host>
DB_PORT=5432
DB_NAME=foodiehub
DB_USER=<postgres user>
DB_PASSWORD=<postgres password>
JWT_SECRET=<generated secret>
JWT_EXPIRATION_MS=86400000
CORS_ALLOWED_ORIGIN_PATTERNS=https://*.vercel.app
```

The backend reads PostgreSQL settings from environment variables in `backend/src/main/resources/application.yml`.

## Frontend Environment Variables

`frontend/.env.production` contains:

```text
VITE_API_BASE_URL=https://foodiehub-backend.onrender.com/api
```

If the Render backend URL changes, update this value in Vercel as `VITE_API_BASE_URL`.

## Deployment

### Backend and PostgreSQL on Render

1. Push this repository to GitHub.
2. In Render, create a new Blueprint from the repository.
3. Render reads `render.yaml`, creates `foodiehub-postgres`, builds the backend Docker image, and deploys `foodiehub-backend`.
4. Confirm the backend health endpoint responds:

```text
https://foodiehub-backend.onrender.com/api/restaurants
```

### Frontend on Vercel

1. Import the same GitHub repository in Vercel.
2. Keep the project root as the repository root.
3. Vercel reads `vercel.json`.
4. Set this environment variable if Vercel does not pick up `frontend/.env.production`:

```text
VITE_API_BASE_URL=https://foodiehub-backend.onrender.com/api
```

5. Deploy and open the generated Vercel URL.

## Database

H2 has been replaced with PostgreSQL. Flyway creates:

- `users`
- `restaurants`
- `foods`
- `orders`
- `order_items`

The first migrations are in:

```text
backend/src/main/resources/db/migration/
```

Demo restaurants and food items are seeded by migration `V2__seed_restaurants_and_foods.sql`.

## Verification Checklist

After deployment:

1. Open the frontend URL.
2. Confirm restaurants load.
3. Create a new user account.
4. Log in.
5. Open a restaurant menu.
6. Add food to cart.
7. Place an order through the simulated payment screen.
8. Open My Orders and Track Order.
9. Confirm protected profile endpoints work after login.

Admin screens are not implemented in this MVP. The backend only reserves `/api/admin/**` for future admin endpoints.

## Local Development

Run PostgreSQL locally and create a `foodiehub` database/user matching `backend/.env.example`, then start the backend with:

```bash
cd backend
mvn spring-boot:run
```

Start the frontend with:

```bash
cd frontend
npm install
npm run dev
```
