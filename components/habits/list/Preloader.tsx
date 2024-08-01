import { Skeleton } from '@/components/ui/skeleton'

export const Preloader = () => {
  const count = 1

  return (
    <section className="flex flex-col items-start min-h-screen">
      <div className="flex flex-col w-full max-w-96 gap-3">
        <Skeleton className="h-9 w-[70%] m-auto rounded-md mb-3" />
        <Skeleton className="h-9 w-full rounded-md" />
        {[...Array(count)].map((_, index) => (
          <div
            key={index}
            className="border rounded-md p-5 flex gap-5 items-center justify-between"
          >
            <div className="grid grid-flow-row-dense grid-cols-[1fr_11fr_2fr] items-center gap-4">
              <Skeleton className="h-8 w-8 rounded-lg" />
              <div className="flex flex-col gap-3">
                <Skeleton className="sm:h-7 h-6 w-24 rounded-md" />
                <div className="flex flex-wrap">
                  <Skeleton className="h-6 w-20 rounded-lg" />
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1 items-center">
                    <Skeleton className="h-5 w-5 rounded-md" />
                    <Skeleton className="h-4 w-10 rounded-md" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end h-full justify-between gap-2">
                <div className="flex flex-col gap-3">
                  <Skeleton className="h-6 w-5 rounded-md" />
                  <Skeleton className="h-6 w-5 rounded-md" />
                </div>
                <Skeleton className="h-4 w-5 rounded-md" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
