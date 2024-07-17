import { create } from 'zustand'
import { CreateHabitState } from '@/interfaces'

export const useCreateHabitStore = create<CreateHabitState>((set) => ({
  description: '',
  setDescription: (description: string) => set({ description }),
  goal: 1,
  increaseGoal: () => set((state) => ({ goal: state.goal + 1 })),
  decreaseGoal: () =>
    set((state) => ({ goal: state.goal > 1 ? state.goal - 1 : 1 })),
  icon: 'Water',
  setIcon: (ic) => set({ icon: ic }),
  timeOfDay: 'everytime',
  setTimeOfDay: (time) => set({ timeOfDay: time }),
  weekDays: [],
  setWeekDays: (days) => set({ weekDays: days }),
  resetForm: () =>
    set({
      description: '',
      goal: 1,
      icon: 'Water',
      timeOfDay: 'everytime',
      weekDays: [],
    }),
}))
