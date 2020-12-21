const { Location, Image } = require('../models')
const Sequelize = require('sequelize');
const { response } = require('express');
const Op = Sequelize.Op

const getLocations = async (req, res) => {
    try {
        const locations = await Location.findAll({
            include: [{
                model: Image
            }]
        });
        console.log("All users with their associated tasks:", JSON.stringify(locations, null, 4));
        res.json(locations)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createLocation = async (req, res) => {
// console.log('THIS IS REQBOFY', req.body.city, req.body.id)
    try {
        const newLocation = await Location.create(req.body)
        // console.log(newLocation)
        req.body.images.forEach(async(image) => {
            const images = await Image.create({
                name:image.name,
                imageBase64:image.imageBase64,
                LocationId: newLocation.id
            })
        })
        
        res.send(newLocation)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}

const updateLocation = async (req, res) => {
    await Location.update(  
        { city: req.body.city },

        { returning: true, where: { id: req.params.id } }
    )
        .then(function ([rowsUpdate, [updatedLocation]]) {
            res.json(updatedLocation)
        })
        .catch(next)

        req.body.images.forEach(async(image) => {
            const images = await Image.create({
                name:image.name,
                imageBase64:image.imageBase64,
                LocationId: req.params.id
            })
        })
    // const location = await Location.findById(req.params.id)
    // location.Image.set(req.body.images)


    // Image.update({
    //     name:req.body.images,

    // })
}




const getImages = async (req, res) => {
    try {
        const images = await Image.findAll({
            include: Location
        })
        console.log('here')

        // console.log("All images with their associated tasks:", JSON.stringify(images, null, 4));
        res.json(images)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const createImage = async (req, res) => {
    try {
        const newImage = await Image.create(req.body)
        // console.log(newImage)
        res.send(newImage)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}





module.exports = {

    getLocations,
    createLocation,
    updateLocation,
    getImages,
    createImage
}