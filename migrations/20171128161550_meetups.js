
exports.up = function(knex) {
  return knex.schema.createTable('meetups',table=>{
  	table.increments()
  	table.string('name').notNullable().defaultTo('')
  	table.string('creator').notNullable.defaulTo('')
  	table.string('location_meetup').notNullable.defaultTo('')
  	table.string('time_meetup').notNullable.defaultTo('')
  	table.string('status').notNullable.defaultTo('')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('meetups')
};
