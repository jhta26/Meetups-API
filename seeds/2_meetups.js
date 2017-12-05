exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meetups').del().then(function() {
    // Inserts seed entries
    return knex('meetups').insert([
      {
        creator: 1,
        name_of_meetup: 'Lunch',
        time_meetup: 'December 22nd 2017, 2:03 pm',
        location_name: 'McDonalds',
        location_lat: 37.798713,
        location_lon: -122.4317172,
        active: 'YES',
        private: 'NO'
      },
      {
        creator: 1,
        name_of_meetup: 'Dropbox party',
        time_meetup: 'December 9th 2017, 7:00 pm',
        location_name: 'Palace Hotel',
        location_lat: 37.7881439,
        location_lon: -122.4017237,
        active: 'YES',
        private: 'YES'
      },
      {
        creator: 2,
        name_of_meetup: 'Dinner with friends',
        time_meetup: 'December 8th 2017, 5:00 pm',
        location_name: 'Garaje',
        location_lat: 37.7817098,
        location_lon: -122.3961356,
        active: 'YES',
        private: 'NO'
      },
      {
        creator: 1,
        name_of_meetup: 'Meeting',
        time_meetup: 'November 8th 2017, 5:00 pm',
        location_name: 'Garaje',
        location_lat: 37.7817098,
        location_lon: -122.3961356,
        active: 'NO',
        private: 'NO'
      }
    ]);
  });
};
