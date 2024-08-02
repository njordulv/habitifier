# Habitifier

Habitifier is an application designed to help you build and maintain good habits.
Track your progress, set goals, and achieve a better you with ease.

## Features

1. User authentication and authorization using Supabase
   - GitHub OAuth
   - Google OAuth
   - Email and password credentials
2. Sign in and sign out pages
3. Protected routes with middleware and redirects
4. Dashboard displaying current habits and their status
5. Ability to add and manage habits
   - Edit habit details such as name, description, and days of the week
   - Set daily goals, units, reminders, and preferred times
   - Select icons and colors for habits
   - Configure notification sounds
6. Centralized state management for habit creation and updates
   - Integrated Zustand for managing form state and resetting values
7. Seamless integration with Supabase for data persistence

## Technologies Used

- Framework: Next.js
- State Management: Zustand
- UI design system: Shadcn-UI, Tailwind CSS
- Languages: TypeScript
- Authentication: Supabase Authentication (OAuth and email credentials)
- Database: Supabase
- Form Management: React Hook Form with Zod validation
- PWA: next-pwa

## Recent Updates

1. **User Authentication Enhancements**

   - Implemented comprehensive user authentication system using Supabase
   - Integrated GitHub and Google OAuth
   - Added email and password authentication
   - Created sign-in/sign-up pages
   - Implemented middleware for route protection and redirects

2. **Centralized State Management**

   - Utilized Zustand for managing state in the habit creation form
   - Integrated Zustand store with React Hook Form for improved form handling
   - Added functionality to reset form state using Zustand
   - Enhanced error handling and user feedback in the habit creation process

3. **Habit Management Improvements**

   - Updated habit editing functionality to handle various attributes like name, description, days of the week, times of day, goals, changing habit colors & icons
   - Improved notification settings with sound configuration
   - Improved reminders settings with timers

4. **User Interface and Experience**

   - Added new components for better habit tracking and management
   - Improved UI with additional form fields and components for a more comprehensive habit management experience

5. **Progressive Web App (PWA) Integration**

   - Added PWA support using next-pwa
   - Improved offline capabilities and user experience with service workers and caching
