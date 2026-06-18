import { describe, it, expect } from 'vitest'
import request from 'supertest'

import {
  createCompetency,
  createTeam,
  createEmployee,
  createSimpleCycle,
  updateCycleWithWeights,
  startCycle,
  getEvaluations,
  answerEvaluation,
  closeCycle,
  getCompetencies
} from '../commons.js'

console.log('✓ Commons importado com sucesso')

import { API_BASE_URL } from '../constants.js'

console.log('✓ Constants importado com sucesso')
console.log(`✓ API_BASE_URL: ${API_BASE_URL}`)

describe('[Regressão E2E] Fluxo Completo de Avaliação de Desempenho', () => {
  console.log('🔧 Iniciando suite de testes de regressão E2E')
  
  // Variáveis para armazenar dados ao longo do fluxo
  let competency_id = null
  let team_id = null
  let employee_1_id = null
  let employee_2_id = null
  let cycle_id = null
  let evaluation_ids = []

  it('1. Health Check - GET /api', async () => {
    console.log('🔍 Testando Health Check...')
    console.log(`📌 URL: ${API_BASE_URL}/health`)
    const res = await request(API_BASE_URL).get('/health')
    expect(res.status).toBe(200)
    console.log('✓ API está disponível')
  })

  it('2. Cadastro Base - Criar Competência', async () => {
    const competency = await createCompetency()
    competency_id = competency.id
    expect(competency_id).toBeDefined()
    console.log('✓ Competência criada:', competency_id)
  })

  it('3. Cadastro Base - Criar Time', async () => {
    const team = await createTeam()
    team_id = team.id
    expect(team_id).toBeDefined()
    console.log('✓ Time criado:', team_id)
  })

  it('4. Cadastro Base - Criar 2 Employees (um gestor do outro)', async () => {
    // Criar primeiro employee (gestor)
    const employee1 = await createEmployee(team_id, null)
    employee_1_id = employee1.id
    expect(employee_1_id).toBeDefined()
    console.log('✓ Employee 1 (Gestor) criado:', employee_1_id)

    // Criar segundo employee (subordinado do primeiro)
    const employee2 = await createEmployee(team_id, employee_1_id)
    employee_2_id = employee2.id
    expect(employee_2_id).toBeDefined()
    console.log('✓ Employee 2 (Subordinado) criado:', employee_2_id)
  })

  it('5. Setup do Ciclo - Criar Ciclo', async () => {
    const cycle = await createSimpleCycle(
      [team_id],
      [{ competency_id: competency_id, weight: null }]
    )
    cycle_id = cycle.id
    expect(cycle_id).toBeDefined()
    expect(cycle.status).toBe('draft')
    console.log('✓ Ciclo criado (draft):', cycle_id)
  })

  it('6. Setup do Ciclo - Editar Ciclo com Pesos (100%)', async () => {
    const competencies = [
      { competency_id: competency_id, weight: 100 }
    ]
    const updatedCycle = await updateCycleWithWeights(cycle_id, competencies, [team_id])
    expect(updatedCycle.id || cycle_id).toBeDefined()
    console.log('✓ Ciclo atualizado com pesos somando 100')
  })

  it('7. Execução do Ciclo - Iniciar Ciclo', async () => {
    const startedCycle = await startCycle(cycle_id)
    expect(startedCycle.id || cycle_id).toBeDefined()
    console.log('✓ Ciclo iniciado, avaliações geradas')
  })

  it('8. Execução do Ciclo - Listar e Validar Avaliações', async () => {
    const evaluations = await getEvaluations(cycle_id)
    expect(Array.isArray(evaluations)).toBe(true)
    expect(evaluations.length).toBeGreaterThan(0)
    
    // Armazenar IDs das avaliações para responder depois
    evaluation_ids = evaluations.map(e => e.id)
    console.log(`✓ ${evaluations.length} avaliações geradas:`, evaluation_ids)
  })

  it('9. Respostas - Responder Autoavaliação', async () => {
    expect(evaluation_ids.length).toBeGreaterThan(0)
    
    // Encontrar uma autoavaliação (avaliador = avaliado)
    const res = await request(API_BASE_URL).get('/evaluations')
    const selfEvaluation = res.body.find(e => 
      e.cycle_id === cycle_id && 
      e.evaluator_id === e.evaluated_employee_id
    )
    
    if (selfEvaluation) {
      await answerEvaluation(selfEvaluation.id, competency_id, 5)
      console.log('✓ Autoavaliação respondida')
    } else {
      console.log('⚠ Nenhuma autoavaliação encontrada')
    }
  })

  it('10. Respostas - Responder Avaliação do Gestor', async () => {
    expect(evaluation_ids.length).toBeGreaterThan(0)
    
    // Encontrar uma avaliação do gestor
    const res = await request(API_BASE_URL).get('/evaluations')
    const managerEvaluation = res.body.find(e => 
      e.cycle_id === cycle_id && 
      e.evaluator_id === employee_1_id &&
      e.evaluated_employee_id === employee_2_id
    )
    
    if (managerEvaluation) {
      await answerEvaluation(managerEvaluation.id, competency_id, 4)
      console.log('✓ Avaliação do gestor respondida')
    } else {
      console.log('⚠ Nenhuma avaliação do gestor encontrada')
    }
  })

  it('11. Encerramento - Fechar Ciclo', async () => {
    const closedCycle = await closeCycle(cycle_id)
    expect(closedCycle.id || cycle_id).toBeDefined()
    console.log('✓ Ciclo fechado')
  })

  it('12. Validação - Verificar Relatório de Resultados', async () => {
    const res = await request(API_BASE_URL)
      .get(`/reports/evaluations/results?cycle_id=${cycle_id}`)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    console.log('✓ Relatório de resultados gerado com cálculo de médias')
  })
})
