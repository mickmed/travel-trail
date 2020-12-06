const { Location, Image } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op



const getLocations = async (req, res) => {
    const users = await Location.findAll({
        // include: [{
        //     model: Image
        // }]
    });
    console.log("All users with their associated tasks:", JSON.stringify(users, null, 4));
  
    res.json(users)
}

// const run = async () => {
//     await findAllWithImages()
//     await process.exit()
// }



module.exports = {

    getLocations
}