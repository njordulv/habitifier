'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { useMessages } from '@/hooks/useMessage'
import { createClient } from '@/utils/supabase/client'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'
import { NamesOfWeek } from './NamesOfWeek'
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
import { Spinner } from '@/components/ui/spinner'
import { DayTime } from '@/components/habits/DayTime'
import { DailyGoal } from '@/components/habits/DailyGoal'
import { GoalUnits } from '@/components/habits/GoalUnits'
import { DaysOfWeek } from '@/components/habits/DaysOfWeek'
import { HabitIcons } from '@/components/habits/HabitIcons'
import { HabitColor } from '@/components/habits/HabitColor'
import { Reminder } from '@/components/habits/Reminder'
import { Notification } from '@/components/habits/Notification'

const FormSchema = z.object({
  name: z.string().min(3, 'Name is required').max(60, 'Name is too long'),
  days_of_week: z.array(z.string()).min(1, 'At least one day is required'),
})

type FormData = z.infer<typeof FormSchema>

const formatTime = (timeString: string | null | undefined): string | null => {
  if (!timeString) return null

  const date = new Date(timeString)
  if (isNaN(date.getTime())) {
    console.error('Invalid time string:', timeString)
    return null
  }

  return date.toISOString().substring(11, 19)
}

export const CreateForm = () => {
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

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      days_of_week: weekDays,
    },
  })

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserId(user?.id || null)
    }
    getUserId()
  }, [supabase.auth])

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

      const formattedReminder = reminder.map(
        (r) => formatTime(r?.toISOString()) as string
      )

      const { data, error } = await supabase.from('habits').insert({
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
    } catch (error: any) {
      showMessage(error.message || 'An error occurred', 'error', 'destructive')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-[380px]">
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
