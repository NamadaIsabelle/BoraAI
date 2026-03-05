import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { calculateTriageScore, getUrgencyLevel } from '@/lib/triage'

/**
 * GET /api/patients
 * Returns all patients ordered by score descending (highest urgency first).
 */
export async function GET() {
  try {
    const patients = await prisma.patient.findMany({
      orderBy: { score: 'desc' },
    })

    // Parse symptoms JSON string back to array for each patient
    const result = patients.map((p) => ({
      ...p,
      symptoms: JSON.parse(p.symptoms),
    }))

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error('[GET /api/patients]', error)
    return NextResponse.json({ error: 'Failed to fetch patients' }, { status: 500 })
  }
}

/**
 * POST /api/patients
 * Accepts: { name, age, symptoms[] }
 * Computes triage score + urgency, stores patient, returns created record.
 */
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, age, symptoms } = body

    // --- Validation ---
    if (!name || typeof name !== 'string') {
      return NextResponse.json({ error: 'name is required' }, { status: 400 })
    }
    if (!age || typeof age !== 'number') {
      return NextResponse.json({ error: 'age must be a number' }, { status: 400 })
    }
    if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
      return NextResponse.json({ error: 'symptoms must be a non-empty array' }, { status: 400 })
    }

    // --- AI Triage Scoring ---
    const score = calculateTriageScore(symptoms)
    const urgency = getUrgencyLevel(score)

    const patient = await prisma.patient.create({
      data: {
        name,
        age,
        symptoms: JSON.stringify(symptoms),
        urgency,
        score,
      },
    })

    return NextResponse.json(
      { ...patient, symptoms },
      { status: 201 }
    )
  } catch (error) {
    console.error('[POST /api/patients]', error)
    return NextResponse.json({ error: 'Failed to create patient' }, { status: 500 })
  }
}
