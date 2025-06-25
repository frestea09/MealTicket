import jsPDF from 'jspdf'
import type { Ticket } from '@prisma/client'
import { format } from 'date-fns'

export function generateTicketPdf(tickets: Ticket[]) {
  const doc = new jsPDF()
  const ticketWidth = 80
  const ticketHeight = 50
  const margin = 10
  let x = margin
  let y = margin
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()

  tickets.forEach((ticket, index) => {
    if (y + ticketHeight > pageHeight) {
      doc.addPage()
      y = margin
      x = margin
    }

    doc.rect(x, y, ticketWidth, ticketHeight)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.text(`Tiket Makan Pasien #${ticket.id}`, x + 5, y + 7)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.text(`Nama: ${ticket.patientName}`, x + 5, y + 15)
    doc.text(`ID Pasien: ${ticket.patientId}`, x + 5, y + 20)
    doc.text(`Ruangan: ${ticket.room}`, x + 5, y + 25)
    doc.text(`Diet: ${ticket.diet}`, x + 5, y + 30)

    const formattedBirthDate = format(new Date(ticket.birthDate), 'dd MMM yyyy')
    doc.text(`Tgl Lahir: ${formattedBirthDate}`, x + 5, y + 35)
    doc.text(`Waktu Makan: ${ticket.mealTime}`, x + 5, y + 40)

    const formattedTicketDate = format(
      new Date(ticket.ticketDate),
      'dd MMM yyyy, HH:mm'
    )
    doc.text(`${formattedTicketDate}`, x + ticketWidth - 5, y + 45, {
      align: 'right',
    })

    x += ticketWidth + margin
    if (x + ticketWidth > pageWidth) {
      x = margin
      y += ticketHeight + margin
    }
  })

  doc.save('meal_tickets.pdf')
}
