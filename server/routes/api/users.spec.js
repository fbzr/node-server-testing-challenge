const request = require('supertest');

const server = require('../../index');

describe('api/users', () => {
    describe('GET /', () => {
        it('should return status 200 and type application/json', async () => {
            const res = await request(server).get('/api/users/');
            expect(res.statusCode).toBe(200);
            expect(res.type).toBe('application/json');
        });

        it('checks if it returns an array', async () => {
            const res = await request(server).get('/api/users/');
            expect(Array.isArray(res.body)).toBe(true);
        });

        it('checks if the arrays length is 2', async () => {
            const res = await request(server).get('/api/users/');
            expect(res.body).toHaveLength(2);
        });
    });

    describe('POST /', () => {
        it('returns 201 status', async () => {
            const res = await request(server)
                .post('/api/users')
                .send({
                    name: 'Buckley',
                    department: 'Kitchen'
                });
            expect(res.statusCode).toBe(201);
        });

        it('should return the new user', async () => {
            const res = await request(server)
                .post('/api/users')
                .send({
                    name: 'Dani',
                    department: 'Treasure'
                });
                
            expect(res.body).toEqual({
                id: 4,
                name: 'Dani',
                department: 'Treasure'
            });
        });
    });

    describe('DELETE /', () => {
        it('returns 200 status code', async () => {
            const res = await request(server)
                .delete('/api/users/2');
                
            expect(res.statusCode).toBe(200);
        });

        it('checks if array length is smaller after deleting', async () => {
            let getReq = await request(server).get('/api/users');
            const lengthBefore = getReq.body.length;

            const res = await request(server)
                .delete('/api/users/4');
                
            getReqAfter = await request(server).get('/api/users');
            const lengthAfter = getReqAfter.body.length;

            expect(lengthAfter).toBe(lengthBefore - 1);
        });
    });
});