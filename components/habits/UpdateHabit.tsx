'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { useMessages } from '@/hooks/useMessage'
import { createClient } from '@/utils/supabase/client'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { DayTime } from '@/components/habits/DayTime'
import { DailyGoal } from '@/components/habits/DailyGoal'
import { GoalUnits } from '@/components/habits/GoalUnits'
import { DaysOfWeek } from '@/components/habits/DaysOfWeek'
import { NamesOfWeek } from '@/components/habits/NamesOfWeek'
import { HabitIcons } from '@/components/habits/HabitIcons'
import { HabitColor } from '@/components/habits/HabitColor'
import { Reminder } from '@/components/habits/Reminder'
import { Notification } from '@/components/habits/Notification'
import { formatTimeForDB } from '@/components/ui/time-picker-utils'

const FormSchema = z.object({
  name: z.string().min(3, 'Name is required').max(60, 'Name is too long'),
  days_of_week: z.array(z.string()).min(1, 'At least one day is required'),
})

type FormData = z.infer<typeof FormSchema>

interface Props {
  habitId: number
}

export const UpdateHabit: React.FC<Props> = ({ habitId }) => {
  const supabase = createClient()
  const {
    description,
    setDescription,
    goal,
    setUnits,
    setColor,
    setIcon,
    setSound,
    setTimeOfDay,
    reminder,
    setReminder,
    setWeekDays,
  } = useCreateHabitStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isDataLoaded, setIsDataLoaded] = useState(false)
  const { showMessage } = useMessages()

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      days_of_week: [],
    },
  })

  useEffect(() => {
    const fetchHabit = async () => {
      if (isDataLoaded) return
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('habits')
          .select('*')
          .eq('id', habitId)
          .single()
        if (error) throw error
        form.reset({
          name: data.name,
          days_of_week: data.days,
        })
        setDescription(data.description)
        useCreateHabitStore.setState({ goal: data.goal })
        setUnits(data.units)
        setColor(data.color)
        setIcon(data.icon)
        setSound(data.sound)
        setTimeOfDay(data.time_of_day)
        setReminder(
          data.reminder.map((time: string) => new Date(`1970-01-01T${time}Z`))
        )
        setWeekDays(data.days)
        setIsDataLoaded(true)
      } catch (error: any) {
        showMessage(error.message, 'error', 'destructive')
      } finally {
        setIsLoading(false)
      }
    }
    fetchHabit()
  }, [
    habitId,
    supabase,
    form,
    showMessage,
    setDescription,
    setUnits,
    setColor,
    setIcon,
    setSound,
    setTimeOfDay,
    setReminder,
    setWeekDays,
    isDataLoaded,
  ])

  const onSubmit = async (values: FormData) => {
    setIsLoading(true)
    try {
      const formattedReminder = reminder
        .map((r) => (r ? formatTimeForDB(r) : null))
        .filter(Boolean) as string[]

      const { error } = await supabase
        .from('habits')
        .update({
          name: values.name,
          description: useCreateHabitStore.getState().description,
          goal: useCreateHabitStore.getState().goal,
          units: useCreateHabitStore.getState().units,
          color: useCreateHabitStore.getState().color,
          icon: useCreateHabitStore.getState().icon,
          sound: useCreateHabitStore.getState().sound,
          reminder: formattedReminder,
          time_of_day: useCreateHabitStore.getState().timeOfDay,
          days: values.days_of_week,
        })
        .eq('id', habitId)
      if (error) throw error
      showMessage('Habit successfully updated', 'success', 'default')
    } catch (error: any) {
      showMessage(error.message || 'An error occurred', 'error', 'destructive')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isDataLoaded) {
    return <Spinner />
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-h-[340px] h-full relative overflow-y-scroll p-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    name="name"
                    placeholder="Drink some water"
                    error={!!form.formState.errors.name}
                    autoComplete="name"
                  />
                </FormControl>
                <FormMessage className="absolute !m-0" />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={() => (
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <FormControl>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Optional"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-2 justify-between">
            <div className="form-col-33">
              <div className="form-label">Color</div>
              <HabitColor />
            </div>
            <div className="form-col-33">
              <div className="form-label">Icon</div>
              <HabitIcons />
            </div>
            <div className="form-col-33">
              <div className="form-label">Sound</div>
              <Notification />
            </div>
          </div>
          <div>
            <div className="form-label">Daily Goal</div>
            <DailyGoal />
          </div>
          <div>
            <div className="form-label">Measures</div>
            <GoalUnits />
          </div>
          <div>
            <div className="form-label">Choose preferred time of the day</div>
            <DayTime />
          </div>
          <div>
            <div className="form-label">Reminder</div>
            <Reminder />
          </div>
          <FormField
            control={form.control}
            name="days_of_week"
            render={() => (
              <FormItem>
                <div className="form-label">
                  Choose preferred day(s) of the week
                </div>
                <FormDescription>
                  <NamesOfWeek />
                </FormDescription>
                <DaysOfWeek />
                <FormMessage className="absolute !m-0" />
              </FormItem>
            )}
          />
          <Button type="submit" variant="outline" disabled={isLoading}>
            {isLoading ? <Spinner size={18} /> : 'Update'}
          </Button>
        </form>
      </Form>
    </FormProvider>
  )
}
