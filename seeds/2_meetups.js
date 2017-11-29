exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('table_name').del()
        .then(function() {
            // Inserts seed entries
            return knex('table_name').insert([
                { name: 'lunch', creator: 'Jasonhsu', location_meetup: '39,104', time_meetup: 'December 5th 2017, 4:56:25 pm', status: 'ACTIVE' },
                { name: 'dinner', creator: 'Jasonhsu', location_meetup: '44,104', time_meetup: 'December 6th 2017, 4:56:25 pm', status: 'COMPLETED' }

            ]);
        });
};