import { cn } from "@/lib/utils";
import type { AppointmentType } from "@/types/appointments";

interface AppointmentCardProps {
  appointment: AppointmentType;
  isFirstInSection?: boolean
}

export function AppointmentCard({ appointment, isFirstInSection = false }: AppointmentCardProps) {
  return (
    <div className={cn(
      "grid grid-cols-2 md:grid-cols-[15%_35%_30%_20%] items-center py-3",
      !isFirstInSection && 'border-t border-border-divisor'
    )}>
      <div className="text-left pr-4 md:pr-0">
        <span className="text-label-small text-content-primary font-semibold">
          {appointment.time}
        </span>
      </div>

      <div className="text-right md:text-left md:pr-4">
        <div className="flex items-center gap-1 justify-end md:justify-start">
          <span className="text-paragraph-small text-content-primary font-semibold">
            {appointment.petName}
          </span>
          <span className="text-paragraph-small text-content-secondary font-semibold">
            {'/ ' + appointment.tutorName}
          </span>
        </div>
      </div>
      
      <div className="text-left pr-4 hidden md:block mt-1 md:mt-0 col-span-2 md:col-span-1">
        <span className="text-paragraph-small text-content-secondary">
          {appointment.description}
        </span>
      </div>
    </div>
  )
}