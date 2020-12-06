const { Location, Image } = require('../models')
const Sequelize = require('sequelize');
const Op = Sequelize.Op



const findAllWithImages = async () => {
    const users = await Location.findAll({
        // include: [{
        //     model: Image
        // }]
    });
    console.log("All users with their associated tasks:", JSON.stringify(users, null, 4));
}

const run = async () => {
    await findAllWithImages()
    await process.exit()
}

run()