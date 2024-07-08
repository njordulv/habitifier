import type { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { createClient } from '@supabase/supabase-js'

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
          // Попытка создать пользователя в Supabase Auth
          const { data, error } = await supabaseAdmin.auth.admin.createUser({
            email: email,
            email_confirm: true,
            user_metadata: { full_name: name },
            app_metadata: { provider: account.provider },
          })

          if (error && error.message !== 'User already registered') {
            console.error('Error creating user in Supabase:', error)
            return false
          }

          // Если пользователь уже существует или был успешно создан
          if (
            data.user ||
            (error && error.message === 'User already registered')
          ) {
            // Проверка/создание записи в таблице 'users'
            const { data: existingUser, error: fetchError } = await supabase
              .from('users')
              .select('*')
              .eq('email', email)
              .single()

            if (fetchError && fetchError.code !== 'PGRST116') {
              throw fetchError
            }

            if (!existingUser) {
              const { error: insertError } = await supabase
                .from('users')
                .insert([
                  {
                    email: email,
                    full_name: name,
                    created_at: new Date().toISOString(),
                  },
                ])

              if (insertError) {
                throw insertError
              }
            }
          }
        } catch (error) {
          console.error('Error during Supabase user creation/insert:', error)
          return false
        }
      }

      return true
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
