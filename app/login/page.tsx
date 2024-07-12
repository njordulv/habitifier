import { login, signup } from '@/app/login/actions'

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-between p-5 md:p-20 gap-6">
      <form>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="password"
            required
          />
        </div>
        <div>
          <button formAction={login}>Log in</button>
          <button formAction={signup}>Sign up</button>
        </div>
      </form>
    </main>
  )
}
