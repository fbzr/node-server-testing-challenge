const request = require('supertest');

const server = require('./index');

describe('api/users', () => {
    describe('GET /', () => {
        it('should return status 200 and type text/html', async () => {
            const res = await request(server).get('/');
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe('text/html');
        });
    });
});