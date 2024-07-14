import { AddHabit } from './AddHabit'

interface Props {
  data: any
}

export const Hero = ({ data }: Props) => {
  return (
    <section className="relative grid min-h-screen place-content-center overflow-hidden bg-background mt-[-52px] py-20">
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div>
          <h1>Profile</h1>
          <h2>Hello {data.user.email}</h2>
        </div>
        <div className="max-w-lg text-center text-base leading-relaxed">
          <AddHabit />
        </div>
      </div>
    </section>
  )
}