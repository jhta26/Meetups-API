exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('table_name').del()
        .then(function() {
            // Inserts seed entries
            return knex('table_name').insert([
                { user_id: 1, meetup_id: 1, status: 'ACCEPT', locations: '50,104', time_left: 'December 5th 2017, 3:56:25 pm', time_arrived: '' },
                { user_id: 2, meetup_id: 1, status: 'ACCEPT', locations: '58,104', time_left: 'December 5th 2017, 3:36:25 pm', time_arrived: '' }

            ]);
        });
};


// exports.up = function(knex) {
//     return knex.schema.createTable('participants', table => {
//         table.increments()
//         table.integer('user_id').notNullable()
//         table
//             .integer('meetup_id')
//             .notNullable()
//             .references('id')
//             .inTable('meetups')
//             .index()
//             .onDelete('CASCADE')
//         table.string('status').notNullable().defaultTo('')
//         table.string('locations').notNullable().defaultTo('')
//         table.string('time_left').notNullable().defaultTo('')
//         table.string('time_arrived').notNullable().defaultTo('')
//     })
// };