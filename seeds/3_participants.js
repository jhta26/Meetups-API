exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('participants').del()
        .then(function() {
            // Inserts seed entries
            return knex('participants').insert([
                { user_id: 1, meetup_id: 1, status: 'ACCEPT', locations: '50,104', time_left: 'December 5th 2017, 3:56:25 pm', time_arrived: '' },
                { user_id: 2, meetup_id: 1, status: 'ACCEPT', locations: '58,104', time_left: 'December 5th 2017, 3:36:25 pm', time_arrived: '' }

            ]);
        });
};