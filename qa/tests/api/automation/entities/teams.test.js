import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { API_BASE_URL } from '../constants.js'

let teamId = null; // Variável para armazenar o ID do time criado

describe('Teams', () => {

    describe('POST /teams', () => {
        it('deve criar um novo time com status 201', async () => {
            const newTeam = {
                name: 'Novo Time',
                description: 'Descrição do novo time'
            }

            const res = await request(API_BASE_URL)
                .post('/teams')
                .send(newTeam)

            expect([201, 200]).toContain(res.status)
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('name', newTeam.name)
            
            teamId = res.body.id // Armazena o ID do time criado para uso em testes posteriores
        })

        it('deve retornar 400 ao enviar dados inválidos', async () => {
            const invalidData = {
                // falta o campo 'name'
                description: 'Descrição sem nome'
            }

            const res = await request(API_BASE_URL)
                .post('/teams')
                .send(invalidData)

            expect(res.status).toBe(422)
        })
    })

    describe('GET /teams', () => {
        it('deve listar todos os times com status 200', async () => {
            const res = await request(API_BASE_URL)
                .get('/teams')

            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        })
    })


    describe('PUT /teams/:id', () => {
        it('deve atualizar um time com status 200', async () => {
            const updateData = {
                name: 'Time Atualizado',
                description: 'Descrição atualizada'
            }

            const res = await request(API_BASE_URL)
                .put('/teams/' + teamId)
                .send(updateData)

            expect([200, 204]).toContain(res.status)
            if (res.body && res.body.id) {
                expect(res.body).toHaveProperty('name', updateData.name)
            }
        })

        it('deve retornar 404 ao atualizar time inexistente', async () => {
            const updateData = {
                name: 'Time Inexistente'
            }

            const res = await request(API_BASE_URL)
                .put('/teams/99999')
                .send(updateData)

            expect(res.status).toBe(404)
        })
    })

    describe('DELETE /teams/:id', () => {
        it('deve deletar um time com status 204 ou 200', async () => {
            const res = await request(API_BASE_URL)
                .delete('/teams/' + teamId)

            expect([200, 204]).toContain(res.status)
        })

        it('deve retornar 404 ao deletar time inexistente', async () => {
            const res = await request(API_BASE_URL)
                .delete('/teams/99999')

            expect(res.status).toBe(404)
        })
    })
})
