exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('meetups').del()
        .then(function() {
            // Inserts seed entries
            return knex('meetups').insert([
                { name: 'lunch', creator: 'Jasonhsu', user_id: 1, location_meetup: '39,104', time_meetup: 'December 5th 2017, 4:56:25 pm', status: 'ACTIVE' },
                { name: 'meeting', creator: 'Jasonhsu', user_id: 1, location_meetup: '38,100', time_meetup: 'December 5th 2017, 4:56:25 pm', status: 'ACTIVE' },
                { name: 'shopping', creator: 'Jasonhsu', user_id: 1, location_meetup: '37,107', time_meetup: 'December 5th 2017, 4:56:25 pm', status: 'ACTIVE' },
                { name: 'party', creator: 'Jasonhsu', user_id: 1, location_meetup: '36,102', time_meetup: 'December 5th 2017, 4:53:25 pm', status: 'ACTIVE' },
                { name: 'dance', creator: 'Jasonhsu', user_id: 1, location_meetup: '39,99', time_meetup: 'December 5th 2017, 4:56:25 pm', status: 'ACTIVE' },
                { name: 'premiere', creator: 'Jasonhsu', user_id: 1, location_meetup: '39,104', time_meetup: 'December 5th 2017, 4:00:25 pm', status: 'ACTIVE' },
                { name: 'dinner', creator: 'Jasonhsu', user_id: 1, location_meetup: '44,104', time_meetup: 'December 6th 2017, 4:56:25 pm', status: 'COMPLETED' },
                { name: 'lunch', creator: 'Jasonhsu', user_id: 1, location_meetup: '39,104', time_meetup: 'December 5th 2017, 4:56:25 pm', status: 'COMPLETED' },
                { name: 'lunch', creator: 'Jasonhsu', user_id: 1, location_meetup: '39,104', time_meetup: 'December 5th 2017, 4:56:25 pm', status: 'COMPLETED' },

            ]);
        });
};
