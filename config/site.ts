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
      label: 'Create',
      href: '/create',
    },
    {
      label: 'Habits',
      href: '/habits',
    },
    {
      label: 'Goals',
      href: '/goals',
    },
  ],
  units: [
    { id: 1, label: 'glasses' },
    { id: 2, label: 'times' },
    { id: 3, label: 'pages' },
    { id: 4, label: 'tries' },
    { id: 5, label: 'kilometers' },
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
