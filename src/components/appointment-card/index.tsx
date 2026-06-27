'use client';

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Pen, Trash } from "lucide-react";

import { cn } from "@/lib/utils";
import type { AppointmentType } from "@/types/appointments";
import { AppointmentForm } from "@/components/appointment-form";
import { Button } from "@/components/ui/button";
import { deleteAppointment } from "@/app/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface AppointmentCardProps {
  appointment: AppointmentType;
  isFirstInSection?: boolean
}

export function AppointmentCard({ appointment, isFirstInSection = false }: AppointmentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    setIsDeleting(true)

    const result = await deleteAppointment(appointment.id)

    if (result?.error) {
      toast.error(result.error)
      setIsDeleting(false)
      return
    }

    toast.success('Agendamento removido com sucesso!')
    setIsDeleting(false)
  }

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
            {'/ ' + appointment.ownerName}
          </span>
        </div>
      </div>

      <div className="text-left pr-4 hidden md:block mt-1 md:mt-0 col-span-2 md:col-span-1">
        <span className="text-paragraph-small text-content-secondary">
          {appointment.description}
        </span>
      </div>

      <div className="text-right mt-2 md:mt-0 col-span-2 md:col-span-1 flex justify-end items-center gap-2">
        <AppointmentForm appointment={appointment}>
          <Button variant="edit" size="icon">
            <Pen />
          </Button>
        </AppointmentForm>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="remove" size="icon">
              <Trash />
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Remover agendamento
              </AlertDialogTitle>

              <AlertDialogDescription>
                Tem certeza que deseja remover este agendamento? 
                <br/>
                <strong>{appointment.petName}/{appointment.ownerName}</strong> ás <i>{appointment.time} horas</i>
                <br/>
                Esta ação não pode ser desfeita.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>
                Cancelar
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting && (
                  <Loader2
                    className="mr-2 size-4 animate-spin"
                  />
                )}
                Sim
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}