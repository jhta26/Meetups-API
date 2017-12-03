'use strict';
process.env.NODE_ENV = 'test';
const request = require('supertest');
const { suite, test } = require('mocha');
const server = require('../index')
const { addDatabaseHooks } = require('./databaseHooks');




suite('users', addDatabaseHooks(() => {

        suite('happy', () => {
            var agent = request.agent(server)
            var token

            beforeEach(done => {
                request(server).post('/authenticate')
                    .set('Content-Type', 'application/json')
                    .send({
                        username: 'Jasonhsu',
                        password: 'youreawizard'
                    })
                    .end((err, res) => {
                        if (err) {
                            return done(err)
                        }
                        token = res.body.token
                        done()
                    })
            })
            test('GETALL', done => {
                agent.get('/users')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        res.body.map(a => {
                            delete a.created_at
                            delete a.updated_at
                        })
                    })
                    .expect(200, [{ id: 1, name: 'Jason Hsu', username: 'Jasonhsu', bar_info: 60 },
                        {
                            id: 2,
                            name: 'Megan Hsu',
                            username: 'Meganhsu',
                            bar_info: 50
                        },
                        {
                            id: 3,
                            name: 'Chuck Hagy',
                            username: 'Chuckhagy',
                            bar_info: 40
                        },
                        {
                            id: 4,
                            name: 'Melisa Im',
                            username: 'Melisaim',
                            bar_info: 70
                        }
                    ], done)
            })
            test('users by id', done => {

                agent.get('/users/1')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at
                        delete res.body.updated_at
                    })
                    .expect(200, {
                            id: 1,
                            name: 'Jason Hsu',
                            username: 'Jasonhsu',
                            bar_info: 60
                        },
                        done)

            })
            test('POST', done => {
                agent.post('/users')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        username: 'Jasonhsu2',
                        name: 'Jason Hsu',
                        password: 'youreawizard'
                    })
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at
                        delete res.body.updated_at
                    })
                    .expect(201, {
                        id: 5,
                        name: 'Jason Hsu',
                        username: 'Jasonhsu2',
                        bar_info: 0
                    }, done)
            })
            test('PATCH', done => {
                agent.patch('/users/1')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        username: 'Jasonhsuu'
                    })
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at
                        delete res.body.updated_at
                    })
                    .expect(200, {
                        id: 1,
                        name: 'Jason Hsu',
                        username: 'Jasonhsuu',
                        bar_info: 60
                    }, done)
            })


        })
    })

)