import { cn } from "@/lib/utils"
/**
 * Skeleton Loading animation for project list
 *
 * @author  Kevin Yu <yu.kevin2002@gmail.com>
 * @date    March 2024
 */

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
