import { create } from 'zustand'
import { CreateHabitState } from '@/interfaces'

export const useCreateHabitStore = create<CreateHabitState>((set) => ({
  description: '',
  setDescription: (description: string) => set({ description }),
  goal: 1,
  increaseGoal: () => set((state) => ({ goal: state.goal + 1 })),
  decreaseGoal: () =>
    set((state) => ({ goal: state.goal > 1 ? state.goal - 1 : 1 })),
  color: 'cadetblue',
  setColor: (el) => set({ color: el }),
  goalUnit: 'glasses',
  setGoalUnit: (unit) => set({ goalUnit: unit }),
  icon: 'Water',
  setIcon: (i) => set({ icon: i }),
  timeOfDay: 'everytime',
  setTimeOfDay: (time) => set({ timeOfDay: time }),
  weekDays: [],
  setWeekDays: (days) => set({ weekDays: days }),
  resetForm: () =>
    set({
      description: '',
      goal: 1,
      goalUnit: 'glasses',
      color: 'cadetblue',
      icon: 'Water',
      timeOfDay: 'everytime',
      weekDays: [],
    }),
}))
