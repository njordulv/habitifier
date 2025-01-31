import { GoHome, GoPaste, GoPlusCircle, GoTasklist } from 'react-icons/go'

export type SiteConfig = typeof siteConfig

export const siteConfig = {
  title: 'Habitifier | Your Personal Habit Tracker',
  description:
    'Habitifier helps you build and maintain good habits, track your progress, and achieve your personal goals with ease. Start your journey to a better you today!',
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['nextjs', 'next14', 'supabase', 'habit-creation'],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#f1f3f4b3' }],
  authors: [
    {
      name: 'Njordr',
      url: 'https://njordulv-portfolio.vercel.app/',
    },
  ],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    viewportFit: 'cover' as const,
    userScalable: false,
  },
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/apple-touch-icon.png' },
    { rel: 'icon', url: 'icons/icon-192.png' },
  ],
  nav: [
    {
      label: 'Home',
      href: '/',
      icon: GoHome,
    },
  ],
  navAuth: [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: GoPaste,
    },
    {
      label: 'Create',
      href: '/create',
      icon: GoPlusCircle,
    },
    {
      label: 'Habits',
      href: '/habits',
      icon: GoTasklist,
    },
  ],
  goalUnits: [
    { id: 1, label: 'glasses' },
    { id: 2, label: 'times' },
    { id: 3, label: 'pages' },
    { id: 4, label: 'tries' },
    { id: 5, label: 'kilometers' },
  ],
  colors: [
    { id: 1, label: 'fuchsia' },
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
    { id: 15, label: 'palevioletred' },
    { id: 16, label: 'mediumaquamarine' },
    { id: 17, label: 'mediumpurple' },
    { id: 18, label: 'mediumvioletred' },
    { id: 19, label: 'orchid' },
    { id: 20, label: 'plum' },
    { id: 21, label: 'silver' },
    { id: 22, label: 'springgreen' },
    { id: 23, label: 'tan' },
    { id: 24, label: 'violet' },
    { id: 25, label: 'blanchedalmond' },
    { id: 26, label: 'gold' },
    { id: 27, label: 'azure' },
    { id: 28, label: 'slateblue' },
    { id: 29, label: 'rosybrown' },
    { id: 30, label: 'sandybrown' },
  ],
  daysOfWeek: [
    { id: 'monday', label: 'Monday', name: 'M', short: 'Mon' },
    { id: 'tuesday', label: 'Tuesday', name: 'T', short: 'Tue' },
    { id: 'wednesday', label: 'Wednesday', name: 'W', short: 'Wed' },
    { id: 'thursday', label: 'Thursday', name: 'T', short: 'Thu' },
    { id: 'friday', label: 'Friday', name: 'F', short: 'Fri' },
    { id: 'saturday', label: 'Saturday', name: 'S', short: 'Sat' },
    { id: 'sunday', label: 'Sunday', name: 'S', short: 'Sun' },
  ],
  dayTime: [
    { id: 'anytime', label: 'Anytime' },
    { id: 'morning', label: 'Morning' },
    { id: 'daytime', label: 'Daytime' },
    { id: 'evening', label: 'Evening' },
  ],
  notificationSounds: [
    {
      id: 1,
      label: 'Bell',
      url: '/sounds/bell.wav',
    },
    {
      id: 2,
      label: 'Confirmation Tone',
      url: '/sounds/confirmation-tone.wav',
    },
    {
      id: 3,
      label: 'Game Reveal',
      url: '/sounds/game-reveal.wav',
    },
    {
      id: 4,
      label: 'Interface 1',
      url: '/sounds/interface-1.wav',
    },
    {
      id: 5,
      label: 'Interface 2',
      url: '/sounds/interface-2.wav',
    },
    {
      id: 6,
      label: 'Marimba',
      url: '/sounds/marimba.wav',
    },
  ],
}
