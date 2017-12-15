exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('participants').del().then(function() {
        // Inserts seed entries
        return knex('participants').insert([{
                user_id: 1,
                meetup_id: 1,
                status: 'ACCEPT',
                time_remaining: '',
                time_arrived: '',
                already_there: ''
            },

            {
                user_id: 2,
                meetup_id: 1,
                status: 'ACCEPT',
                time_remaining: '',
                time_arrived: '',
                already_there: ''
            },
            {
                user_id: 3,
                meetup_id: 1,
                status: 'ACCEPT',
                time_remaining: '',
                time_arrived: '',
                already_there: ''
            },
            {
                user_id: 1,
                meetup_id: 3,
                status: '',
                time_remaining: '',
                time_arrived: '',
                already_there: ''
            },
            {
                user_id: 4,
                meetup_id: 3,
                status: '',
                time_remaining: '',
                time_arrived: '',
                already_there: ''
            }
        ]);
    });
};