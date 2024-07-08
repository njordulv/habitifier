import { Skeleton } from '@/components/ui/skeleton'
import { OrFill } from '@/components/auth/OrFill'

export default function loading() {
  return (
    <main className="flex flex-col items-center justify-between p-5 md:p-24 gap-6">
      <div className="w-full max-w-[380px] flex flex-col p-6 gap-6 rounded-xl border">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-full max-w-[40%] rounded-md" />
          <Skeleton className="h-4 w-full max-w-[43%] rounded-md" />
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
            <Skeleton className="h-4 w-[13%]" />
            <Skeleton className="h-9" />
          </div>
          <div className="space-y-3">
            <Skeleton className="h-4 w-[20%]" />
            <Skeleton className="h-9" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-9 rounded-md" />
        </div>
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    </main>
  )
}
