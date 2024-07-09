import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@supabase/supabase-js'
import { ListUsersParams } from '@/interfaces'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'email',
          type: 'email',
          required: true,
        },
        password: {
          label: 'password',
          type: 'password',
          required: true,
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Missing email or password')
        }

        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          })

          if (error) throw error

          if (data.user) {
            return {
              id: data.user.id,
              email: data.user.email,
              name: data.user.user_metadata.full_name,
            }
          } else {
            return null
          }
        } catch (error: any) {
          console.error('Error during Supabase authentication:', error)
          throw new Error(
            error.message || 'Error during Supabase authentication'
          )
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' || account?.provider === 'github') {
        const email = user.email ?? ''
        const name = user.name ?? ''

        try {
          // Checking existing user in auth.users
          const { data: authUser, error: authError } =
            await supabaseAdmin.auth.admin.listUsers({
              filter: {
                email: email,
              },
            } as ListUsersParams)

          if (authError) {
            console.error('Error checking auth user in Supabase:', authError)
            return false
          }

          let userId

          if (authUser && authUser.users.length > 0) {
            // User exists, refreshing metadata
            userId = authUser.users[0].id
            const { error: updateError } =
              await supabaseAdmin.auth.admin.updateUserById(userId, {
                user_metadata: { full_name: name },
                app_metadata: { provider: account.provider },
              })

            if (updateError) {
              console.error(
                'Error updating auth user in Supabase:',
                updateError
              )
              return false
            }
          } else {
            // User doesn't exist, creating a new one
            const { data: newUser, error: createError } =
              await supabaseAdmin.auth.admin.createUser({
                email: email,
                email_confirm: true,
                user_metadata: { full_name: name },
                app_metadata: { provider: account.provider },
              })

            if (createError) {
              console.error(
                'Error creating auth user in Supabase:',
                createError
              )
              return false
            }

            userId = newUser.user.id
          }
          // Checking/refreshing data in the 'users' table
          const { data: existingUser, error: fetchError } = await supabaseAdmin
            .from('users')
            .select('*')
            .eq('email', email)
            .single()

          if (fetchError && fetchError.code !== 'PGRST116') {
            console.error('Error fetching user from users table:', fetchError)
            return false
          }

          if (existingUser) {
            // Refreshing existing user
            const { error: updateError } = await supabaseAdmin
              .from('users')
              .update({
                full_name: name,
                // Not refreshing id as it already exists & can be of another type
              })
              .eq('email', email)

            if (updateError) {
              console.error('Error updating user in users table:', updateError)
              return false
            }
          } else {
            // Creating new user
            const { error: insertError } = await supabaseAdmin
              .from('users')
              .insert([
                {
                  // Not turning on id, let Supabase generate it automatically
                  email: email,
                  full_name: name,
                  created_at: new Date().toISOString(),
                },
              ])

            if (insertError) {
              console.error('Error creating user in users table:', insertError)
              return false
            }
          }

          return true // Auth success
        } catch (error) {
          console.error('Error during Supabase user creation/update:', error)
          return false
        }
      }

      return true // For other providers
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}
