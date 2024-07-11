'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export const Form = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [frequency, setFrequency] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const { data, error } = await supabase
        .from('habits')
        .insert({ name, description, frequency })
      if (error) throw error
      alert('Habit added successfully!')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Frequency"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
      />
      <button type="submit">Add Habit</button>
    </form>
  )
}
