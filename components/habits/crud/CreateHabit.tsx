'use client'

import dynamic from 'next/dynamic'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { useState, useEffect, useId } from 'react'
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
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card'
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

export const CreateHabit = () => {
  const supabase = createClient()
  const {
    description,
    setDescription,
    goal,
    units,
    color,
    icon,
    sound,
    timeOfDay,
    reminder,
    weekDays,
    resetForm,
    resetSound,
  } = useCreateHabitStore()
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const { showMessage } = useMessages()
  const id = useId()

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      days_of_week: weekDays,
    },
  })

  useEffect(() => {
    form.reset({
      name: '',
      days_of_week: [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ],
    })
    resetForm()
    resetSound()

    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserId(user?.id || null)
    }
    getUserId()
  }, [supabase.auth, form, resetForm, resetSound])

  const onSubmit = async (values: FormData) => {
    setIsLoading(true)

    if (!userId) {
      showMessage('User not authenticated', 'error', 'destructive')
      setIsLoading(false)
      return
    }

    try {
      const { data: userExists, error: userCheckError } = await supabase
        .from('users')
        .select('id')
        .eq('id', userId)
        .single()

      if (userCheckError || !userExists) {
        const { error: insertError } = await supabase
          .from('users')
          .insert({ id: userId })

        if (insertError) throw insertError
      }

      const formattedReminder = reminder
        .map((r) => (r ? formatTimeForDB(r) : null))
        .filter(Boolean) as string[]

      const { error } = await supabase.from('habits').insert({
        user_id: userId,
        name: values.name,
        description,
        goal,
        units,
        color,
        icon,
        sound,
        reminder: formattedReminder,
        time_of_day: timeOfDay,
        days: values.days_of_week,
      })
      if (error) throw error
      showMessage('Habit successfully saved', 'success', 'default')
      form.reset()
      resetForm()
      resetSound()
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

  return (
    <Card className="w-full max-w-96">
      <CardHeader>
        <CardTitle>Create new habit</CardTitle>
      </CardHeader>
      <CardContent>
        <FormProvider {...form}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
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
                <div className="form-label">
                  Choose preferred time of the day
                </div>
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
              <Button
                type="submit"
                variant="outline"
                disabled={isLoading}
                icon={isLoading && <Spinner size={18} />}
              >
                Create
              </Button>
            </form>
          </Form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}
