/**
 * Symptom score lookup table.
 * Scores represent clinical severity contribution (0–50 per symptom).
 * Total is capped at 100.
 */
const SYMPTOM_SCORES = {
  // --- Critical (immediate threat to life) ---
  unconscious: 50,
  'heart attack': 50,
  stroke: 50,
  'cardiac arrest': 50,
  seizure: 45,
  'severe bleeding': 45,
  'difficulty breathing': 40,
  'chest pain': 40,
  'respiratory distress': 40,
  'anaphylaxis': 45,

  // --- High (urgent attention needed) ---
  confusion: 25,
  'high fever': 30,
  'severe pain': 30,
  'altered consciousness': 35,
  paralysis: 35,
  'loss of vision': 30,

  // --- Moderate (needs attention soon) ---
  fever: 20,
  vomiting: 15,
  'abdominal pain': 15,
  dizziness: 10,
  headache: 10,
  'shortness of breath': 20,
  'chest tightness': 20,
  nausea: 10,
  fatigue: 8,
  swelling: 10,

  // --- Low (can wait) ---
  cough: 5,
  'runny nose': 5,
  'sore throat': 5,
  'mild rash': 5,
  sneezing: 3,
  'mild headache': 7,
  'back pain': 8,
  'stomach ache': 8,
}

/**
 * Calculate a triage score (0–100) based on reported symptoms.
 * @param {string[]} symptoms
 * @returns {number}
 */
export function calculateTriageScore(symptoms) {
  let score = 0

  for (const symptom of symptoms) {
    const key = symptom.toLowerCase().trim()
    // Use mapped value or default 5 for unrecognised symptoms
    score += SYMPTOM_SCORES[key] ?? 5
  }

  return Math.min(score, 100)
}

/**
 * Derive urgency label from numeric score.
 * Critical  → 70–100
 * Moderate  → 40–69
 * Low       → 0–39
 * @param {number} score
 * @returns {'Critical' | 'Moderate' | 'Low'}
 */
export function getUrgencyLevel(score) {
  if (score >= 70) return 'Critical'
  if (score >= 40) return 'Moderate'
  return 'Low'
}
