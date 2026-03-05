import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/patients/:id
 * Returns a single patient by ID.
 */
export async function GET(request, { params }) {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: params.id },
    })

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    }

    return NextResponse.json(
      { ...patient, symptoms: JSON.parse(patient.symptoms) },
      { status: 200 }
    )
  } catch (error) {
    console.error('[GET /api/patients/:id]', error)
    return NextResponse.json({ error: 'Failed to fetch patient' }, { status: 500 })
  }
}

/**
 * DELETE /api/patients/:id
 * Removes a patient and their vitals (cascade).
 */
export async function DELETE(request, { params }) {
  try {
    await prisma.patient.delete({ where: { id: params.id } })
    return NextResponse.json({ message: 'Patient deleted' }, { status: 200 })
  } catch (error) {
    console.error('[DELETE /api/patients/:id]', error)
    return NextResponse.json({ error: 'Failed to delete patient' }, { status: 500 })
  }
}
