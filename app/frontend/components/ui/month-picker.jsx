import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"
import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric"
})

const monthLabelFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short"
})

const months = Array.from({ length: 12 }, (_, monthIndex) => ({
  monthIndex,
  label: monthLabelFormatter.format(new Date(2026, monthIndex, 1))
}))

function monthValueFromDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
}

function parseMonthValue(value) {
  if (!value) return undefined

  const [year, month] = value.split("-").map(Number)
  if (!year || !month) return undefined

  return new Date(year, month - 1, 1)
}

export function MonthPicker({
  className,
  disabled = false,
  onChange,
  placeholder = "Pick a month",
  value
}) {
  const [open, setOpen] = useState(false)
  const selectedMonth = useMemo(() => parseMonthValue(value), [value])
  const [displayYear, setDisplayYear] = useState(selectedMonth?.getFullYear() || new Date().getFullYear())

  useEffect(() => {
    setDisplayYear(selectedMonth?.getFullYear() || new Date().getFullYear())
  }, [selectedMonth])

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full justify-between rounded-2xl px-4 text-left font-normal",
            !selectedMonth && "text-[var(--color-text-faint)]",
            className
          )}
          disabled={disabled}
          type="button"
          variant="outline"
        >
          <span>{selectedMonth ? monthFormatter.format(selectedMonth) : placeholder}</span>
          <CalendarIcon className="h-4 w-4 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-[320px] p-4">
        <div className="flex items-center justify-between">
          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() => setDisplayYear((currentYear) => currentYear - 1)}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          <div className="text-sm font-semibold text-[var(--color-charcoal-blue)]">
            {displayYear}
          </div>

          <Button
            size="icon"
            type="button"
            variant="ghost"
            onClick={() => setDisplayYear((currentYear) => currentYear + 1)}
          >
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {months.map((month) => {
            const isSelected =
              selectedMonth?.getFullYear() === displayYear && selectedMonth?.getMonth() === month.monthIndex

            return (
              <button
                className={cn(
                  "rounded-xl border px-3 py-3 text-sm font-medium transition",
                  isSelected
                    ? "border-[var(--color-charcoal-blue)] bg-[var(--color-charcoal-blue)] text-white"
                    : "border-[var(--color-border)] bg-white text-[var(--color-charcoal-blue)] hover:bg-[var(--color-panel)]"
                )}
                key={`${displayYear}-${month.monthIndex}`}
                type="button"
                onClick={() => {
                  onChange(monthValueFromDate(new Date(displayYear, month.monthIndex, 1)))
                  setOpen(false)
                }}
              >
                {month.label}
              </button>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
