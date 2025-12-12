'use client'

import dynamic from 'next/dynamic'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { useState, useEffect, useId } from 'react'
import { useMessages } from '@/hooks/useMessage'
import { createBrowserSupabaseClient } from '@/utils/supabase/client-browser'
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
import { Spinner, SpinnerMin } from '@/components/ui/spinner'
import { DayTime } from '@/components/habits/form/DayTime'
import { DailyGoal } from '@/components/habits/form/DailyGoal'
import { GoalUnits } from '@/components/habits/form/GoalUnits'
import { DaysOfWeek } from '@/components/habits/form/DaysOfWeek'
import { NamesOfWeek } from '@/components/habits/form/NamesOfWeek'
import { formatTimeForDB } from '@/components/ui/time-picker-utils'

const HabitColor = dynamic(
  () =>
    import('@/components/habits/form/HabitColor').then((mod) => mod.HabitColor),
  {
    loading: () => <SpinnerMin size={18} />,
  }
)

const HabitIcons = dynamic(
  () =>
    import('@/components/habits/form/HabitIcons').then((mod) => mod.HabitIcons),
  {
    loading: () => <SpinnerMin size={18} />,
  }
)

const Notification = dynamic(
  () =>
    import('@/components/habits/form/Notification').then(
      (mod) => mod.Notification
    ),
  {
    loading: () => <SpinnerMin size={18} />,
  }
)

const Reminder = dynamic(
  () => import('@/components/habits/form/Reminder').then((mod) => mod.Reminder),
  {
    loading: () => <SpinnerMin size={18} />,
  }
)

const FormSchema = z.object({
  name: z.string().min(3, 'Name is required').max(60, 'Name is too long'),
  days_of_week: z.array(z.string()).min(1, 'At least one day is required'),
})

type FormData = z.infer<typeof FormSchema>

interface Props {
  habitId: number
  onSuccess: () => void
}

export const UpdateHabit: React.FC<Props> = ({ habitId, onSuccess }) => {
  const supabase = createBrowserSupabaseClient()
  const {
    description,
    setDescription,
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
  const id = useId()

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
      } catch (error: unknown) {
        if (error instanceof Error) {
          showMessage(error.message, 'error', 'destructive')
        }
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
      onSuccess()
    } catch (error: unknown) {
      if (error instanceof Error) {
        showMessage(
          error.message || 'An error occurred',
          'error',
          'destructive'
        )
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (!isDataLoaded) {
    return (
      <div className="flex place-content-center items-center h-80">
        <Spinner size={22} />
      </div>
    )
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-h-80 h-full relative overflow-y-scroll p-4 pt-0"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={id}>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id={id}
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
                <FormLabel htmlFor={id}>Description</FormLabel>
                <FormControl>
                  <Input
                    id={id}
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
