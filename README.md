# The Wild Oasis

This is a management service for hotel bookings, built with React.

## Sections

- Login / Logout
- Dashboard (statistics & charts)
- Bookings
- Cabins
- Guests
- Users
- Settings

![Screenshot of the front page](https://raw.githubusercontent.com/kakaijiro/bookings-single-page/main/front-page.png)

## Technologies

- [React](https://react.dev/)
- [React Query](https://tanstack.com/query/latest) (`@tanstack/react-query`)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Recharts](https://recharts.org/)
- [Styled Components](https://styled-components.com/)
- [Supabase](https://supabase.com/)
- [Vite](https://vitejs.dev/)

## Features

- Authentication with Supabase
- Interactive dashboard with pie & line charts
- CRUD operations for bookings, cabins, and guests
- User profile management (update name, password, avatar)
- Responsive design with dark mode support

## Structure

```
src/
├── components/      # Reusable UI components
├── features/        # Feature-based modules (bookings, cabins, guests, etc.)
├── hooks/           # Custom React hooks
├── pages/           # Page components for routing
├── services/        # API and data fetching logic
├── styles/          # Styled Components and global styles
├── utils/           # Utility functions
└── main.jsx         # App entry point
```

## Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/kakaijiro/bookings-single-page.git
   cd bookings-single-page
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:

   - Copy `.env.sample` to `.env.local` and fill in your Supabase credentials.

4. Start the development server:
   ```sh
   npm run dev
   ```

## Live Demo

You can see the live site [here](https://the-wild-oasis-single-page.netlify.app/dashboard).
