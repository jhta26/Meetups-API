exports.up = function(knex) {
  return knex.schema.createTable('meetups', table => {
    table.increments();
    table
      .integer('creator')
      .notNullable()
      .references('id')
      .inTable('users')
      .index()
      .onDelete('CASCADE');
    table.string('name_of_meetup').notNullable().defaultTo('');
    table.string('time_meetup').notNullable().defaultTo('');
    table.string('location_name').notNullable().defaultTo('');
    table.float('location_lat', [12]).notNullable().defaultTo(0);
    table.float('location_lon', [12]).notNullable().defaultTo(0);
    table.string('active').notNullable().defaultTo('');
    table.string('private').notNullable().defaultTo('');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('meetups');
};
