'use client';

import { Dog, Phone, User } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FieldValues,
  Resolver,
  useForm
} from "react-hook-form";
import * as z from "zod";
import { IMaskInput } from "react-imask";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const asZodResolver = <T extends FieldValues>(
  schema: unknown,
): Resolver<T> => {
  return zodResolver(
    schema as Parameters<typeof zodResolver>[0],
  ) as Resolver<T>;
};

const appointmentFormSchema = z.object({
  ownerName: z.string().min(3, 'O nome do dono é obrigatório'),
  petName: z.string().min(3, 'O nome do pet é obrigatório'),
  phone: z.string().min(3, 'O telefone é obrigatório'),
  description: z.string().min(3, 'A descrição é obrigatória'),
})

type AppointmentFormValues = z.infer<typeof appointmentFormSchema>

export function AppointmentForm() {
  const form = useForm<AppointmentFormValues>({
    resolver: asZodResolver(appointmentFormSchema),
    defaultValues: {
      ownerName: '',
      petName: '',
      phone: '',
      description: '',
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
            <h2 className="text-title text-content-primary">
              Agende um atendimento
            </h2>
          </DialogTitle>

          <DialogDescription size="modal">
            <p className="text-paragraph-medium text-content-secondary">
              Preencha os dados do cliente para realizar o agendamento:
            </p>
          </DialogDescription>
        </DialogHeader>

        <form id="form-appointment" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="ownerName"
              render={({ field, fieldState }) => (
                <Field className="">
                  <FieldLabel
                    htmlFor="ownerName"
                    className="text-label-medium text-content-primary"
                  >
                    Nome do dono
                  </FieldLabel>

                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                      size={20}
                    />

                    <Input
                      id="ownerName"
                      className="pl-10"
                      placeholder="Bruno Becoski"
                      {...field}
                    />
                  </div>

                  {fieldState.invalid &&
                    <FieldError errors={[fieldState.error]} />
                  }
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="petName"
              render={({ field, fieldState }) => (
                <Field className="">
                  <FieldLabel
                    htmlFor="petName"
                    className="text-label-medium text-content-primary"
                  >
                    Nome do pet
                  </FieldLabel>

                  <div className="relative">
                    <Dog
                      className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                      size={20}
                    />

                    <Input
                      id="petName"
                      className="pl-10"
                      placeholder="Hannah"
                      {...field}
                    />
                  </div>

                  {fieldState.invalid &&
                    <FieldError errors={[fieldState.error]} />
                  }
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <Field className="">
                  <FieldLabel
                    htmlFor="phone"
                    className="text-label-medium text-content-primary"
                  >
                    Telefone
                  </FieldLabel>

                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 transform text-content-brand"
                      size={20}
                    />

                    <IMaskInput
                      id="phone"
                      className="pl-10 flex h-12 w-full rounded-md border border-border-primary bg-background-tertiary px-3 py-2 text-sm text-content-primary ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-content-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-0 focus-visible:ring-border-brand disabled:cursor-not-allowed disabled:opacity-50 hover:border-border-secondary focus:border-border-brand focus-visible:border-border-brand aria-invalid:ring-destructive/20 aria-invalid:border-destructive"
                      placeholder="(00) 0 0000-0000"
                      mask="(00) 0 0000-0000"
                      {...field}

                    />
                  </div>

                  {fieldState.invalid &&
                    <FieldError errors={[fieldState.error]} />
                  }
                </Field>
              )}
            />

            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field className="">
                  <FieldLabel
                    htmlFor="description"
                    className="text-label-medium text-content-primary"
                  >
                    Descrição do serviço
                  </FieldLabel>

                  <Textarea
                    id="description"
                    className="resize-none"
                    placeholder="Banho e tosa"
                    {...field}
                  />

                  {fieldState.invalid &&
                    <FieldError errors={[fieldState.error]} />
                  }
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