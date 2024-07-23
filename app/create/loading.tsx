import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <main className="flex flex-col items-center justify-start px-4 sm:px-24 py-6 gap-6">
      <div className="w-full max-w-[380px] flex flex-col p-6 gap-6 rounded-xl border bg-card">
        <div className="flex pb-12">
          <Skeleton className="h-8 w-full max-w-[56%] rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-12 rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="flex gap-2">
          <div className="flex flex-col w-[33%] gap-2">
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          <div className="flex flex-col w-[33%] gap-2">
            <Skeleton className="h-4 w-12 rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
          <div className="flex flex-col w-[33%] gap-2">
            <Skeleton className="h-4 w-16 rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-56 rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-24 rounded-md" />
          <Skeleton className="h-9 w-full rounded-md" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-56 rounded-md" />
          <Skeleton className="h-3 w-12 rounded-md" />
          <div className="flex gap-1">
            <Skeleton className="h-9 w-[14%] rounded-md" />
            <Skeleton className="h-9 w-[14%] rounded-md" />
            <Skeleton className="h-9 w-[14%] rounded-md" />
            <Skeleton className="h-9 w-[14%] rounded-md" />
            <Skeleton className="h-9 w-[14%] rounded-md" />
            <Skeleton className="h-9 w-[14%] rounded-md" />
            <Skeleton className="h-9 w-[14%] rounded-md" />
          </div>
        </div>
        <Skeleton className="h-9 w-full rounded-md" />
      </div>
    </main>
  )
}
