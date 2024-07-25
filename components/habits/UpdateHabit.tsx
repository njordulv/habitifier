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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { DayTime } from '@/components/habits/DayTime'
import { DailyGoal } from '@/components/habits/DailyGoal'
import { GoalUnits } from '@/components/habits/GoalUnits'
import { HabitIcons } from '@/components/habits/HabitIcons'
import { HabitColor } from '@/components/habits/HabitColor'
import { Notification } from '@/components/habits/Notification'

const FormSchema = z.object({
  name: z.string().min(3, 'Name is required').max(60, 'Name is too long'),
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
    units,
    setUnits,
    color,
    icon,
    sound,
    timeOfDay,
  } = useCreateHabitStore()
  const { showMessage } = useMessages()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
    },
  })

  const { reset, setValue } = form

  useEffect(() => {
    const fetchHabit = async () => {
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('id', habitId)
        .single()

      if (error) {
        showMessage(error.message, 'error', 'destructive')
        return
      }

      reset(data)
      setDescription(data.description)
      setUnits(data.units)
      setValue('name', data.name)
    }

    fetchHabit()
  }, [
    habitId,
    reset,
    supabase,
    setDescription,
    setUnits,
    setValue,
    showMessage,
  ])

  const updateTask = async (values: FormData) => {
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('habits')
        .update({
          name: values.name,
          description,
          goal,
          units,
          color,
          icon,
          sound,
          time_of_day: timeOfDay,
        })
        .eq('id', habitId)

      if (error) throw error
      showMessage('Habit successfully updated', 'success', 'default')
    } catch (error: any) {
      showMessage(error.message, 'error', 'destructive')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <FormProvider {...form}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(updateTask)}
          className="flex flex-col gap-4 px-4"
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
                    type="text"
                    placeholder="Drink some water"
                    autoComplete="name"
                    error={!!form.formState.errors.name}
                  />
                </FormControl>
                <FormMessage className="absolute !m-0">
                  {form.formState.errors.name?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
          <Button variant="outline" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size={18} /> : 'Save'}
          </Button>
        </form>
      </Form>
    </FormProvider>
  )
}
