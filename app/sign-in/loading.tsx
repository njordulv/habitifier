import { Skeleton } from '@/components/ui/skeleton'
import { OrFill } from '@/components/auth/OrFill'

export default function loading() {
  return (
    <div className="w-full max-w-96 flex flex-col p-6 gap-6 rounded-xl border bg-card">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-full max-w-[60%] rounded-md" />
        <Skeleton className="h-4 w-full max-w-[72%] rounded-md" />
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 rounded-md" />
        <Skeleton className="h-9 rounded-md" />
        <OrFill />
      </div>
      <div className="flex flex-col gap-6 mt-1">
        <div className="space-y-3">
          <Skeleton className="h-4 w-[13%]" />
          <Skeleton className="h-9" />
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-[19%]" />
          <Skeleton className="h-9" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 rounded-md" />
      </div>
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-[54%]" />
        </div>
      </div>
    </div>
  )
}
