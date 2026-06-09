import { Cloudy, Moon, Sun } from "lucide-react";

import { AppointmentCard } from "@/components/appointment-card";
import type { AppointmentPeriodType } from "@/types/appointments";

const periodIcons = {
  morning: <Sun  className="text-accent-blue"/>,
  afternoon: <Cloudy className="text-accent-orange" />,
  evening: <Moon className="text-accent-yellow" />,
}

type PeriodSectionProps = {
  period: AppointmentPeriodType
}

export function PeriodSection({ period }: PeriodSectionProps) {
  return (
    <section className="mb-8 bg-background-tertiary rounded-xl">
      <div className="flex items-center px-5 py-3 justify-between border-b border-border-divisor"> 
        <div className="flex items-center gap-2">
          {periodIcons[period.type]}
          <h2 className="text-label-large text-content-primary">
            {period?.title}
          </h2>
        </div>

        <span className="text-label-large text-content-secondary">
          {period.timeRange}
        </span>
      </div>
      
      {period.appointments.length > 0 ? (
        <div className="px-5"> 
          {period.appointments.map((appointment, index) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              isFirstInSection={index === 0}
            />
          ))}
        </div>
        ) : (
          <p>Nenhum agendamento para este período</p>
      )}
    </section>
  )
}