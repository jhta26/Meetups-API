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
                        200, [{
                                id: 1,
                                name: 'Jason Hsu',
                                username: 'Jasonhsu',
                                bar_info: 60,
                                current_lat_lon: '37.7817098, -122.3961356'
                            },
                            {
                                id: 2,
                                name: 'Megan Hsu',
                                username: 'Meganhsu',
                                bar_info: 50,
                                current_lat_lon: '37.788713, -122.4317172'
                            },
                            {
                                id: 3,
                                name: 'Chuck Hagy',
                                username: 'Chuckhagy',
                                bar_info: 40,
                                current_lat_lon: '37.7781439, -122.4017237'
                            },
                            {
                                id: 4,
                                name: 'Melisa Im',
                                username: 'Melisaim',
                                bar_info: 70,
                                current_lat_lon: '37.7817098, -122.3961356'
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
                            bar_info: 60,
                            current_lat_lon: '37.7817098, -122.3961356'
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
                        name: 'Jason Hsuu',
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
                            name: 'Jason Hsuu',
                            username: 'Jasonhsu2',
                            bar_info: 0,
                            current_lat_lon: ''
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
                            bar_info: 60,
                            current_lat_lon: '37.7817098, -122.3961356'
                        },
                        done
                    );
            });
            test('GET meetups by user id', done => {
                agent
                    .get('/users/1/meetups')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(
                        200, [{
                                id: 12,
                                creator: 1,
                                creator_name: 'Jason Hsu',
                                name_of_meetup: 'Meeting',
                                destination_address: '2401 Harrison St, San Francisco, CA 94107, USA',
                                time_meetup: 'December 27th 2017, 5:00 pm',
                                location_name: 'Flour and Water',
                                location_lat_lon: '37.758933, -122.412271',
                                active: 'YES',
                                private: 'NO',
                                user_id: 1,
                                meetup_id: 4,
                                status: 'ACCEPT',
                                time_remaining: '',
                                time_arrived: '',
                                already_there: ''
                            },
                            {
                                id: 7,
                                creator: 2,
                                creator_name: 'Megan Hsu',
                                name_of_meetup: 'Dinner with friends',
                                destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                                time_meetup: 'December 19th 2017, 5:00 pm',
                                location_name: 'Garaje',
                                location_lat_lon: '37.7817098, -122.3961356',
                                active: 'YES',
                                private: 'NO',
                                user_id: 1,
                                meetup_id: 3,
                                status: 'ACCEPT',
                                time_remaining: '',
                                time_arrived: '',
                                already_there: ''
                            },
                            {
                                id: 6,
                                creator: 1,
                                creator_name: 'Jason Hsu',
                                name_of_meetup: 'Dropbox party',
                                destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                                time_meetup: 'December 24th 2017, 7:00 pm',
                                location_name: 'Palace Hotel',
                                location_lat_lon: '37.7881439, -122.4017237',
                                active: 'YES',
                                private: 'YES',
                                user_id: 1,
                                meetup_id: 2,
                                status: '',
                                time_remaining: '',
                                time_arrived: '',
                                already_there: ''
                            },
                            {
                                id: 1,
                                creator: 1,
                                creator_name: 'Jason Hsu',
                                name_of_meetup: 'Lunch',
                                destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                                time_meetup: 'December 22nd 2017, 2:03 pm',
                                location_name: 'McDonalds',
                                location_lat_lon: '37.798713, -122.4317172',
                                active: 'YES',
                                private: 'NO',
                                user_id: 1,
                                meetup_id: 1,
                                status: 'ACCEPT',
                                time_remaining: '',
                                time_arrived: '',
                                already_there: ''
                            }
                        ],
                        done
                    );
            });
            test('POST meetups by users id', done => {
                agent
                    .post('/users/1/meetups')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name_of_meetup: 'Party',
                        time_meetup: 'December 9th 2017, 8:00 pm',
                        creator_name: 'Jason Hsu',
                        destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                        location_name: 'Fairmont',
                        location_lat_lon: '38.7881,-122.401',
                        active: 'YES'
                    })
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(
                        200, {
                            id: 7,
                            creator: 1,
                            creator_name: 'Jason Hsu',
                            name_of_meetup: 'Party',
                            destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                            time_meetup: 'December 9th 2017, 8:00 pm',
                            location_name: 'Fairmont',
                            location_lat_lon: '38.7881,-122.401',
                            active: 'YES',
                            private: ''
                        },
                        done
                    );
            });
            test('GET meetups by id', done => {
                agent
                    .get('/meetups/1')
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
                            creator: 1,
                            creator_name: 'Jason Hsu',
                            name_of_meetup: 'Lunch',
                            destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                            time_meetup: 'December 22nd 2017, 2:03 pm',
                            location_name: 'McDonalds',
                            location_lat_lon: '37.798713, -122.4317172',
                            active: 'YES',
                            private: 'NO'
                        },
                        done
                    );
            });
            test('PATCH meetups', done => {
                agent
                    .patch('/meetups/1')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        name_of_meetup: 'Lunch 2'
                    })
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(
                        200, {
                            id: 1,
                            creator: 1,
                            creator_name: 'Jason Hsu',
                            name_of_meetup: 'Lunch 2',
                            destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                            time_meetup: 'December 22nd 2017, 2:03 pm',
                            location_name: 'McDonalds',
                            location_lat_lon: '37.798713, -122.4317172',
                            active: 'YES',
                            private: 'NO'
                        },
                        done
                    );
            });

            
            test('DELETE meetups by user id', done => {
                agent
                    .delete('/meetups/1')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect('Content-Type', /json/)
                    .expect(res => {})
                    .expect(
                        202, {
                            id: 1,
                            creator: 1,
                            creator_name: 'Jason Hsu',
                            name_of_meetup: 'Lunch',
                            destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                            time_meetup: 'December 22nd 2017, 2:03 pm',
                            location_name: 'McDonalds',
                            location_lat_lon: '37.798713, -122.4317172',
                            active: 'YES',
                            private: 'NO'
                        },
                        done
                    );
            });
            test('POST participants by users id', done => {
                agent
                    .post('/users/1/participants')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        user_id: 1,
                        meetup_id: 1,
                        status: 'ACCEPT',

                        time_remaining: '',
                        time_arrived: '',
                        already_there: ''
                    })
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(
                        200, {
                            id: 13,
                            user_id: 1,
                            meetup_id: 1,
                            status: 'ACCEPT',
                            time_remaining: '',
                            time_arrived: '',
                            already_there: ''
                        },
                        done
                    );
            });
            test('GET participants by user id', done => {
                agent
                    .get('/users/1/participants')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(
                        200, [{
                                id: 12,
                                user_id: 1,
                                meetup_id: 4,
                                status: 'ACCEPT',
                                time_remaining: '',
                                time_arrived: '',
                                already_there: ''
                            },
                            {
                                id: 7,
                                user_id: 1,
                                meetup_id: 3,
                                status: 'ACCEPT',
                                time_remaining: '',
                                time_arrived: '',
                                already_there: ''
                            },
                            {
                                id: 6,
                                user_id: 1,
                                meetup_id: 2,
                                status: '',
                                time_remaining: '',
                                time_arrived: '',
                                already_there: ''
                            },
                            {
                                id: 1,
                                user_id: 1,
                                meetup_id: 1,
                                status: 'ACCEPT',
                                time_remaining: '',
                                time_arrived: '',
                                already_there: ''
                            }
                        ],
                        done
                    );
            });
            test('PATCH participants', done => {
                agent
                    .patch('/participants/1')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        status: 'REJECT'
                    })
                    .expect('Content-Type', /json/)
                    .expect(res => {
                        delete res.body.created_at;
                        delete res.body.updated_at;
                    })
                    .expect(
                        200, {
                            id: 1,
                            user_id: 1,
                            meetup_id: 1,
                            status: 'REJECT',
                            time_remaining: '',
                            time_arrived: '',
                            already_there: ''
                        },
                        done
                    );

            });
            test('DELETE participants by user id', done => {
                agent
                    .delete('/participants/1')
                    .set('Accept', 'application/json')
                    .set('Authorization', 'Bearer ' + token)
                    .expect('Content-Type', /json/)
                    .expect(res => {})
                    .expect(
                        202, {
                            id: 1,
                            user_id: 1,
                            meetup_id: 1,
                            status: 'ACCEPT',
                            time_remaining: '',
                            time_arrived: '',
                            already_there: ''
                        },
                        done
                    );
            });
        });
    })
);