import { Skeleton } from "@/components/ui/skeleton"

export function PostListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul aria-hidden="true" className="flex flex-col gap-4">
      {Array.from({ length: count }, (_, index) => (
        <li key={index} className="border border-border/60 p-6">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="mt-3 h-8 w-3/4" />
          <Skeleton className="mt-3 h-4 w-full max-w-prose" />
          <Skeleton className="mt-2 h-4 w-2/3 max-w-prose" />
          <div className="mt-6 flex justify-between border-t border-border/60 pt-4">
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-24" />
          </div>
        </li>
      ))}
    </ul>
  )
}
