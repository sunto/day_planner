import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger
export const PopoverAnchor = PopoverPrimitive.Anchor

export function PopoverContent({ align = "center", className, portalled = true, sideOffset = 8, ...props }) {
  const content = (
    <PopoverPrimitive.Content
      align={align}
      className={cn(
        "z-50 w-72 rounded-[1.4rem] border border-[var(--color-border)] bg-white p-3 text-[var(--color-charcoal-blue)] shadow-[var(--shadow-soft)] outline-none data-[side=bottom]:animate-in data-[side=left]:animate-in data-[side=right]:animate-in data-[side=top]:animate-in",
        className
      )}
      sideOffset={sideOffset}
      {...props}
    />
  )

  if (!portalled) return content

  return (
    <PopoverPrimitive.Portal>
      {content}
    </PopoverPrimitive.Portal>
  )
}
