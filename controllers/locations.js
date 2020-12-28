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
        // console.log("All users with their associated tasks:", JSON.stringify(locations, null, 4));
        res.json(locations)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createLocation = async (req, res) => {
    try {
        const newLocation = await Location.create(req.body)
        req.body.images.forEach(async (image) => {
            const images = await Image.create({
                name: image.name,
                imageBase64: image.imageBase64,
                LocationId: newLocation.id
            })
        })

        res.send(newLocation)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const updateLocation = async (req, res) => {
    try {
        const newLocation = await Location.update(
            req.body,
            { returning: true, where: { id: req.params.id } }
        )
        // const images = await Image.findAll({where:{LocationId: req.params.id}})
        // await images.forEach(image=>{
        //     image.destroy()
        // })
        const images = await Image.destroy({where:{LocationId:req.params.id}})

        console.log(images)
        await req.body.images.forEach(async (image) => {
            const images = await Image.create({
                name: image.name,
                imageBase64: image.imageBase64,
                LocationId: req.params.id
            })
        })
        res.send(newLocation)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const deleteLocation = async(req, res) => {
    console.log(req.body.id)
    try{
        const images = await Image.destroy({where:{LocationId:req.params.id}})
        const location = await Location.destroy({where:{id:req.params.id}})
        res.json(location)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}






///////////////////////////////////////////////////////////

const getImages = async (req, res) => {
    try {
        const images = await Image.findAll({
            include: Location
        })

        // console.log("All images with their associated tasks:", JSON.stringify(images, null, 4));
        res.json(images)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const createImage = async (req, res) => {
    try {
        const newImage = await Image.create(req.body)
        res.send(newImage)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}





module.exports = {

    getLocations,
    createLocation,
    updateLocation,
    deleteLocation,
    getImages,
    createImage
}