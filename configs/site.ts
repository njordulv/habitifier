export type SiteConfig = typeof siteConfig

export const siteConfig = {
  title: 'Habitifier | Your Personal Habit Tracker',
  description:
    'Habitifier helps you build and maintain good habits, track your progress, and achieve your personal goals with ease. Start your journey to a better you today!',
  nav: [
    {
      label: 'Home',
      href: '/',
    },
  ],
  navAuth: [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Habits',
      href: '/habits',
    },
    {
      label: 'Goals',
      href: '/goals',
    },
    {
      label: 'Progress',
      href: '/progress',
    },
  ],
}
