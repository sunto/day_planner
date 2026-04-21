import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(38_70_83/0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-11 px-5",
        icon: "h-11 w-11"
      },
      variant: {
        ghost:
          "border border-[var(--color-border)] bg-white/55 text-[var(--color-charcoal-blue)] hover:border-[rgb(38_70_83_/_0.22)] hover:bg-[rgb(238_245_243_/_0.95)]",
        outline:
          "border border-[var(--color-border)] bg-white text-[var(--color-charcoal-blue)] hover:border-[rgb(38_70_83_/_0.22)] hover:bg-[rgb(238_245_243_/_0.98)]",
        primary:
          "bg-[var(--color-charcoal-blue)] text-white hover:bg-[var(--color-verdigris)]"
      }
    },
    defaultVariants: {
      size: "default",
      variant: "primary"
    }
  }
)

export function Button({ asChild = false, className, size, variant, ...props }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }))}
      {...props}
    />
  )
}
