'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useMessages } from '@/hooks/useMessage'
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

export const Form = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [frequency, setFrequency] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { showMessage } = useMessages()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { data, error } = await supabase
        .from('habits')
        .insert({ name, description, frequency })
      if (error) throw error
      showMessage('Habit added successfully!', 'success', 'default')
    } catch (error: any) {
      setIsLoading(false)
      showMessage(error.message || 'An error occurred', 'error', 'destructive')
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          />
          <Button type="submit" variant="outline" disabled={isLoading}>
            {isLoading && <Spinner size={20} />} Add Habit
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
