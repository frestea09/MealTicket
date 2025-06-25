import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const username = "admin";
  const existingUser = await prisma.user.findUnique({
    where: { username },
  });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("password", 10);
    await prisma.user.create({
      data: {
        username: username,
        password: hashedPassword,
      },
    });
    console.log("Default admin user created. Username: admin, Password: password");
  } else {
    console.log("Admin user already exists.");
  }

  // Seed some tickets
  const ticketsCount = await prisma.ticket.count();
  if (ticketsCount < 5) {
     await prisma.ticket.createMany({
        data: [
            { patientName: 'Budi Santoso', patientId: 'P001', room: '101A', diet: 'Biasa', birthDate: new Date('1985-05-15'), mealTime: 'Pagi' },
            { patientName: 'Ani Yudhoyono', patientId: 'P002', room: '102B', diet: 'Bubur', birthDate: new Date('1990-09-20'), mealTime: 'Siang' },
            { patientName: 'Cakra Khan', patientId: 'P003', room: '201A', diet: 'Cair', birthDate: new Date('1978-11-30'), mealTime: 'Malam' },
            { patientName: 'Dewi Persik', patientId: 'P004', room: '202B', diet: 'Sonde', birthDate: new Date('2001-02-10'), mealTime: 'Pagi' },
            { patientName: 'Eko Patrio', patientId: 'P005', room: '301A', diet: 'Biasa', birthDate: new Date('1995-07-25'), mealTime: 'Siang', ticketDate: new Date(Date.now() - 24 * 60 * 60 * 1000) },
        ]
     });
     console.log('Seeded 5 tickets.');
  } else {
      console.log('Tickets already seeded.');
  }

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
