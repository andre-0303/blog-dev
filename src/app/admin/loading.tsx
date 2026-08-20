import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="h-10 w-56" />
      <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <div key={index} className="bg-background p-5">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="mt-3 h-9 w-12" />
          </div>
        ))}
      </div>
      <Skeleton className="h-64 w-full" />
      <span className="sr-only">Carregando painel…</span>
    </div>
  )
}
