exports.up = function(knex) {
  return knex.schema.createTable('participants', table => {
    table.increments();
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .index()
      .onDelete('CASCADE');
    table
      .integer('meetup_id')
      .notNullable()
      .references('id')
      .inTable('meetups')
      .index()
      .onDelete('CASCADE');
    table.string('status').notNullable().defaultTo('');
    table.string('current_lat_lon').notNullable().defaultTo('');
    table.string('time_remaining').notNullable().defaultTo('');
    table.string('time_arrived').notNullable().defaultTo('');
    table.string('already_there').notNullable().defaultTo('');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('participants');
};
