const express = require("express");
const app = express();
const cors = require("cors");
const body = require("body-parser");
const { Location, Image } = require("./models");
const path = require("path");
const PORT = 3000;
app.use(cors());
app.use(body.json({ limit: '1000000000000000mb' }));
app.use('/', express.static('./build/'));


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
    const location = await Location.findByPk(req.params.id, {
      include: [Image]
    });
    res.json(location);
  } catch (err) {
    console.error("Server error: ", err);
  }
});

//POST LOCATIONS WITH IMAGES
app.post("/locations", async (req, res) => {
  
    const {city, country, summary, latitude, longitude, images } = req.body
   
  try {
    let location = await Location.create({city, country, summary, latitude, longitude});

    
    let locationImages = await Image.bulkCreate(images, { returning: true });
    await location.setImages(locationImages);

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
    const {city, country, summary} = req.body
   
  
    const updateLocation = await Location.findByPk(parseInt(req.params.id));
    updateLocation.update(req.body);
    res.json(req.body);
  } catch (e) {
    res.json({
      message: e.message
    });
  }
});

// DELETE LOCATIONS AND RELATED IMAGES
app.delete("/locations/:id", async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
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
