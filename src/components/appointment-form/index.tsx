'use client';

import { 
  Controller,
  FieldValues,
  Resolver,
  useForm
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Input } from "../ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

const asZodResolver = <T extends FieldValues>(
  schema: unknown,
): Resolver<T> => {
  return zodResolver(
    schema as Parameters<typeof zodResolver>[0],
  ) as Resolver<T>;
};

const appointmentFormSchema = z.object({
  ownerName: z.string().min(3, 'O nome do dono é obrigatório'),
  // petName: z.string().min(3, 'O nome do pet é obrigatório'),
  // phone: z.string().min(3, 'O telefone é obrigatório'),
  // description: z.string().min(3, 'A descrição é obrigatória'),
})

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>

export function AppointmentForm() {
  const form = useForm<AppointmentFormValues>({
    resolver: asZodResolver(appointmentFormSchema),
    defaultValues: {
      ownerName: '',
      // petName: '',
      // phone: '',
      // description: '',
    }
  })

  function onSubmit(data: AppointmentFormValues) {
    console.log(data)
  }

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
        
        <form id="form-appointment" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
            control={form.control}
              name="ownerName"
              render={({ field }) => (
                <Field>
                  <FieldLabel htmlFor="ownerName">
                    Nome do dono
                  </FieldLabel>

                  <Input
                    id="ownerName"
                    placeholder="Bruno Becoski"
                    {...field}
                   />
                </Field>
              )}
            />
          </FieldGroup>

        <Field>
          <Button type="submit" form="form-appointment" variant="brand">
            Agendar
          </Button>
        </Field>
        </form>

      </DialogContent>
    </Dialog>
  )
}