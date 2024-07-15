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
  daysOfWeek: [
    { id: 'monday', label: 'Monday', name: 'M' },
    { id: 'tuesday', label: 'Tuesday', name: 'T' },
    { id: 'wednesday', label: 'Wednesday', name: 'W' },
    { id: 'thursday', label: 'Thursday', name: 'T' },
    { id: 'friday', label: 'Friday', name: 'F' },
    { id: 'saturday', label: 'Saturday', name: 'S' },
    { id: 'sunday', label: 'Sunday', name: 'S' },
  ],
  dayTime: [
    { id: 'everytime', label: 'Everytime' },
    { id: 'morning', label: 'Morning' },
    { id: 'daytime', label: 'Daytime' },
    { id: 'evening', label: 'Evening' },
  ],
}
