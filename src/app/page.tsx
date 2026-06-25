import { endOfDay, parseISO, startOfDay } from "date-fns";

import { prisma } from "@/lib/prisma";
import { groupAppointmentByPeriod } from "@/utils/appointments";
import { PeriodSection } from "@/components/period-section";
import { AppointmentForm } from "@/components/appointment-form";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";

// import { APPOINTMENTS_DATA } from "@/utils/mock-data";

type Params = Promise<{ date?: string }>

export default async function Home({
  searchParams,
}: {
  searchParams: Params
}) {
  const { date } = await searchParams

  const selectedDate = date ? parseISO(date) : new Date()

  const appointments = await prisma.appointment.findMany({
    where: {
      scheduleAt: {
        gte: startOfDay(selectedDate),
        lte: endOfDay(selectedDate),
      }
    },
    orderBy: {
      scheduleAt: 'asc',
    }
  })

  const periods = groupAppointmentByPeriod(appointments)

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-title text-content-primary mb-2">
            Sua Agenda
          </h1>
          <p className="text-paragraph-medium text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <DatePicker />
        </div>
      </div>

      <div className="mt-3 mb-8 md:hidden">
        <DatePicker />
      </div>

      <div className="pb-24">
        {periods.map(period =>
          <PeriodSection key={period.type} period={period} />
        )}
      </div>

      <div className="fixed right-0 bottom-0 left-0 flex justify-center bg-[#23242C] py-5 px-6 md:top-auto md:right-6 md:bottom-6 md:left-auto md:w-auto md:bg-transparent md:p-0">
        <AppointmentForm>
          <Button variant="brand">
            Novo Agendamento
          </Button>
        </AppointmentForm>
      </div>
    </div>
  );
}