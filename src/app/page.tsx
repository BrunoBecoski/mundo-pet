import { PeriodSection } from "@/components/period-section";
import { prisma } from "@/lib/prisma";
import { groupAppointmentByPeriod } from "@/utils/appointments";
import { APPOINTMENTS_DATA } from "@/utils/mock-data";

export default async function Home() {
  const appointment = await prisma.appointment.findMany()
  console.log(appointment)

  const periods = groupAppointmentByPeriod(APPOINTMENTS_DATA)

  return (
    <div className="bg-background-primary p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-title text-content-primary mb-2">
            Sua Agenda
          </h1>
          <p className="text-paragraph-medium text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>
      </div>

      <div className="pb-24 md:pb-0">
        {periods.map(period => 
          <PeriodSection key={period.type} period={period} />
        )}
      </div>
   </div>
  );
}