exports.up = function(knex) {
    return knex.schema.createTable('participants', table => {
        table.increments()
        table.integer('user_id').notNullable()
        table
            .integer('meetup_id')
            .notNullable()
            .references('id')
            .inTable('meetups')
            .index()
            .onDelete('CASCADE')
        table.string('status').notNullable().defaultTo('')
        table.string('locations').notNullable().defaultTo('')
        table.string('time_left').notNullable().defaultTo('')
        table.string('time_arrived').notNullable().defaultTo('')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('participants')
};