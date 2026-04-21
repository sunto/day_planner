import { CalendarIcon } from "@radix-ui/react-icons"
import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric"
})

function parseIsoDate(value) {
  if (!value) return undefined

  const [year, month, day] = value.split("-").map(Number)
  if (!year || !month || !day) return undefined

  return new Date(year, month - 1, day)
}

function toIsoDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

export function DatePicker({
  className,
  disabled = false,
  disabledDates,
  onChange,
  placeholder = "Pick a date",
  value
}) {
  const [open, setOpen] = useState(false)
  const selectedDate = useMemo(() => parseIsoDate(value), [value])
  const [visibleMonth, setVisibleMonth] = useState(selectedDate || new Date())

  useEffect(() => {
    setVisibleMonth(selectedDate || new Date())
  }, [selectedDate, open])

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          className={cn(
            "w-full justify-between rounded-2xl px-4 text-left font-normal",
            !selectedDate && "text-[var(--color-text-faint)]",
            className
          )}
          disabled={disabled}
          type="button"
          variant="outline"
        >
          <span>{selectedDate ? dateFormatter.format(selectedDate) : placeholder}</span>
          <CalendarIcon className="h-4 w-4 opacity-70" />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="start" className="w-auto p-0">
        <Calendar
          disabled={disabledDates}
          month={visibleMonth}
          mode="single"
          selected={selectedDate}
          onMonthChange={setVisibleMonth}
          onSelect={(nextDate) => {
            if (!nextDate) return

            onChange(toIsoDate(nextDate))
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
