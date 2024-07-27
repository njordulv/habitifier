import { Skeleton } from '@/components/ui/skeleton'

export const ListSkeleton = () => {
  const count = 1

  return (
    <div className="flex flex-col w-full max-w-[380px] gap-3">
      <Skeleton className="h-9 w-full rounded-md" />
      {[...Array(count)].map((_, index) => (
        <div
          key={index}
          className="border rounded-md p-5 flex gap-5 items-center justify-between"
        >
          <div className="grid grid-flow-row-dense grid-cols-[1fr_11fr_2fr] items-center gap-4">
            <Skeleton className="h-[30px] w-[30px] rounded-lg" />
            <div className="flex flex-col gap-2">
              <Skeleton className="sm:h-7 h-6 w-24 rounded-md" />
              <div className="flex flex-wrap">
                <Skeleton className="h-6 w-20 rounded-lg" />
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-4 w-10 rounded-lg" />
                </div>
              </div>
              <Skeleton className="h-4 w-24 rounded-lg" />
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
  )
}
