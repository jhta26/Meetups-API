exports.up = function(knex) {
    return knex.schema.createTable('participants', table => {
        table.increments()
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .index()
            .onDelete('CASCADE')
        table
            .integer('meetup_id')
            .notNullable()
            .references('id')
            .inTable('meetups')
            .index()
            .onDelete('CASCADE')
        table.string('status').notNullable().defaultTo('')
        table.float('current_lat').notNullable().defaultTo(0)
        table.float('current_lon').notNullable().defaultTo(0)
        table.string('time_remaing').notNullable().defaultTo('')
        table.string('time_arrived').notNullable().defaultTo('')
        table.string('already_there').notNullable().defaultTo('')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('participants')
};