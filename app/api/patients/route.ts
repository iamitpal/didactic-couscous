// app/api/patients/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log("Prisma Client:", prisma);
console.log("Patient Model:", prisma.patient);

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const patient = await prisma.patient.create({
      data: {
        name: body.name,
        phone: body.phone,
        age: body.age,
        city: body.city,
        occupation: body.occupation,
        company: body.company,
        chiefComplaints: body.chiefComplaints,
        previousExperience: body.previousExperience,
        selectedDoctor: body.selectedDoctor,
      },
    });
    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save patient details" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
