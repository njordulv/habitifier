// 'use client'

// import { supabase } from '@/lib/supabaseClient'
// import { useState, useEffect } from 'react'
// import { Spinner } from '@/components/ui/spinner'

// interface HabitProps {
//   user_id: number
//   name: string
// }

// export const List = () => {
//   const [habits, setHabits] = useState<HabitProps[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     fetchHabits()
//   }, [])

//   async function fetchHabits() {
//     try {
//       setIsLoading(true)
//       setError(null)
//       const { data, error } = await supabase.from('habits').select('*')
//       if (error) throw error
//       setHabits(data || [])
//     } catch (error) {
//       console.error('Error fetching habits:', error)
//       setError('Failed to fetch habits')
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center">
//         <Spinner />
//       </div>
//     )
//   if (error) return <p>Error: {error}</p>
//   if (habits.length === 0) return <p>No habits found.</p>

//   return (
//     <div className="w-full max-w-[380px] justify-center items-center">
//       <ul>
//         {habits &&
//           habits.map((habit: HabitProps, index: number) => (
//             <li key={habit.user_id}>
//               {index + 1}. {habit.name}
//             </li>
//           ))}
//       </ul>
//     </div>
//   )
// }
