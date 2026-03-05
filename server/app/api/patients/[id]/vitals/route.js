import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET /api/patients/:id/vitals
 * Returns the full vitals history for a patient, newest first.
 */
export async function GET(request, { params }) {
  try {
    // Verify patient exists
    const patient = await prisma.patient.findUnique({ where: { id: params.id } })
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    }

    const vitals = await prisma.vital.findMany({
      where: { patientId: params.id },
      orderBy: { recordedAt: 'desc' },
    })

    return NextResponse.json(vitals, { status: 200 })
  } catch (error) {
    console.error('[GET /api/patients/:id/vitals]', error)
    return NextResponse.json({ error: 'Failed to fetch vitals' }, { status: 500 })
  }
}

/**
 * POST /api/patients/:id/vitals
 * Accepts: { temperature, bloodPressure, heartRate, oxygenSaturation }
 * Logs a new vitals record for the patient.
 */
export async function POST(request, { params }) {
  try {
    const body = await request.json()
    const { temperature, bloodPressure, heartRate, oxygenSaturation } = body

    // --- Validation ---
    if (temperature === undefined || typeof temperature !== 'number') {
      return NextResponse.json({ error: 'temperature must be a number' }, { status: 400 })
    }
    if (!bloodPressure || typeof bloodPressure !== 'string') {
      return NextResponse.json({ error: 'bloodPressure is required (e.g. "120/80")' }, { status: 400 })
    }
    if (heartRate === undefined || typeof heartRate !== 'number') {
      return NextResponse.json({ error: 'heartRate must be a number' }, { status: 400 })
    }
    if (oxygenSaturation === undefined || typeof oxygenSaturation !== 'number') {
      return NextResponse.json({ error: 'oxygenSaturation must be a number' }, { status: 400 })
    }

    // Verify patient exists
    const patient = await prisma.patient.findUnique({ where: { id: params.id } })
    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
    }

    const vital = await prisma.vital.create({
      data: {
        patientId: params.id,
        temperature,
        bloodPressure,
        heartRate,
        oxygenSaturation,
      },
    })

    return NextResponse.json(vital, { status: 201 })
  } catch (error) {
    console.error('[POST /api/patients/:id/vitals]', error)
    return NextResponse.json({ error: 'Failed to log vitals' }, { status: 500 })
  }
}
