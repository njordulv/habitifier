import { Skeleton } from '@/components/ui/skeleton'

export const ListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 items-center justify-center w-full max-w-[380px]">
      <Skeleton className="h-32 w-full border rounded-md" />
      <Skeleton className="h-32 w-full border rounded-md" />
    </div>
  )
}
