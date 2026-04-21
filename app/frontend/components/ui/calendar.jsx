import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"

export function Calendar({ className, classNames, showOutsideDays = true, ...props }) {
  const showsDropdownCaption = ["dropdown", "dropdown-months", "dropdown-years"].includes(props.captionLayout)

  return (
    <DayPicker
      className={cn("p-3", className)}
      classNames={{
        root: "w-full",
        months: "flex flex-col",
        month_caption: "relative flex min-h-12 items-center justify-center gap-2 px-14 pt-2 pb-4",
        caption_label: showsDropdownCaption ? "sr-only" : "text-sm font-semibold text-[var(--color-charcoal-blue)]",
        nav: "absolute inset-x-0 top-1 z-10 flex items-center justify-between px-2",
        button_previous:
          "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-charcoal-blue)] shadow-sm transition hover:bg-[var(--color-panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(38_70_83/0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        button_next:
          "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-[var(--color-charcoal-blue)] shadow-sm transition hover:bg-[var(--color-panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(38_70_83/0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        dropdowns: "flex items-center gap-2",
        dropdown_root: "relative",
        dropdown:
          "h-8 rounded-full border border-[var(--color-border)] bg-white px-3 text-sm font-medium text-[var(--color-charcoal-blue)] outline-none",
        month_grid: "w-full border-collapse",
        weekday:
          "pb-2 text-center text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-faint)]",
        week: "mt-1",
        day: "p-0 text-center align-middle",
        day_button:
          "mx-auto flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium text-[var(--color-charcoal-blue)] transition hover:bg-[var(--color-panel)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(38_70_83/0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-white aria-selected:bg-[var(--color-charcoal-blue)] aria-selected:text-white",
        today: "text-[var(--color-verdigris)]",
        outside: "text-[var(--color-text-faint)] opacity-45",
        disabled: "opacity-35",
        selected: "",
        hidden: "invisible",
        range_start: "",
        range_middle: "",
        range_end: "",
        ...classNames
      }}
      components={{
        Chevron: ({ className: chevronClassName, orientation, ...componentProps }) =>
          orientation === "left" ? (
            <ChevronLeftIcon className={cn("h-4 w-4", chevronClassName)} {...componentProps} />
          ) : orientation === "right" ? (
            <ChevronRightIcon className={cn("h-4 w-4", chevronClassName)} {...componentProps} />
          ) : (
            <ChevronDownIcon className={cn("h-4 w-4", chevronClassName)} {...componentProps} />
          )
      }}
      showOutsideDays={showOutsideDays}
      {...props}
    />
  )
}
