const express = require("express");
const app = express();
const cors = require("cors");
const body = require("body-parser");
const { Location, Image } = require("./models");
const path = require("path");
const PORT = 3000;
app.use(cors());

//GET LOCATIONS
app.get("/locations", async (req, res) => {
  try {
    const location = await Location.findAll({ include: [Image] });
    res.json(location);
  } catch (err) {
    console.error("Server error: ", err);
  }
});

//GET LOCATION BY ID
app.get("/locations/:id", async (req, res) => {
  try {
    const exhibit = await Location.findByPk(req.params.id, {
      include: [Image]
    });
    res.json(location);
  } catch (err) {
    console.error("Server error: ", err);
  }
});

//POST LOCATIONS WITH IMAGES
app.post("/locations", async (req, res) => {
  try {
    let exhibit = await Exhibit.create({ artist, name, description });
    let exhibitImages = await Image.bulkCreate(images, { returning: true });
    await exhibit.setImages(exhibitImages);

    res.send({
      message: "Posted"
    });
  } catch (err) {
    console.error("Server error: ", err);
  }
});

//UPDATE LOCATIONS
app.put("/locations/:id", async (req, res) => {
  try {
    const idToUpdate = req.params.id;
    const gameDataToUpdate = req.body;
    const gameToUpdate = await Game.findByPk(idToUpdate);
    if (gameToUpdate) gameToUpdate.update(gameDataToUpdate);
    res.json(gameToUpdate);
  } catch (e) {
    res.json({
      message: e.message
    });
  }
});

// DELETE LOCATIONS AND RELATED IMAGES
app.delete("/locations/:id", async (req, res) => {
  try {
    const location = await Game.findByPk(req.params.id);
    location.destroy();
    res.json({
      message: `Deleted loction ${req.params.id}.`
    });
  } catch (e) {
    res.json({
      message: e.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
