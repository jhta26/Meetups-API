exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments()
        table.string('name').notNullable().defaultTo('')
        table.string('username').notNullable().unique()
        table.specificType('hashed_password', 'char(60)').notNullable();
        table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
        table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};