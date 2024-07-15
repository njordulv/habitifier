'use client'

import { useState, useEffect } from 'react'
import { useMessages } from '@/hooks/useMessage'
import { createClient } from '@/utils/supabase/client'
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { DaysOfWeek } from '@/components/habits/DaysOfWeek'

export const Form = () => {
  const supabase = createClient()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [repeat, setRepeat] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const { showMessage } = useMessages()

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserId(user?.id || null)
    }
    getUserId()
  }, [supabase.auth])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
        title,
        description,
        repeat,
        days: selectedDays,
      })
      if (error) throw error
      showMessage('Habit added successfully!', 'success', 'default')
    } catch (error: any) {
      showMessage(error.message || 'An error occurred', 'error', 'destructive')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-[380px]">
      <CardHeader>
        <CardTitle>Add your habit</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Repeat"
            value={repeat}
            onChange={(e) => setRepeat(e.target.value)}
            required
          />
          <div>
            <Label>Interval</Label>
            <DaysOfWeek
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
            />
          </div>
          <Button type="submit" variant="outline" disabled={isLoading}>
            {isLoading && <Spinner size={20} />} Add Habit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
