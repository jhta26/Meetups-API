exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments();
        table.string('name').notNullable().unique().defaultTo('');
        table.string('username').notNullable().unique();
        table.integer('bar_info').notNullable().defaultTo(0);
        table.string('current_lat_lon').notNullable().defaultTo('');
        table.specificType('hashed_password', 'char(60)').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};