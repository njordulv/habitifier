'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { useMessages } from '@/hooks/useMessage'
import { createClient } from '@/utils/supabase/client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { DaysOfWeek } from '@/components/habits/DaysOfWeek'
import { DayTime } from '@/components/habits/DayTime'
import { DailyGoal } from '@/components/habits/DailyGoal'

const FormSchema = z.object({
  name: z.string().min(3, 'Name is required').max(60, 'Name is too long'),
})

type FormData = z.infer<typeof FormSchema>

export const CreateForm = () => {
  const supabase = createClient()
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  )
  const [goal, setGoal] = useState(1)
  const { showMessage } = useMessages()

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
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

      const { data, error } = await supabase.from('habits').insert({
        user_id: userId,
        name: values.name,
        description,
        days: selectedDays.join(', '),
        time_of_day: selectedTime,
        daily_goal: goal,
      })
      if (error) throw error
      showMessage('Habit successfully saved', 'success', 'default')
      form.reset()
      setDescription('')
    } catch (error: any) {
      showMessage(error.message || 'An error occurred', 'error', 'destructive')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-[380px]">
      <CardHeader>
        <CardTitle>Create your habit</CardTitle>
      </CardHeader>
      <CardContent>
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Drink some water"
                      error={!!form.formState.errors.name}
                    />
                  </FormControl>
                  <FormMessage className="absolute !m-0" />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Optional"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="Daily Goal"
              render={() => (
                <FormItem>
                  <FormLabel>Daily Goal</FormLabel>
                  <FormControl>
                    <DailyGoal goal={goal} setGoal={setGoal} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="time of the day"
              render={() => (
                <FormItem>
                  <FormLabel>Time of the day</FormLabel>
                  <FormControl>
                    <DayTime
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              name="Interval"
              render={() => (
                <FormItem>
                  <FormLabel>Interval</FormLabel>
                  <FormControl>
                    <DaysOfWeek
                      selectedDays={selectedDays}
                      setSelectedDays={setSelectedDays}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              variant="outline"
              disabled={isLoading}
              icon={isLoading && <Spinner size={18} />}
            >
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
