'use client'

import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import {
  createTicket,
  updateTicket,
  type Ticket,
} from '@/lib/actions/tickets'
import { DIET_OPTIONS, MEAL_TIME_OPTIONS } from '@/lib/constants'
import { i18n } from '@/lib/i18n'

const ticketFormSchema = z.object({
  patientName: z
    .string()
    .min(1, i18n.ticketForm.validation.patientNameRequired),
  patientId: z.string().min(1, i18n.ticketForm.validation.patientIdRequired),
  room: z.string().min(1, i18n.ticketForm.validation.roomRequired),
  diet: z.string().min(1, i18n.ticketForm.validation.dietRequired),
  birthDate: z.string().min(1, i18n.ticketForm.validation.birthDateRequired),
  mealTime: z.string().min(1, i18n.ticketForm.validation.mealTimeRequired),
})

type TicketFormValues = z.infer<typeof ticketFormSchema>

interface TicketFormProps {
  ticket?: Ticket | null
  onSuccess: () => void
}

export function TicketForm({ ticket, onSuccess }: TicketFormProps) {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: {
      patientName: ticket?.patientName || '',
      patientId: ticket?.patientId || '',
      room: ticket?.room || '',
      diet: ticket?.diet || '',
      birthDate: ticket ? format(new Date(ticket.birthDate), 'yyyy-MM-dd') : '',
      mealTime: ticket?.mealTime || '',
    },
  })

  const dietValue = watch('diet')
  const mealTimeValue = watch('mealTime')

  const onSubmit: SubmitHandler<TicketFormValues> = async (data) => {
    const action = ticket ? updateTicket(ticket.id, data) : createTicket(data)
    const result = await action

    if (result?.error) {
      toast({
        variant: 'destructive',
        title: i18n.ticketForm.errorTitle,
        description:
          typeof result.error === 'string'
            ? result.error
            : i18n.ticketForm.genericError,
      })
    } else {
      toast({
        title: i18n.ticketForm.successTitle,
        description: ticket
          ? i18n.ticketForm.ticketUpdatedSuccess
          : i18n.ticketForm.ticketCreatedSuccess,
      })
      onSuccess()
      reset()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="patientName" className="text-right">
          {i18n.ticketForm.patientNameLabel}
        </Label>
        <div className="col-span-3">
          <Input id="patientName" {...register('patientName')} />
          {errors.patientName && (
            <p className="mt-1 text-sm text-destructive">
              {errors.patientName.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="patientId" className="text-right">
          {i18n.ticketForm.patientIdLabel}
        </Label>
        <div className="col-span-3">
          <Input id="patientId" {...register('patientId')} />
          {errors.patientId && (
            <p className="mt-1 text-sm text-destructive">
              {errors.patientId.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="room" className="text-right">
          {i18n.ticketForm.roomLabel}
        </Label>
        <div className="col-span-3">
          <Input id="room" {...register('room')} />
          {errors.room && (
            <p className="mt-1 text-sm text-destructive">{errors.room.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="birthDate" className="text-right">
          {i18n.ticketForm.birthDateLabel}
        </Label>
        <div className="col-span-3">
          <Input id="birthDate" type="date" {...register('birthDate')} />
          {errors.birthDate && (
            <p className="mt-1 text-sm text-destructive">
              {errors.birthDate.message}
            </p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="diet" className="text-right">
          {i18n.ticketForm.dietLabel}
        </Label>
        <div className="col-span-3">
          <Select
            {...register('diet')}
            onValueChange={(value) => reset({ ...watch(), diet: value })}
            value={dietValue}
          >
            <SelectTrigger>
              <SelectValue placeholder={i18n.ticketForm.selectDietPlaceholder} />
            </SelectTrigger>
            <SelectContent>
              {DIET_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.diet && (
            <p className="mt-1 text-sm text-destructive">{errors.diet.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="mealTime" className="text-right">
          {i18n.ticketForm.mealTimeLabel}
        </Label>
        <div className="col-span-3">
          <Select
            {...register('mealTime')}
            onValueChange={(value) => reset({ ...watch(), mealTime: value })}
            value={mealTimeValue}
          >
            <SelectTrigger>
              <SelectValue
                placeholder={i18n.ticketForm.selectMealTimePlaceholder}
              />
            </SelectTrigger>
            <SelectContent>
              {MEAL_TIME_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.mealTime && (
            <p className="mt-1 text-sm text-destructive">
              {errors.mealTime.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? i18n.ticketForm.saving
            : i18n.ticketForm.saveChanges}
        </Button>
      </div>
    </form>
  )
}
