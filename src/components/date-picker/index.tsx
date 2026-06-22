"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addDays, format, isValid } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronDown, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function DatePicker() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const dataParam = searchParams.get('date')

  const getInitialDate = useCallback(() => {
    if (!dataParam) return

    const [year, month, day] = dataParam.split('-').map(Number)

    const parsedDate = new Date(year, month - 1, day)

    if (!isValid(parsedDate)) return new Date()

    return parsedDate
  }, [dataParam])

  const [date, setDate] = useState<Date | undefined>(getInitialDate)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  function updateURLWithDate(selectedDate: Date | undefined) {
    if (!selectedDate) return

    const newParams = new URLSearchParams(searchParams.toString())
    newParams.set('date', format(selectedDate, 'yyyy-MM-dd'))
    router.push(`${pathname}?${newParams.toString()}`)
  }

  function handleNavigateDay(day: number) {
    const newDate = addDays(date || new Date, day)
    updateURLWithDate(newDate)
  }

  useEffect(() => {
    const newDate = getInitialDate()

    if (date?.getTime() !== newDate?.getTime()) {
      setDate(newDate)
    }
  }, [date, getInitialDate])

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={() => handleNavigateDay(-1)}
      >
        <ChevronLeft className="size-4" />
      </Button>

      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
      >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-min[180px] justify-between text-left font-normal bg-transparent border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand"
          >
            <div className="flex items-center gap-2">
              <CalendarIcon className="size-4 text-content-brand" />
              <span>
                {date
                  ? format(date, 'PPP', { locale: ptBR })
                  : 'Selecione uma data'
                }
              </span>
            </div>
            <ChevronDown className="size-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent>
          <Calendar />
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        onClick={() => handleNavigateDay(1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  )
}