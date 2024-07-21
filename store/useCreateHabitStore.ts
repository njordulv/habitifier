import { create } from 'zustand'
import { CreateHabitState } from '@/interfaces'

export const useCreateHabitStore = create<CreateHabitState>((set) => ({
  description: '',
  setDescription: (description: string) => set({ description }),
  goal: 1,
  increaseGoal: () => set((state) => ({ goal: state.goal + 1 })),
  decreaseGoal: () =>
    set((state) => ({ goal: state.goal > 1 ? state.goal - 1 : 1 })),
  color: 'deepskyblue',
  setColor: (el) => set({ color: el }),
  units: 'glasses',
  setUnits: (unit) => set({ units: unit }),
  icon: 'Water',
  setIcon: (i) => set({ icon: i }),
  reminder: [],
  setReminder: (dates: (Date | undefined)[]) => set({ reminder: dates }),
  timeOfDay: 'anytime',
  setTimeOfDay: (time) => set({ timeOfDay: time }),
  weekDays: [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ],
  setWeekDays: (days) => set({ weekDays: days }),
  resetForm: () =>
    set({
      description: '',
      goal: 1,
      units: 'glasses',
      color: 'deepskyblue',
      icon: 'Water',
      timeOfDay: 'anytime',
      reminder: [],
      weekDays: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
    }),
}))
