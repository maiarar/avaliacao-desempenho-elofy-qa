import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { API_BASE_URL } from '../constants.js'
import { createEmployee } from '../commons.js'

let team_id = 1
let manager_id = 1
let new_employee_id = null

describe('Employees', () => {

    describe('POST /employees', () => {
        it('deve criar um novo funcionário com status 201', async () => {
            const employee = await createEmployee(team_id, manager_id)

            expect(employee).toHaveProperty('id')
            expect(employee).toHaveProperty('name')

            new_employee_id = employee.id
        })

        it('deve retornar 400 ao enviar dados inválidos', async () => {
            const invalidData = {
                name: '', // Nome vazio
                campo_aleatorio: 'valor' // Campo não esperado
            }

            const res = await request(API_BASE_URL)
                .post('/employees')
                .send(invalidData)

            expect(res.status).toBe(422)
        })
    })

    describe('GET /employees', () => {
        it('deve listar todos os funcionários com status 200', async () => {
            const res = await request(API_BASE_URL)
                .get('/employees')

            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        })
    })

    describe('PUT /employees/:id', () => {
        it('deve atualizar um funcionário com status 200', async () => {
            const updateData = {
                name: 'Funcionário Atualizado',
                email: 'atualizado@example.com'
            }

            const res = await request(API_BASE_URL)
                .put('/employees/' + new_employee_id)
                .send(updateData)

            expect([200, 204]).toContain(res.status)
            if (res.body && res.body.id) {
                expect(res.body).toHaveProperty('name', updateData.name)
            }
        })

        it('deve retornar 404 ao atualizar funcionário inexistente', async () => {
            const updateData = {
                name: 'Funcionário Inexistente'
            }

            const res = await request(API_BASE_URL)
                .put('/employees/99999')
                .send(updateData)

            expect(res.status).toBe(404)
        })
    })

    describe('DELETE /employees/:id', () => {
        it('deve deletar um funcionário com status 204 ou 200', async () => {
            const res = await request(API_BASE_URL)
                .delete('/employees/' + new_employee_id)

            // expect([200, 204]).toContain(res.status)
            if (![200, 204].includes(res.status)) {
                throw new Error(`❌ Status inválido: ${res.status}. Esperado: 200 ou 204\n📌 Resposta: ${JSON.stringify(res.body)}`)
            }
            expect([200, 204]).toContain(res.status)
        })

        it('deve retornar 404 ao deletar funcionário inexistente', async () => {
            const res = await request(API_BASE_URL)
                .delete('/employees/99999')

            expect(res.status).toBe(404)
        })
    })
})
