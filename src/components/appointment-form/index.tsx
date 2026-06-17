'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { IMaskInput } from "react-imask";
import { format, setHours, setMinutes, startOfToday } from "date-fns";
import * as z from "zod";
import { toast } from "sonner";
import {
  Controller,
  FieldValues,
  Resolver,
  useForm
} from "react-hook-form";
import {
  ChevronDownIcon,
  Dog,
  Phone,
  User,
  Calendar as CalendarIcon,
  Clock,
  Loader2
} from "lucide-react";

import { createAppointment } from "@/app/actions";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  scheduleAt: z.date({
    error: 'A data é obrigatória'
  }).min(startOfToday(), {
    message: 'A data não pode ser no passado'
  }),
  time: z.string().min(1, 'A hora é obrigatória')
}).refine(
  (data) => {
    const [hour, minute] = data.time.split(':')
    const scheduleDateTime = setMinutes(
      setHours(data.scheduleAt, Number(hour)),
      Number(minute)
    )

    return scheduleDateTime > new Date()
  }, {
  path: ['time'],
  error: 'O horário não pode set no passado',
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
      scheduleAt: undefined,
      time: '',
    }
  })

  async function onSubmit(data: AppointmentFormValues) {
    const [hour, minute] = data.time.split(':')

    data.scheduleAt.setHours(Number(hour), Number(minute), 0, 0)

    await createAppointment(data)

    toast.success('Agendamento criado com sucesso!')
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
            <span className="text-content-primary">
              Agende um atendimento
            </span>
          </DialogTitle>

          <DialogDescription size="modal">
            <span className="text-content-secondary">
              Preencha os dados do cliente para realizar o agendamento:
            </span>
          </DialogDescription>
        </DialogHeader>

        <form id="form-appointment" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              control={form.control}
              name="ownerName"
              render={({ field, fieldState }) => (
                <Field>
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
                <Field>
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
                <Field>
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
                <Field>
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

            <div className="space-y-5 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 ">
              <Controller
                control={form.control}
                name="scheduleAt"
                render={({ field, fieldState }) => (
                  <Field className="flex flex-col">
                    <FieldLabel
                      htmlFor="scheduleAt"
                      className="text-label-medium text-content-primary"
                    >
                      Data
                    </FieldLabel>

                    <Popover>
                      <PopoverTrigger>
                        <Button
                          variant="outline"
                          type="button"
                          className={cn(
                            'w-full justify-between text-left font-normal bg-background-tertiary border-border-primary text-content-primary hover:bg-background-tertiary hover:border-border-secondary hover:text-content-primary focus-visible:ring-offset-0 focus-visible:ring-1 focus-visible:ring-border-brand focus:border-border-brand focus-visible:border-border-brand',
                            !field.value && 'text-content-secondary'
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <CalendarIcon
                              className="text-content-brand"
                              size={20}
                            />
                            {field.value
                              ? (format(field.value, 'dd/MM/yyyy'))
                              : (<span>Selecione uma data</span>)}
                          </div>

                          <ChevronDownIcon
                            className="opacity-50"
                            size={16}
                          />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < startOfToday()}
                        />
                      </PopoverContent>
                    </Popover>

                    {fieldState.invalid &&
                      <FieldError errors={[fieldState.error]} />
                    }
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="time"
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel
                      htmlFor="scheduleAt"
                      className="text-label-medium text-content-primary"
                    >
                      Hora
                    </FieldLabel>

                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          <Clock
                            className="text-content-brand"
                            size={16}
                          />
                          <SelectValue placeholder="--:--" />
                        </div>
                      </SelectTrigger>

                      <SelectContent>
                        {TIME_OPTIONS.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}

                      </SelectContent>
                    </Select>

                    {fieldState.invalid &&
                      <FieldError errors={[fieldState.error]} />
                    }
                  </Field>
                )}
              />
            </div>
          </FieldGroup>
        </form>

        <div className="flex justify-end mt-5">
          <Button
            type="submit"
            form="form-appointment"
            variant="brand"
            className="uppercase"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className=" animate-spin" size={16} />
            )}

            Agendar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function generateTimeOptions(): string[] {
  const times = []

  for (let hour = 9; hour <= 21; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 21 && minute > 0) break;
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      times.push(timeString)
    }
  }

  return times
}

const TIME_OPTIONS = generateTimeOptions()