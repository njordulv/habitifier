export const list = {
  hidden: {},
  visible: {
    transition: {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.4,
      staggerChildren: 0.15,
    },
  },
}

export const items = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      duration: 0.8,
    },
  },
}
