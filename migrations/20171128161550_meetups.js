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
    table.string('location_lat_lon').notNullable().defaultTo('');
    table.string('active').notNullable().defaultTo('');
    table.string('private').notNullable().defaultTo('');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('meetups');
};
