'use client'

import * as React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format } from 'date-fns'
import type { Ticket } from '@/lib/actions/tickets'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { createTicket, updateTicket } from '@/lib/actions/tickets'
import { DIET_OPTIONS, MEAL_TIME_OPTIONS, ROOM_OPTIONS } from '@/lib/constants'
import { i18n } from '@/lib/i18n'
import { Combobox } from './combobox'

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
  const form = useForm<TicketFormValues>({
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

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = form

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
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <FormField
          control={control}
          name="patientName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">
                {i18n.ticketForm.patientNameLabel}
              </FormLabel>
              <FormControl className="col-span-3">
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="patientId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">
                {i18n.ticketForm.patientIdLabel}
              </FormLabel>
              <FormControl className="col-span-3">
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="room"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">
                {i18n.ticketForm.roomLabel}
              </FormLabel>
              <div className="col-span-3 flex flex-col">
                <FormControl>
                  <Combobox
                    options={ROOM_OPTIONS}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder={i18n.ticketForm.selectRoomPlaceholder}
                    searchPlaceholder={i18n.ticketForm.combobox.searchRoom}
                  />
                </FormControl>
                <FormMessage className="mt-1" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="birthDate"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">
                {i18n.ticketForm.birthDateLabel}
              </FormLabel>
              <FormControl className="col-span-3">
                <Input type="date" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="diet"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">
                {i18n.ticketForm.dietLabel}
              </FormLabel>
              <div className="col-span-3 flex flex-col">
                <FormControl>
                  <Combobox
                    options={DIET_OPTIONS}
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder={i18n.ticketForm.selectDietPlaceholder}
                    searchPlaceholder={i18n.ticketForm.combobox.searchDiet}
                  />
                </FormControl>
                <FormMessage className="mt-1" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="mealTime"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <FormLabel className="text-right">
                {i18n.ticketForm.mealTimeLabel}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="col-span-3">
                  <SelectTrigger>
                    <SelectValue
                      placeholder={i18n.ticketForm.selectMealTimePlaceholder}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MEAL_TIME_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? i18n.ticketForm.saving
              : i18n.ticketForm.saveChanges}
          </Button>
        </div>
      </form>
    </Form>
  )
}
