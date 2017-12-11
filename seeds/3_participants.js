exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('participants').del().then(function() {
        // Inserts seed entries
        return knex('participants').insert([{
                user_id: 1,
                meetup_id: 1,
                status: 'ACCEPT',
                current_lat_lon: '37.7881439, -122.4017237',
                time_remaining: '',
                time_arrived: '',
                already_there: ''
            },

            {
                user_id: 2,
                meetup_id: 1,
                status: 'ACCEPT',
                current_lat_lon: '37.7817098, -122.3961356',
                time_remaining: '',
                time_arrived: '',
                already_there: ''
            },
            {
                user_id: 1,
                meetup_id: 3,
                status: '',
                current_lat_lon: '37.7881439, -122.4017237',
                time_remaining: '',
                time_arrived: '',
                already_there: ''
            },
            {
                user_id: 4,
                meetup_id: 3,
                status: '',
                current_lat_lon: '37.7881439, -122.4017237',
                time_remaining: '',
                time_arrived: '',
                already_there: ''
            }
        ]);
    });
};