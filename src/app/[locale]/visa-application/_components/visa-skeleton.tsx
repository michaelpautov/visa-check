import { Skeleton } from "@/components/ui/skeleton";

export default function VisaSkeleton() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none bg-background m-4 space-y-4">
        <Skeleton className="h-8 w-8" /> {/* Back button */}
        <Skeleton className="h-2 w-full" /> {/* Progress bar */}
      </div>

      <main className="flex-1 overflow-auto px-4">
        {/* Title */}
        <Skeleton className="h-16 w-full mb-6" />
        
        {/* Form fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" /> {/* Label */}
            <Skeleton className="h-10 w-full rounded-md" /> {/* Select input */}
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-10 w-full rounded-md" /> {/* Select input */}
          </div>
        </div>
      </main>

      <div className="flex-none p-4 bg-background">
        <Skeleton className="h-10 w-full rounded-md" /> {/* Continue button */}
      </div>
    </div>
  );
}