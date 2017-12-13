exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('meetups').del().then(function() {
        // Inserts seed entries
        return knex('meetups').insert([{
                creator: 1,
                creator_name:"Jason Hsu",
                name_of_meetup: 'Lunch',
                destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                time_meetup: 'December 22nd 2017, 2:03 pm',
                location_name: 'McDonalds',
                location_lat_lon: '37.798713, -122.4317172',
                active: 'YES',
                private: 'NO'
            },
            {
                creator: 1,
                creator_name:"Jason Hsu",
                name_of_meetup: 'Dropbox party',
                destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                time_meetup: 'December 20th 2017, 7:00 pm',
                location_name: 'Palace Hotel',
                location_lat_lon: '37.7881439, -122.4017237',
                active: 'YES',
                private: 'YES'
            },
            {
                creator: 2,
                creator_name:"Megan Hsu",
                name_of_meetup: 'Dinner with friends',
                destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                time_meetup: 'December 19th 2017, 5:00 pm',
                location_name: 'Garaje',
                location_lat_lon: '37.7817098, -122.3961356',
                active: 'YES',
                private: 'NO'
            },
            {
                creator: 1,
                creator_name:"Jason Hsu",
                name_of_meetup: 'Meeting',
                destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                time_meetup: 'December 17th 2017, 5:00 pm',
                location_name: 'Garaje',
                location_lat_lon: '37.7817098, -122.3961356',
                active: 'NO',
                private: 'NO'
            },
            {
                creator: 3,
                creator_name:"Chuck Hagy",
                name_of_meetup: 'Meeting',
                destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                time_meetup: 'December 17th 2017, 5:00 pm',
                location_name: 'Garaje',
                location_lat_lon: '37.7817098, -122.3961356',
                active: 'YES',
                private: 'NO'
            },
               {
                creator: 4,
                creator_name:"Melisa Im",
                name_of_meetup: 'Breakfast',
                destination_address: '472 3rd St, San Francisco, CA 94107, USA',
                time_meetup: 'December 24th 2017, 7:00 am',
                location_name: 'West Of Pecos',
                location_lat_lon: '37.7817098, -122.3961356',
                active: 'YES',
                private: 'NO'
            }
        ]);
    });
};