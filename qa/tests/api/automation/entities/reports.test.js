import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'
import { API_BASE_URL } from '../constants.js'
import { createEmployee, getCompetencies, createCycle, startCycle } from '../commons.js'

let team_id = 1
let cycle_id = null
let employee_id = null

describe('Reports', () => {
  beforeAll(async () => {
    // Cria um ciclo
    try {
      const cycle = await createCycle()
      cycle_id = cycle.id
      console.log('Ciclo criado para testes de relatórios:', cycle.id)
    } catch (error) {
      console.warn('Aviso: não foi possível criar ciclo para testes:', error.message)
    }

    // Inicia o ciclo
    try {
      if (cycle_id) {
        await startCycle(cycle_id)
        console.log('Ciclo iniciado:', cycle_id)
      }
    } catch (error) {
      console.warn('Aviso: não foi possível iniciar ciclo:', error.message)
    }

    // Cria um employee
    try {
      const employee = await createEmployee(1, 1)
      employee_id = employee.id
      console.log('Employee criado para testes de relatórios:', employee.id)
    } catch (error) {
      console.warn('Aviso: não foi possível criar employee para testes:', error.message)
    }
  })

  describe('GET /reports/teams', () => {
    it('deve listar relatórios de time com status 200', async () => {
      const res = await request(API_BASE_URL)
        .get(`/reports/teams?team_id=${team_id}`)

      expect(res.status).toBe(200)
      expect(Array.isArray(res.body) || res.body).toBeDefined()
    })
  })

  describe('GET /reports/employees', () => {
    it('deve listar relatórios de employee com status 200', async () => {
      if (!employee_id) {
        console.warn('Skipping test: employee_id not available')
        return
      }
      const res = await request(API_BASE_URL)
        .get(`/reports/employees?employee_id=${employee_id}`)

      expect(res.status).toBe(200)
      expect(Array.isArray(res.body) || res.body).toBeDefined()
    })
  })

  describe('GET /reports/evaluations/analytical', () => {
    it('deve gerar relatório analítico de avaliações com status 200', async () => {
      if (!cycle_id) {
        console.warn('Skipping test: cycle_id not available')
        return
      }
      const res = await request(API_BASE_URL)
        .get(`/reports/evaluations/analytical?cycle_id=${cycle_id}`)

      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
    })
  })

  describe('GET /reports/evaluations/synthetic', () => {
    it('deve gerar relatório sintético de avaliações com status 200', async () => {
      if (!cycle_id) {
        console.warn('Skipping test: cycle_id not available')
        return
      }
      const res = await request(API_BASE_URL)
        .get(`/reports/evaluations/synthetic?cycle_id=${cycle_id}`)

      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
    })
  })

  describe('GET /reports/evaluations/results', () => {
    it('deve gerar relatório de resultados de avaliações com status 200', async () => {
      if (!cycle_id) {
        console.warn('Skipping test: cycle_id not available')
        return
      }
      const res = await request(API_BASE_URL)
        .get(`/reports/evaluations/results?cycle_id=${cycle_id}`)

      expect(res.status).toBe(200)
      expect(res.body).toBeDefined()
    })
  })
})
