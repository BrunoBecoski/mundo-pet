'use client';

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export function AppointmentForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="brand">
          Novo Agendamento
        </Button>
      </DialogTrigger>

      <DialogContent 
        variant="appointment"
        overlayVariant="blurred"
        showCloseButton
      >
        <DialogHeader>
          <DialogTitle size="modal">
            Agende um atendimento
          </DialogTitle>

          <DialogDescription size="modal">
            Preencha os dados do cliente para realizar o agendamento:
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}