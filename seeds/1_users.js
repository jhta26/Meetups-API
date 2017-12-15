exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del().then(function() {
    // Inserts seed entries
    return knex('users').insert([
      {
        name: 'Jason Hsu',
        username: 'Jasonhsu',
        current_lat_lon: '37.7817098, -122.3961356',
        hashed_password:
          '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        bar_info: 60
      },
      {
        name: 'Megan Hsu',
        username: 'Meganhsu',
        current_lat_lon: '37.7819088, -122.3961356',
        hashed_password:
          '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        bar_info: 50
      },
      {
        name: 'Chuck Hagy',
        username: 'Chuckhagy',
        current_lat_lon: '37.7812098, -122.3861356',
        hashed_password:
          '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        bar_info: 40
      },
      {
        name: 'Melisa Im',
        username: 'Melisaim',
        current_lat_lon: '37.7812098, -122.3961356',
        hashed_password:
          '$2a$12$C9AYYmcLVGYlGoO4vSZTPud9ArJwbGRsJ6TUsNULzR48z8fOnTXbS',
        bar_info: 70
      }
    ]);
  });
};
