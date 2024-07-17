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
  colors: [
    { id: 1, label: 'cadetblue' },
    { id: 2, label: 'aquamarine' },
    { id: 3, label: 'bisque' },
    { id: 4, label: 'burlywood' },
    { id: 5, label: 'cornflowerblue' },
    { id: 6, label: 'deepskyblue' },
    { id: 7, label: 'crimson' },
    { id: 8, label: 'darkorange' },
    { id: 9, label: 'darkturquoise' },
    { id: 10, label: 'deeppink' },
    { id: 11, label: 'hotpink' },
    { id: 12, label: 'indianred' },
    { id: 13, label: 'lightgreen' },
    { id: 14, label: 'lightsalmon' },
    { id: 15, label: 'lightseablue' },
    { id: 16, label: 'mediumaquamarine' },
    { id: 17, label: 'mediumpurple' },
    { id: 18, label: 'mediumvioletred' },
    { id: 19, label: 'orchid' },
    { id: 20, label: 'plum' },
    { id: 21, label: 'silver' },
    { id: 22, label: 'springgreen' },
    { id: 23, label: 'tan' },
    { id: 24, label: 'violet' },
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
