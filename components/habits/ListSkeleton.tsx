import { Skeleton } from '@/components/ui/skeleton'

export const ListSkeleton = () => {
  const count = 2

  return (
    <div className="flex flex-col w-full max-w-[380px] gap-3">
      <Skeleton className="h-9 w-full rounded-md" />
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="border rounded-md p-6 flex gap-5 items-center justify-between"
        >
          <div className="flex items-center gap-5">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-24 rounded-md" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-28 sm:w-44 rounded-lg" />
              </div>
              <Skeleton className="h-4 w-28 sm:w-32 rounded-md" />
            </div>
          </div>
          <div>
            <div className="flex flex-col items-end justify-end gap-2">
              <Skeleton className="h-4 w-8 rounded-md" />
              <Skeleton className="h-4 w-12 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
