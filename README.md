# Habitifier

Habitifier is an application designed to help you build and maintain good habits.
Track your progress, set goals, and achieve a better you with ease.

## Features

- User authentication and authorization using Supabase
  - GitHub OAuth
  - Google OAuth
  - Email and password credentials
- Sign in and sign out pages
- Protected routes with middleware and redirects
- Dashboard displaying current habits and their status
- Ability to add habits
- Centralized state management for habit creation form
- Seamless integration with Supabase for data persistence

## Technologies Used

- Framework: Next.js
- State Management: Zustand
- UI design system: Shadcn-UI, Tailwind CSS
- Languages: TypeScript
- Authentication: Supabase Authentication (OAuth and email credentials)
- Database: Supabase
- Form Management: React Hook Form with Zod validation

## Recent Updates

1. Implemented comprehensive user authentication system using Supabase
   - Integrated GitHub and Google OAuth
   - Added email and password authentication
   - Created sign in, sign out pages
   - Implemented middleware for route protection and redirects
2. Implemented Zustand for centralized state management in the habit creation form
   - Integrated Zustand store with React Hook Form for improved form handling
   - Added functionality to reset form state using Zustand
   - Improved error handling and user feedback in the habit creation process
