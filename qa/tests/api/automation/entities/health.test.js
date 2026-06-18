import { describe, it, expect } from 'vitest'
import request from 'supertest'
import { API_BASE_URL } from '../constants.js'

describe('Health', () => {
    console.log('🔧 Iniciando suite: Health')
    
    describe('GET /health', () => {
        it('deve retornar status 200 indicando que o servidor está funcionando', async () => {
            console.log('🔍 Testando GET /health')
            const res = await request(API_BASE_URL)
                .get('/health')
            expect(res.status).toBe(200)
            console.log('✓ Health check passou')
        })

        it('deve retornar um objeto com status do servidor', async () => {
            const res = await request(API_BASE_URL)
                .get('/health')

            expect(res.status).toBe(200)
            expect(typeof res.body).toBe('object')
        })

        it('deve confirmar que o servidor está ativo', async () => {
            const res = await request(API_BASE_URL)
                .get('/health')

            expect(res.status).toBe(200)
            expect(res.body).toBeDefined()
        })
    })
})
