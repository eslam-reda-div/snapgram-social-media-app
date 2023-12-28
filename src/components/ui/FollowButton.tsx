import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { useFollow, useUnFollow } from "@/lib/react-query/queries"
import { useFollowContext } from "@/context/FollowContext"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        destructive:
          "bg-red-500 text-slate-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-100/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80",
        ghost: "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  currentUser?: any
  user?: any
}

const FollowButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ currentUser, user, className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const { mutate: follow } = useFollow();
    const { mutate: unFollow } = useUnFollow();
    const { follow: isFollowed , followUser} = useFollowContext()
    const [isFollowed2, setIsFollowed2] = React.useState(currentUser?.follow?.includes(user.$id) || isFollowed?.includes(user.$id))

    if (isFollowed2 || (currentUser?.follow?.includes(user.$id) || isFollowed?.includes(user.$id))) {
      return (
        <Comp
          className={cn(buttonVariants({ variant, size, className }))}
          onClick={() => {
            unFollow({ currentUser: currentUser?.id, user: user?.$id})
            followUser((prev) => prev.filter((id) => id !== user.$id))
            setIsFollowed2(false)
          }}
          ref={ref}
          {...props}
        >
          Unfollow
        </Comp>
      )
    }else{
      return (
        <Comp
          onClick={() => {
            follow({ currentUser: currentUser?.id, user: user?.$id})
            followUser((prev) => [...prev, user.$id])
            setIsFollowed2(true)
          }}
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          {...props}
        />
      )
    }

  }
)
FollowButton.displayName = "Button"

export { FollowButton, buttonVariants }
