'use strict';
process.env.NODE_ENV = 'test';
const request = require('supertest');
const { suite, test } = require('mocha');
const server = require('../index');
const { addDatabaseHooks } = require('./databaseHooks');

suite(
    'users',
    addDatabaseHooks(() => {
        suite('happy', () => {
            var agent = request.agent(server);
            var token;

            beforeEach(done => {
                request(server)
                    .post('/authenticate')
                    .set('Content-Type', 'application/json')
                    .send({
                        username: 'Jasonhsu',
                        password: 'youreawizard'
                    })
                    .end((err, res) => {
                        if (err) {
                            return done(err);
                        }
                        token = res.body.token;
                        done();
                    });
            });
            test('GETALL users', done => {
                agent
                    .get('/users')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        res.body.map(a => {
                            delete a.created_at;
                            delete a.updated_at;
                        });
                    })
                    .expect(
                        200, [
                            { id: 1, name: 'Jason Hsu', username: 'Jasonhsu', bar_info: 60 },
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
                        ],
                        done
                    );
            });
            test('GET users by id', done => {
                agent
                    .get('/users/1')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(
                        200, {
                            id: 1,
                            name: 'Jason Hsu',
                            username: 'Jasonhsu',
                            bar_info: 60
                        },
                        done
                    );
            });
            test('POST users', done => {
                agent
                    .post('/users')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        username: 'Jasonhsu2',
                        name: 'Jason Hsu',
                        password: 'youreawizard'
                    })
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(
                        201, {
                            id: 5,
                            name: 'Jason Hsu',
                            username: 'Jasonhsu2',
                            bar_info: 0
                        },
                        done
                    );
            });
            test('PATCH users', done => {
                agent
                    .patch('/users/1')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        username: 'Jasonhsuu'
                    })
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(
                        200, {
                            id: 1,
                            name: 'Jason Hsu',
                            username: 'Jasonhsuu',
                            bar_info: 60
                        },
                        done
                    );
            })
            test('GET meetups by user id', done => {
                agent
                    .get('/users/2/meetups')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(
                        200, [{
                            id:3,
                            creator: 2,
                            name_of_meetup: 'Dinner with friends',
                            time_meetup: 'December 8th 2017, 5:00 pm',
                            location_name: 'Garaje',
                            location_lat: 37.7817,
                            location_lon: -122.396,
                            status: 'ACTIVE'
                        }],
                        done
                    );
            });
            test('POST meetups by users id', done => {
                agent
                    .patch('/users/1/meetups')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        creator: 1,
                        name_of_meetup: 'Party',
                        time_meetup: 'December 9th 2017, 8:00 pm',
                        location_name: 'Fairmont',
                        location_lat: 38.7881439,
                        location_lon: -122.4017237,
                        status: 'ACTIVE'
                    })
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(
                        201, {
                            id: 5,
                            creator: 1,
                            name_of_meetup: 'Party',
                            time_meetup: 'December 9th 2017, 8:00 pm',
                            location_name: 'Fairmont',
                            location_lat: 38.7881439,
                            location_lon: -122.4017237,
                            status: 'ACTIVE'
                        },
                        done
                    );
            });
        });
    })
);