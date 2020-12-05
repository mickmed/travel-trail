const { Location } = require('../models');
const { data } = require('./seedLocations.js');

function parseData() {
    
  const locations = data.locations.map(location => ({
    city: location.city,
    country: location.country,
    summary: location.summary,
    latitude: location.latitude,
    longitude: location.longitude
    
  }));

  return locations;
}

async function seedDb() {
  const locations = parseData();
  await Location.bulkCreate(locations);

  console.log('the my-travels-db has been seeded');
}

async function main() {
  try {
    await seedDb();
  } catch(e) {
    console.log(e);
  } finally {
    process.exit();
  }
}

main();