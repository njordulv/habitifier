import { Skeleton } from '@/components/ui/skeleton'

export default function NavSkeleton() {
  return (
    <div className="flex gap-2 items-center justify-center w-full p-2">
      <Skeleton className="h-9 w-20 rounded-md" />
      <Skeleton className="h-9 w-20 rounded-md" />
    </div>
  )
}
