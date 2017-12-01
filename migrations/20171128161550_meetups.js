exports.up = function(knex) {
    return knex.schema.createTable('meetups', table => {
        table.increments()
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .index()
            .onDelete('CASCADE')
        table.string('name').notNullable().defaultTo('')
        table.string('creator').notNullable().defaultTo('')
        table.string('location_meetup').notNullable().defaultTo('')
        table.string('time_meetup').notNullable().defaultTo('')
        table.string('status').notNullable().defaultTo('')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('meetups')
};