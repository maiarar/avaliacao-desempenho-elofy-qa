import request from 'supertest'
import { API_BASE_URL } from './constants.js'

export async function createEmployee(teamId, managerId) {
    teamId = teamId || 1
    managerId = managerId || 1
  const newEmployee = {
    name: 'Funcionario ' + Math.floor(Math.random() * 10000),
    team_id: teamId,
    manager_id: managerId
  }

  const res = await request(API_BASE_URL)
    .post('/employees')
    .send(newEmployee)

  if ([201, 200].includes(res.status)) {
    return res.body
  }

  throw new Error(`Falha ao criar employee: ${res.body ? JSON.stringify(res.body) : res.status}`)
}

export async function getCompetencies() {
  const res = await request(API_BASE_URL).get('/competencies')

  if (res.status === 200 && Array.isArray(res.body)) {
    return res.body
  }

  throw new Error(`Falha ao obter competências: ${res.body ? JSON.stringify(res.body) : res.status}`)
}

export async function createSimpleCycle(teamIds, competencies) {
  const newCycle = {
    name: 'Ciclo ' + Math.floor(Math.random() * 10000),
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    use_weights: false,
    team_ids: teamIds || [1],
    competencies: competencies || [
      {
        competency_id: 1,
        weight: null
      }
    ]
  }

  const res = await request(API_BASE_URL)
    .post('/cycles')
    .send(newCycle)

  if ([201, 200].includes(res.status)) {
    return res.body
  }

  throw new Error(`Falha ao criar ciclo: ${res.body ? JSON.stringify(res.body) : res.status}`)
}

export async function startCycle(cycleId) {
  const res = await request(API_BASE_URL)
    .post(`/cycles/${cycleId}/start`)

  if ([200, 204].includes(res.status)) {
    return res.body || { id: cycleId }
  }

  throw new Error(`Falha ao iniciar ciclo: ${res.body ? JSON.stringify(res.body) : res.status}`)
}

export async function createCompetency() {
  const newCompetency = {
    name: 'Competência ' + Math.floor(Math.random() * 10000),
    description: 'Competência para testes'
  }

  const res = await request(API_BASE_URL)
    .post('/competencies')
    .send(newCompetency)

  if ([201, 200].includes(res.status)) {
    return res.body
  }

  throw new Error(`Falha ao criar competência: ${res.body ? JSON.stringify(res.body) : res.status}`)
}

export async function createTeam() {
  const newTeam = {
    name: 'Time ' + Math.floor(Math.random() * 10000),
    description: 'Time para testes'
  }

  const res = await request(API_BASE_URL)
    .post('/teams')
    .send(newTeam)

  if ([201, 200].includes(res.status)) {
    return res.body
  }

  throw new Error(`Falha ao criar time: ${res.body ? JSON.stringify(res.body) : res.status}`)
}

export async function updateCycleWithWeights(cycleId, competencies, teamIds) {
  const updateData = {
    name: 'Ciclo ' + Math.floor(Math.random() * 10000),
    start_date: new Date().toISOString().split('T')[0],
    end_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    use_weights: false,
    team_ids: teamIds || [1],
    competencies: competencies
  }

  const res = await request(API_BASE_URL)
    .put(`/cycles/${cycleId}`)
    .send(updateData)

  if ([200, 201, 204].includes(res.status)) {
    return res.body || { id: cycleId }
  }

  throw new Error(`Falha ao atualizar ciclo: ${res.body ? JSON.stringify(res.body) : res.status}`)
}

export async function getEvaluations(cycleId) {
  const res = await request(API_BASE_URL)
    .get('/evaluations')

  if (res.status === 200 && Array.isArray(res.body)) {
    return cycleId ? res.body.filter(e => e.cycle_id === cycleId) : res.body
  }

  throw new Error(`Falha ao obter avaliações: ${res.body ? JSON.stringify(res.body) : res.status}`)
}

export async function answerEvaluation(evaluationId, competencyId, score) {
  const answerData = {
    competency_id: competencyId,
    score: score
  }

  const res = await request(API_BASE_URL)
    .post(`/evaluations/${evaluationId}/answer`)
    .send(answerData)

  if ([200, 201, 204].includes(res.status)) {
    return res.body || { id: evaluationId }
  }

  throw new Error(`Falha ao responder avaliação: ${res.body ? JSON.stringify(res.body) : res.status}`)
}

export async function closeCycle(cycleId) {
  const res = await request(API_BASE_URL)
    .post(`/cycles/${cycleId}/close`)

  if ([200, 204].includes(res.status)) {
    return res.body || { id: cycleId }
  }

  throw new Error(`Falha ao fechar ciclo: ${res.body ? JSON.stringify(res.body) : res.status}`)
}
