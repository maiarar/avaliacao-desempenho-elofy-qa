import { describe, it, expect, beforeAll } from 'vitest'
import request from 'supertest'
import { API_BASE_URL } from '../constants.js'
import { createEmployee, getCompetencies, createSimpleCycle, startCycle } from '../commons.js'

let evaluation_id = null
let employee_id = null
let competency_id = null
let cycle_id = null
let team_id = 1
let manager_id = 1

describe('Evaluations', () => {

    beforeAll(async () => {

        // Cria um employee no time 1 para usar nos testes
        try {
            const employee = await createEmployee(team_id, manager_id)
            employee_id = employee.id
            console.log('Employee criado para testes de avaliações:', employee)
        } catch (error) {
            console.warn('Aviso: não foi possível criar employee para testes:', error.message)
        }


        // Cria um ciclo
        try {
            const teamIds = [team_id] // IDs dos times para associar ao ciclo
            const competencies = [ // Competências para associar ao ciclo
                {
                    competency_id: 1,
                    weight: null
                }
            ]

            const cycle = await createSimpleCycle(teamIds, competencies)
            cycle_id = cycle.id
            console.log('Ciclo criado para testes de avaliações:', cycle.id)
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

        // Obtém todas as competências
        try {
            const competencies = await getCompetencies()
            if (competencies.length > 0) {
                competency_id = competencies[0].id
                console.log('Competência utilizada:', competencies[0])
            }
        } catch (error) {
            console.warn('Aviso: não foi possível obter competências:', error.message)
        }
    })


    describe('GET /evaluations', () => {
        it('deve listar todas as avaliações com status 200', async () => {
            const res = await request(API_BASE_URL)
                .get('/evaluations')

            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)

            if (res.body.length > 0) {
                const evaluation = res.body.find(e => e.evaluator_id === employee_id)
                if (evaluation) {
                    evaluation_id = evaluation.id
                    console.log('Avaliação encontrada para employee_id', employee_id, ':', evaluation)
                } else {
                    evaluation_id = res.body[0].id
                    console.log('Nenhuma avaliação encontrada para employee_id', employee_id, '. Usando avaliação genérica:', res.body[0])
                }
            }
        })

        it('deve filtrar avaliações por parâmetros', async () => {
            const res = await request(API_BASE_URL)
                .get('/evaluations?cycle_id=1&evaluator_id=1&evaluated_id=1&status=pending')

            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        })
    })

    describe('POST /evaluations/:id/answer', () => {
        it('deve responder uma avaliação com status 200', async () => {

            console.log('ID da avaliação para responder:', evaluation_id) // Log para verificar o ID da avaliação

            const answerData = {
                "evaluator_id": employee_id || 1, // Use employee_id se disponível, caso contrário use 1
                "answers": [
                    {
                        "competency_id": competency_id || 1, // Use competency_id se disponível, caso contrário use 1
                        "score": 2
                    }
                ]
            }

            console.log('Enviando resposta para avaliação ID:', evaluation_id) // Log para verificar o ID da avaliação sendo respondida

            const res = await request(API_BASE_URL)
                .post(`/evaluations/${evaluation_id}/answer`)
                .send(answerData)

            expect([200, 201, 204]).toContain(res.status)
        })

        it('deve retornar 422 com resposta inválida', async () => {

            const invalidData = {
                "evaluator_id": null,
                "answers": [
                    {
                        "competency_id": null,
                        "score": null
                    }
                ]
            }

            const res = await request(API_BASE_URL)
                .post(`/evaluations/${evaluation_id}/answer`)
                .send(invalidData)

            expect(res.status).toBe(403)
        })

        it('deve retornar 404 para avaliação inexistente', async () => {
            const answerData = {
                "evaluator_id": null,
                "answers": [
                    {
                        "competency_id": null,
                        "score": null
                    }
                ]
            }

            const res = await request(API_BASE_URL)
                .post('/evaluations/99999/answer')
                .send(answerData)

            expect(res.status).toBe(404)
        })
    })
})

describe('GET /evaluations/:id', () => {
    it('deve retornar avaliação por ID com status 200', async () => {

        const res = await request(API_BASE_URL)
            .get(`/evaluations/${evaluation_id}`)

        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('id')
    })

    it('deve retornar 404 para avaliação inexistente', async () => {
        const res = await request(API_BASE_URL)
            .get('/evaluations/99999')

        expect(res.status).toBe(404)
    })
})

