import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { API_BASE_URL } from '../constants.js'

describe('Competencies', () => {

    let competencyId = null; // Variável para armazenar o ID da competência criada

    describe('GET /competencies', () => {
        it('deve listar todas as competências com status 200', async () => {
            const res = await request(API_BASE_URL).get('/competencies')
            expect(res.status).toBe(200)
            expect(Array.isArray(res.body)).toBe(true)
        })
    })

    describe('POST /competencies', () => {
        it('deve criar uma nova competência com status 201', async () => {
            const newCompetency = {
                name: 'Competência' + Math.floor(Math.random() * 1000), // para evitar conflitos de nome
                description: 'Descrição da nova competência'
            }

            const res = await request(API_BASE_URL)
                .post('/competencies')
                .send(newCompetency)

            expect(res.status).toBe(201)
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('name', newCompetency.name)

            // Armazena o ID da competência criada para uso em testes posteriores
            competencyId = res.body.id
            console.log('Competência criada com ID:', competencyId)
        })

        it('deve retornar 400 ao enviar dados inválidos', async () => {
            const invalidData = {
                description: 'Descrição sem nome'
            }

            const res = await request(API_BASE_URL)
                .post('/competencies')
                .send(invalidData)

            expect(res.status).toBe(422)
        })

    })

    describe('PUT /competencies/:id', () => {
        it('deve atualizar uma competência com status 200', async () => {
            const updateData = {
                name: 'Competência Atualizada',
                description: 'Descrição atualizada'
            }

            const res = await request(API_BASE_URL)
                .put('/competencies/' + competencyId)
                .send(updateData)

            expect([200, 204]).toContain(res.status)
            if (res.body && res.body.id) {
                expect(res.body).toHaveProperty('name', updateData.name)
            }
        })

        it('deve retornar 404 ao atualizar competência inexistente', async () => {
            const updateData = {
                name: 'Competência Inexistente'
            }

            const res = await request(API_BASE_URL)
                .put('/competencies/99999')
                .send(updateData)

            expect(res.status).toBe(404)
        })
    })

    describe('DELETE /competencies/:id', () => {
        it('deve deletar uma competência com status 204 ou 200', async () => {
            const res = await request(API_BASE_URL)
                .delete('/competencies/' + competencyId)

            expect([200, 204]).toContain(res.status)
        })

        it('deve retornar 404 ao deletar competência inexistente', async () => {
            const res = await request(API_BASE_URL)
                .delete('/competencies/99999')

            expect(res.status).toBe(404)
        })
    })
})
