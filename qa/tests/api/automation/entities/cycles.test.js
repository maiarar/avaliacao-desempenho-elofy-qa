import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { API_BASE_URL } from '../constants.js'
import { createSimpleCycle, startCycle } from '../commons.js'

let cycleId = null

describe('Cycles', () => {

    describe('POST /cycles', () => {
        it('deve criar um novo ciclo com status 201', async () => {
            const cycle = await createSimpleCycle()

            expect(cycle).toHaveProperty('id')
            expect(cycle).toHaveProperty('name')
            cycleId = cycle.id
        })

        it('deve retornar 400 ao enviar dados inválidos', async () => {
            const invalidData = {
                // falta campos obrigatórios
                description: 'Descrição sem nome'
            }

            const res = await request(API_BASE_URL)
                .post('/cycles')
                .send(invalidData)

            expect(res.status).toBe(422)
        })
    })

    describe('GET /cycles', () => {
        it('deve listar todos os ciclos com status 200', async () => {
            const res = await request(API_BASE_URL)
                .get('/cycles')

            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        })
    })

    describe('GET /cycles/:id', () => {
        it('deve retornar ciclo por ID com status 200', async () => {
            const res = await request(API_BASE_URL)
                .get('/cycles/' + cycleId)

            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('id')
        })

        it('deve retornar 404 para ciclo inexistente', async () => {
            const res = await request(API_BASE_URL)
                .get('/cycles/99999')

            expect(res.status).toBe(404)
        })
    })


    describe('PUT /cycles/:id', () => {
        it('deve atualizar um ciclo com status 200', async () => {
            let data_inicio = new Date();
            let data_fim = new Date().setDate(data_inicio.getDate() + 15); // 15 dias depois

            const updateData = {
                "name": "Avaliação_XX",
                "start_date": data_inicio.toISOString().split('T')[0], // Formata para YYYY-MM-DD
                "end_date": new Date(data_fim).toISOString().split('T')[0], // Formata para YYYY-MM-DD
                "use_weights": false,
                "team_ids": [
                    1
                ],
                "competencies": [
                    {
                        "competency_id": 1,
                        "weight": null
                    }
                ]
            }

            const res = await request(API_BASE_URL)
                .put('/cycles/' + cycleId)
                .send(updateData)

            expect([200, 204]).toContain(res.status)
            if (res.body && res.body.id) {
                expect(res.body).toHaveProperty('name', updateData.name)
            }
        })

        it('deve retornar 404 ao atualizar ciclo inexistente', async () => {
            let data_inicio = new Date();
            let data_fim = new Date().setDate(data_inicio.getDate() + 15); // 15 dias depois

            const updateData = {
                "name": "Avaliação_XX",
                "start_date": data_inicio.toISOString().split('T')[0], // Formata para YYYY-MM-DD
                "end_date": new Date(data_fim).toISOString().split('T')[0], // Formata para YYYY-MM-DD
                "use_weights": false,
                "team_ids": [
                    1
                ],
                "competencies": [
                    {
                        "competency_id": 1,
                        "weight": null
                    }
                ]
            }

            const res = await request(API_BASE_URL)
                .put('/cycles/99999')
                .send(updateData)

            expect(res.status).toBe(404)
        })
    })

    describe('POST /cycles/:id/start', () => {
        it('deve iniciar um ciclo com status 200', async () => {

            let data_inicio = new Date();
            let data_fim = new Date().setDate(data_inicio.getDate() + 15); // 15 dias depois

            // Atualiza o ciclo para garantir que as datas estejam corretas antes de iniciar
            const res =await request(API_BASE_URL)
                .post('/cycles/' + cycleId + '/start')
            
            expect(res.status).toBe(200)
        })

        it('deve retornar 404 ao iniciar ciclo inexistente', async () => {
            const res = await request(API_BASE_URL)
                .post('/cycles/99999/start')

            expect(res.status).toBe(404)
        })
    })

    describe('POST /cycles/:id/close', () => {
        it('deve encerrar um ciclo com status 200', async () => {
            console.log('Encerrando ciclo com ID:', cycleId) // Log para verificar o ID do ciclo sendo encerrado

            const res = await request(API_BASE_URL)
                .post('/cycles/' + cycleId + '/close')

            expect([200, 204]).toContain(res.status)
        })

        it('deve retornar 404 ao encerrar ciclo inexistente', async () => {
            const res = await request(API_BASE_URL)
                .post('/cycles/99999/close')

            expect(res.status).toBe(404)
        })
    })

})
