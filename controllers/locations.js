const Location = require("../models/location")
const db = require("../db/connection")

db.on("error", console.error.bind(console, "MongoDB connection error:"))


const getProducts = async (req, res) => {
  try {
    const locations = await Location.find()
    res.json(locations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getLocation = async (req, res) => {
  try {
    const { id } = req.params
    const location = await Location.findById(id)
    if (location) {
      return res.json(location)
    }
    res.status(404).json({ message: "Location not found!" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const createLocation = async (req, res) => {
  try {
    const location = await new Location(req.body)
    await location.save()
    res.status(201).json(product)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  }
}

const updateLocation = async (req, res) => {
  const { id } = req.params
  await Location.findByIdAndUpdate(
    id,
    req.body,
    { new: true },
    (error, location) => {
      if (error) {
        return res.status(500).json({ error: error.message })
      }
      if (!product) {
        return res.status(404).json({ message: "Location not found!" })
      }
      res.status(200).json(product)
    }
  )
}

const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Location.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send("Location deleted")
    }
    throw new Error("Product not found")
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation,

}